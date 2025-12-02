<?php

namespace App\Http\Controllers\react\peso\job;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use App\Models\Company;
use App\Models\SubSpecialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class VacancyController extends Controller
{
    public function index(Request $request)
    {
        // Filters
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $tab = $request->input('tab', 'active');

        $query = Vacancy::query()
            ->with(['company', 'subSpecialization'])
            ->withCount('jobApplications');  

        // Archive filter
        if ($tab === 'archive') {
            $query->onlyTrashed();
        }

        // Search
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('job_type', 'like', "%{$search}%");
            });
        }

        // Paginate
        $vacancies = $query->orderBy('created_at', 'desc')->paginate($perPage);

        //  transform only the collection inside the paginator
        $vacancies->getCollection()->transform(function ($vacancy) {
            return [
                'id' => $vacancy->id,
                'title' => $vacancy->title,
                'company' => $vacancy->company->name ?? 'N/A',
                'totalApplicants' => $vacancy->job_applications_count ?? 0,
                'jobType' => $vacancy->job_type,
                'place' => $vacancy->location,
                'salary' => $vacancy->salary_from && $vacancy->salary_to
                    ? "₱" . number_format($vacancy->salary_from) . " - ₱" . number_format($vacancy->salary_to)
                    : "₱" . number_format($vacancy->salary_from ?? 0),
                'totalVacancy' => $vacancy->total_vacancy,
                'datePosted' => $vacancy->created_at->format('F d, Y'),
                'details' => $vacancy->details,
                'subSpecializationId' => $vacancy->sub_specialization_id,
            ];
        });

        // Additional Data
        $companies = Company::orderBy('name')->get();
        $subspecializations = SubSpecialization::all();

        return Inertia::render('react/peso/job-posting/JobPosting', [
            'vacancies' => $vacancies, 
            'companies' => $companies,
            'subspecializations' => $subspecializations,
            'filters' => [
                'search' => $search,
                'tab' => $tab,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'sub_specialization_id' => 'required|exists:sub_specializations,id',
            'salary_from' => 'nullable|numeric',
            'salary_to' => 'nullable|numeric',
            'total_vacancy' => 'required|integer|min:1',
            'job_type' => 'required|string',
            'details' => 'nullable|string',
        ]);

        Log::info('Before creating vacancy');
        
        $vacancy = Vacancy::create($request->all());
        
        Log::info('After creating vacancy. ID: ' . $vacancy->id);
        Log::info('Applicant count: ' . $vacancy->jobApplications()->count());

        return redirect()->route('peso.job-posting')
            ->with('success', 'Vacancy created successfully!');
    }
}