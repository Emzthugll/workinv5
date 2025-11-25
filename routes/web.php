<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GoogleController;






// Applicant
use App\Http\Controllers\RecruitmentController;



// Peso
use App\Http\Controllers\peso\DashboardController;






















// -----------------------------
// Public Pages
// -----------------------------
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// -----------------------------
// Google Login
// -----------------------------
Route::prefix('auth/google')->group(function () {
    Route::get('redirect', [GoogleController::class, 'redirect'])->name('google.redirect');
    Route::get('callback', [GoogleController::class, 'callback'])->name('google.callback');
});

// -----------------------------
// Role-Based Dashboard Redirect
// -----------------------------
Route::middleware(['auth'])->get('/dashboard', function (Request $request) {
    $role = $request->user()->getRoleNames()->first();

    return match ($role) {
        'administrator' => redirect()->route('admin.dashboard'),
        'employer' => redirect()->route('employer.dashboard'),
        'applicant' => redirect()->route('applicant.dashboard'),
        'peso' => redirect()->route('peso.dashboard'),
        default => redirect()->route('home'),
    };
})->name('dashboard');

// -----------------------------
// Administrator Dashboard
// -----------------------------
Route::middleware(['auth', 'role:administrator'])->group(function () {
    Route::inertia('/admin/dashboard', 'react/administrator/dashboard/Dashboard')
        ->name('admin.dashboard');
});

// -----------------------------
// Applicant Dashboard
// -----------------------------
Route::middleware(['auth', 'role:applicant'])->group(function () {
    Route::get('/applicant/dashboard', [RecruitmentController::class, 'dashboard'])
        ->name('applicant.dashboard');

    Route::get('/applicant/recruitment', [RecruitmentController::class, 'index'])
        ->name('applicant.recruitment');
});

// -----------------------------
// Employer Dashboard
// -----------------------------
Route::middleware(['auth', 'role:employer'])->group(function () {
    Route::inertia('/employer/dashboard', 'react/employer/dashboard/Dashboard')
        ->name('employer.dashboard');
});



Route::middleware(['auth', 'role:peso'])->prefix('peso')->name('peso.')->group(function () {

    
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::inertia('/job-posting', 'react/peso/job-posting/Index')
        ->name('job.index');

    Route::inertia('/companies', 'react/peso/companies/Index')
        ->name('companies.index');

    Route::inertia('/recruitment-activity', 'react/peso/recruitment/Index')
        ->name('recruitment.index');

    Route::inertia('/mat-report', 'react/peso/mat/Index')
        ->name('mat.index');

    Route::inertia('/manage-users', 'react/peso/users/Index')
        ->name('users.index');
});





// -----------------------------
// Additional Settings
// -----------------------------
require __DIR__ . '/settings.php';

Route::get('/privacy-policy', fn () => Inertia::render('policies/privacy'))->name('privacy-policy');
Route::get('/how-it-works', fn () => Inertia::render('policies/how'))->name('how-it-works');
Route::get('/about-us', fn () => Inertia::render('policies/about'))->name('about');
