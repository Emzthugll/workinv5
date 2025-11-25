<?php

namespace App\Http\Controllers\Peso;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Vacancy;
use App\Models\LoginLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Return dashboard data for Peso.
     */
    public function index()
    {
        $loginToday = LoginLog::whereDate('login_time', Carbon::today())->count();
        $totalAccounts = User::count();
        $jobVacancy = Vacancy::count();

        // Earliest year in any data
        $earliestLoginYear = LoginLog::selectRaw('MIN(YEAR(login_time)) as min_year')->value('min_year') ?? 2021;
        $earliestUserYear = User::selectRaw('MIN(YEAR(created_at)) as min_year')->value('min_year') ?? 2021;
        $earliestVacancyYear = Vacancy::selectRaw('MIN(YEAR(created_at)) as min_year')->value('min_year') ?? 2021;

       $currentYear = now()->year;
$startYear = 2021; // fixed start year
$endYear = $currentYear; // e.g., 2025

// Yearly data
$yearlyData = [];
for ($year = $startYear; $year <= $endYear; $year++) {
    $yearlyData[] = [
        'year' => (string)$year,
        'loginToday' => LoginLog::whereYear('login_time', $year)->count(),
        'totalAccounts' => User::whereYear('created_at', $year)->count(),
        'jobVacancy' => Vacancy::whereYear('created_at', $year)->count(),
    ];
}

// Monthly data
$monthlyData = [];
for ($year = $startYear; $year <= $endYear; $year++) {
    $months = [];
    for ($month = 1; $month <= 12; $month++) {
        $months[] = [
            'month' => Carbon::create()->month($month)->format('F'),
            'loginToday' => LoginLog::whereYear('login_time', $year)->whereMonth('login_time', $month)->count(),
            'totalAccounts' => User::whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
            'jobVacancy' => Vacancy::whereYear('created_at', $year)->whereMonth('created_at', $month)->count(),
        ];
    }
    $monthlyData[$year] = $months;
}

return inertia('react/peso/dashboard/Dashboard', [
    'stats' => [
        'loginToday' => LoginLog::whereDate('login_time', Carbon::today())->count(),
        'totalAccounts' => User::count(),
        'jobVacancy' => Vacancy::count(),
    ],
    'yearlyData' => $yearlyData,
    'monthlyData' => $monthlyData,
    'startYear' => $startYear,
    'endYear' => $endYear,
]);

    }

    /**
     * Fetch daily logins for a specific month.
     */
    public function getDailyLogins(Request $request)
    {
        $request->validate([
            'year' => 'required|integer|min:2021',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $year = $request->year;
        $month = $request->month;

        $daysInMonth = Carbon::create($year, $month, 1)->daysInMonth;

        $dailyLogins = LoginLog::selectRaw('DAY(login_time) as day, COUNT(*) as value')
            ->whereYear('login_time', $year)
            ->whereMonth('login_time', $month)
            ->groupByRaw('DAY(login_time)')
            ->orderBy('day')
            ->get()
            ->keyBy('day');

        $result = [];
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $result[] = [
                'day' => $day,
                'value' => $dailyLogins->has($day) ? $dailyLogins[$day]->value : 0,
            ];
        }

        return response()->json($result);
    }
}
