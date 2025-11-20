<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Role;
use Exception;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');
            $googleUser = $driver->stateless()->user();

            // Find existing user
            $user = User::where('google_id', $googleUser->id)
                        ->orWhere('email', $googleUser->email)
                        ->first();

            if (!$user) {
                // New user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'email_verified_at' => now(),
                    'password' => bcrypt(Str::random(16)),
                ]);

                // Assign default role (applicant)
                $role = Role::firstOrCreate(['name' => 'applicant', 'guard_name' => 'web']);
                $user->assignRole($role);

            } else {
                // Update existing user
                if (!$user->google_id) {
                    $user->google_id = $googleUser->id;
                }
                if (!$user->email_verified_at) {
                    $user->email_verified_at = now();
                }
                $user->save();

                // Assign default role if none
                if (!$user->roles()->exists()) {
                    $role = Role::firstOrCreate(['name' => 'applicant', 'guard_name' => 'web']);
                    $user->assignRole($role);
                }
            }

            // Login the user
            Auth::login($user, true);
            request()->session()->regenerate();

            // Redirect based on role
            $roleName = $user->getRoleNames()->first();

            return match($roleName) {
                'administrator' => redirect('/admin/dashboard'),
                'employer' => redirect('/employer/dashboard'),
                'peso' => redirect('/peso/dashboard'),
                'applicant' => redirect('/applicant/dashboard'),
                default => redirect('/dashboard'),
            };

        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            Log::error('Invalid State Exception', ['message' => $e->getMessage()]);
            return redirect('/login')->with('error', 'Session expired. Please try again.');
        } catch (Exception $e) {
            Log::error('Google OAuth Error', ['message' => $e->getMessage()]);
            return redirect('/login')->with('error', 'Google login failed: ' . $e->getMessage());
        }
    }
}