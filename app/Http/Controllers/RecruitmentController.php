<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RecruitmentActivity;

class RecruitmentController extends Controller
{
   public function index()
{
    $activities = RecruitmentActivity::with('companies')->orderBy('start')->get();

    return Inertia::render('react/applicant/dashboard/recruitment/RecruitmentList', [
        'activities' => $activities
    ]);
}

public function dashboard()
{
    $activities = RecruitmentActivity::with('companies') // <-- add this
        ->orderBy('start')
        ->get();

    return Inertia::render('react/applicant/dashboard/Dashboard', [
        'activities' => $activities
    ]);
}


    
}
