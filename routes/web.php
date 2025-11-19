<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GoogleController;

// Welcome page
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Dashboard (auth required)
Route::middleware(['auth'])->get('dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');


// Google login routes
Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');



// Policies pages
Route::get('/privacy-policy', fn() => Inertia::render('policies/privacy'))->name('privacy-policy');
Route::get('/how-it-works', fn() => Inertia::render('policies/how'))->name('how-it-works');
Route::get('/about-us', fn() => Inertia::render('policies/about'))->name('about');

require __DIR__.'/settings.php';


