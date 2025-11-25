<?php

namespace App\Http\Controllers\Peso;

use App\Http\Controllers\Controller; 
use App\Models\User;
use App\Models\Vacancy;
use App\Models\LoginLog;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        
        $loginToday = LoginLog::whereDate('login_time', Carbon::today())->count();

        
        $totalAccounts = User::count();

        
        $jobVacancy = Vacancy::count();

        
        return inertia('react/peso/dashboard/Dashboard', [
            'stats' => [
                'loginToday' => $loginToday,
                'totalAccounts' => $totalAccounts,
                'jobVacancy' => $jobVacancy,
            ],
        ]);
    }
}
