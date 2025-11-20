<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GoogleController;


//applicant
use App\Http\Controllers\RecruitmentController;

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
    $user = $request->user();

    // Make sure user has the HasRoles trait
    $role = $user->getRoleNames()->first() ?? null;

    return match($role) {
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
    // Add more admin routes here
});

// -----------------------------
// Applicant Dashboard
// -----------------------------
Route::middleware(['auth', 'role:applicant'])->group(function () {
    Route::get('/applicant/dashboard', [RecruitmentController::class, 'dashboard']);
    Route::get('/applicant/recruitment', [RecruitmentController::class, 'index'])
        ->name('applicant.recruitment');    
    
});

// -----------------------------
// Employer Dashboard
// -----------------------------
Route::middleware(['auth', 'role:employer'])->group(function () {
    Route::inertia('/employer/dashboard', 'react/employer/dashboard/Dashboard')
        ->name('employer.dashboard');
    // Add more employer routes here
});

// -----------------------------
// PESO Dashboard
// -----------------------------
Route::middleware(['auth', 'role:peso'])->group(function () {
    Route::inertia('/peso/dashboard', 'react/peso/dashboard/Dashboard')
        ->name('peso.dashboard');
    // Add more peso routes here
});

// -----------------------------
// Additional Settings
// -----------------------------
require __DIR__.'/settings.php';

Route::get('/privacy-policy', fn() => Inertia::render('policies/privacy'))->name('privacy-policy');
Route::get('/how-it-works', fn() => Inertia::render('policies/how'))->name('how-it-works');
Route::get('/about-us', fn() => Inertia::render('policies/about'))->name('about');
