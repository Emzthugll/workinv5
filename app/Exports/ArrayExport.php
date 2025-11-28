<?php

namespace App\Http\Controllers\react\peso\job;

use App\Exports\GenericExport;
use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function exportVacancies(Request $request)
    {
        $tab = $request->tab ?? 'active';
        $search = $request->search ?? '';
        $selected = $request->selected ?? [];

        // Fetch vacancies
        $vacancies = Vacancy::with('company', 'jobApplications')
            ->when($tab === 'active', fn($q) => $q->whereNull('deleted_at'))
            ->when($tab === 'archive', fn($q) => $q->onlyTrashed())
            ->when($search, fn($q) =>
                $q->where('title', 'like', "%{$search}%")
                  ->orWhereHas('company', fn($q2) =>
                      $q2->where('name', 'like', "%{$search}%")
                  )
            )
            ->when(!empty($selected), fn($q) => $q->whereIn('id', $selected))
            ->get();

        // Map data
        $exportData = $vacancies->map(fn($v) => [
            $v->title,
            $v->company->name ?? '',
            $v->jobApplications->count(),
            $v->job_type,
            $v->location,
            $v->salary_from . ' - ' . $v->salary_to,
            $v->total_vacancy,
            $v->created_at->format('F j, Y'),
        ])->toArray();

        // Define headings
        $headings = [
            'Title',
            'Company',
            'Total Applicant',
            'Job Type',
            'Place of Assignment',
            'Salary',
            'Total Vacancy',
            'Date Posted',
        ];

        // Define column widths
        $columnWidths = [
            'A' => 30, 'B' => 25, 'C' => 18, 'D' => 15,
            'E' => 30, 'F' => 20, 'G' => 18, 'H' => 20,
        ];

        // Define columns to center
        $centerColumns = ['C', 'G'];

        $selectedText = !empty($selected) ? '_selected_' . count($selected) : '';
        $filename = "vacancies_{$tab}{$selectedText}_" . date('Y-m-d') . '.xlsx';

        return Excel::download(
            new GenericExport($exportData, $headings, $columnWidths, $centerColumns),
            $filename
        );
    }

    public function exportCompanies(Request $request)
    {
        $search = $request->search ?? '';
        $selected = $request->selected ?? [];

        // Fetch companies (adjust according to your Company model)
        $companies = \App\Models\Company::query()
            ->when($search, fn($q) =>
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('industry', 'like', "%{$search}%")
            )
            ->when(!empty($selected), fn($q) => $q->whereIn('id', $selected))
            ->get();

        // Map data
        $exportData = $companies->map(fn($c) => [
            $c->name,
            $c->industry,
            $c->email,
            $c->phone,
            $c->address,
            $c->created_at->format('F j, Y'),
        ])->toArray();

        // Define headings
        $headings = [
            'Company Name',
            'Industry',
            'Email',
            'Phone',
            'Address',
            'Date Registered',
        ];

        // Define column widths
        $columnWidths = [
            'A' => 30, 'B' => 20, 'C' => 25,
            'D' => 18, 'E' => 35, 'F' => 20,
        ];

        // Define columns to center (none for companies)
        $centerColumns = [];

        $selectedText = !empty($selected) ? '_selected_' . count($selected) : '';
        $filename = "companies{$selectedText}_" . date('Y-m-d') . '.xlsx';

        return Excel::download(
            new GenericExport($exportData, $headings, $columnWidths, $centerColumns),
            $filename
        );
    }

    public function exportRecruitmentActivities(Request $request)
    {
        // Similar pattern for recruitment activities
        $search = $request->search ?? '';
        $selected = $request->selected ?? [];

        // Your recruitment activities export logic here...
    }
}