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
                'salary_from' => $vacancy->salary_from,
                'salary_to' => $vacancy->salary_to,
                'company_id' => $vacancy->company_id,
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
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'sub_specialization_id' => 'required|exists:sub_specializations,id',
            'salary_from' => 'nullable|numeric|min:0',
            'salary_to' => 'nullable|numeric|min:0|gte:salary_from',
            'total_vacancy' => 'required|integer|min:1',
            'job_type' => 'required|string|in:Full-time,Part-time',
            'details' => 'nullable|string',
        ], [
            'company_id.required' => 'Please select a company',
            'company_id.exists' => 'The selected company is invalid',
            'title.required' => 'Job title is required',
            'title.max' => 'Job title must not exceed 255 characters',
            'location.required' => 'Location is required',
            'sub_specialization_id.required' => 'Please select a category',
            'sub_specialization_id.exists' => 'The selected category is invalid',
            'salary_from.numeric' => 'Salary from must be a number',
            'salary_from.min' => 'Salary from must be 0 or greater',
            'salary_to.numeric' => 'Salary to must be a number',
            'salary_to.gte' => 'Salary to must be greater than or equal to salary from',
            'total_vacancy.required' => 'Total vacancy is required',
            'total_vacancy.integer' => 'Total vacancy must be a whole number',
            'total_vacancy.min' => 'Total vacancy must be at least 1',
            'job_type.required' => 'Job type is required',
            'job_type.in' => 'Job type must be either Full-time or Part-time',
        ]);

        Log::info('Before creating vacancy');
        
        $vacancy = Vacancy::create($validated);
        
        Log::info('After creating vacancy. ID: ' . $vacancy->id);
        Log::info('Applicant count: ' . $vacancy->jobApplications()->count());

        return redirect()->route('peso.job-posting')
            ->with('success', 'Vacancy created successfully!');
    }

    public function update(Request $request, $id)
    {
        $vacancy = Vacancy::findOrFail($id);

        // Prevent editing if there are applicants
        if ($vacancy->jobApplications()->count() > 0) {
            return response()->json([
                'error' => 'Cannot edit vacancy with applicants'
            ], 403);
        }

        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'sub_specialization_id' => 'required|exists:sub_specializations,id',
            'salary_from' => 'nullable|numeric|min:0',
            'salary_to' => 'nullable|numeric|min:0|gte:salary_from',
            'total_vacancy' => 'required|integer|min:1',
            'job_type' => 'required|string|in:Full-time,Part-time',
            'details' => 'nullable|string',
        ], [
            'company_id.required' => 'Please select a company',
            'company_id.exists' => 'The selected company is invalid',
            'title.required' => 'Job title is required',
            'title.max' => 'Job title must not exceed 255 characters',
            'location.required' => 'Location is required',
            'sub_specialization_id.required' => 'Please select a category',
            'sub_specialization_id.exists' => 'The selected category is invalid',
            'salary_from.numeric' => 'Salary from must be a number',
            'salary_from.min' => 'Salary from must be 0 or greater',
            'salary_to.numeric' => 'Salary to must be a number',
            'salary_to.gte' => 'Salary to must be greater than or equal to salary from',
            'total_vacancy.required' => 'Total vacancy is required',
            'total_vacancy.integer' => 'Total vacancy must be a whole number',
            'total_vacancy.min' => 'Total vacancy must be at least 1',
            'job_type.required' => 'Job type is required',
            'job_type.in' => 'Job type must be either Full-time or Part-time',
        ]);

        $vacancy->update($validated);

        return response()->json([
            'success' => 'Vacancy updated successfully',
            'vacancy' => $vacancy
        ]);
    }

    public function show($id)
    {
        $vacancy = Vacancy::findOrFail($id);

        return Inertia::render('react/peso/job-posting/DeleteVacancy', [
            'vacancy' => [
                'id' => $vacancy->id,
                'title' => $vacancy->title,
                'location' => $vacancy->location,
                'job_type' => $vacancy->job_type,
                'salary_from' => $vacancy->salary_from,
                'salary_to' => $vacancy->salary_to,
                'total_vacancy' => $vacancy->total_vacancy,
                'details' => $vacancy->details,
                'sub_specialization_id' => $vacancy->sub_specialization_id,
                'company_id' => $vacancy->company_id,
                'company' => $vacancy->company->name ?? 'N/A',
                'totalApplicants' => $vacancy->jobApplications()->count(),
            ],
        ]);
    }

   public function destroy(Request $request)
{
    try {
        // Get ID from query parameter
        $id = $request->query('id');
        
        if (!$id) {
            return response()->json([
                'error' => 'Vacancy ID is required'
            ], 400);
        }
        
        $vacancy = Vacancy::findOrFail($id);
        $applicantCount = $vacancy->jobApplications()->count();

        if ($applicantCount > 0) {
            // Soft delete - move to archive
            $vacancy->delete();
            return response()->json([
                'success' => 'Job vacancy has been moved to archive and will no longer appear in searches.'
            ]);
        } else {
            // Force delete - permanent removal
            $vacancy->forceDelete();
            return response()->json([
                'success' => 'Job vacancy has been permanently deleted.'
            ]);
        }
    } catch (\Exception $exception) {
        Log::error('Error deleting vacancy: ' . $exception->getMessage());
        return response()->json([
            'error' => 'Oops, something unexpected happened. Please try again later.'
        ], 500);
    }
}
}