<?php

namespace App\Http\Controllers\react\peso\job;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use App\Models\Company;
use App\Models\SubSpecialization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacancyController extends Controller
{
    public function index(Request $request)
    {
        // Get query parameters
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $tab = $request->input('tab', 'active'); 

        // Build query
        $query = Vacancy::query();

        // Load relationships and count applications
        if (method_exists(Vacancy::class, 'company')) {
            $query->with('company');
        }
        if (method_exists(Vacancy::class, 'subSpecialization')) {
            $query->with('subSpecialization');
        }
        
        // Count applications if relationship exists
        if (method_exists(Vacancy::class, 'jobApplications')) {
            $query->withCount('jobApplications');
        }

        // Filter by tab (active or archived)
        if ($tab === 'archive') {
            $query->onlyTrashed(); 
        }

        // Apply search filter
        if (!empty($search)) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('job_type', 'like', "%{$search}%");
            });
        }

        // Get paginated results
        $vacancies = $query->orderBy('created_at', 'desc')
                           ->paginate($perPage);

        // Transform data for frontend
        $data = $vacancies->map(function ($vacancy) {
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
                'datePosted' => $vacancy->created_at->format('Y-m-d'),
                'details' => $vacancy->details,
                'subSpecializationId' => $vacancy->sub_specialization_id,
            ];
        });

        // Additional data for forms
        $companies = Company::orderBy('name')->get();
        $subspecializations = SubSpecialization::all();

        return Inertia::render('react/peso/job-posting/JobPosting', [
            'vacancies' => [
                'data' => $data,
                'total' => $vacancies->total(),
                'per_page' => $vacancies->perPage(),
                'current_page' => $vacancies->currentPage(),
                'last_page' => $vacancies->lastPage(),
            ],
            'companies' => $companies,
            'subspecializations' => $subspecializations,
            'filters' => [
                'search' => $search,
                'tab' => $tab,
            ],
        ]);
    }
}