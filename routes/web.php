<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Welcome page
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');



// Dashboard (auth required)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


// Policies pages
Route::get('/privacy-policy', function () {
    return Inertia::render('policies/privacy'); 
})->name('privacy-policy');

Route::get('/how-it-works', function () {
    return Inertia::render('policies/how'); 
})->name('how-it-works');

Route::get('/about-us', function () {
    return Inertia::render('policies/about');
})->name('about');


require __DIR__.'/settings.php';

