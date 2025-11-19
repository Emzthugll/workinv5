<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    // Redirect to Google OAuth
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle Google OAuth callback
    public function callback()
    {
        try {
            
            $googleUser = Socialite::driver('google')
                ->user();
            
            Log::info('Google OAuth Success', [
                'google_id' => $googleUser->id,
                'email' => $googleUser->email,
                'name' => $googleUser->name
            ]);

            // Find existing user by google_id or email
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
                    'password' => bcrypt('JesusChrist'),
                ]);
                
                Log::info('New user created', ['user_id' => $user->id]);
            } else {
                // Existing user: update google_id & verified email
                if (!$user->google_id) {
                    $user->google_id = $googleUser->id;
                }

                if (!$user->email_verified_at) {
                    $user->email_verified_at = now();
                }

                $user->save();
                
                Log::info('Existing user updated', ['user_id' => $user->id]);
            }

            // Login the user
            Auth::login($user, true);
            
            // Verify authentication
            if (Auth::check()) {
                Log::info('User authenticated successfully', ['user_id' => Auth::id()]);
                
                // Regenerate session to prevent fixation attacks
                request()->session()->regenerate();
                
                return redirect()->intended('/dashboard');
            } else {
                Log::error('Authentication failed after login attempt');
                return redirect('/login')->with('error', 'Authentication failed. Please try again.');
            }

        } catch (\Laravel\Socialite\Two\InvalidStateException $e) {
            Log::error('Invalid State Exception - Session/Cookie Issue', [
                'message' => $e->getMessage(),
                'session_id' => session()->getId(),
                'cookies' => request()->cookies->all()
            ]);
            
            return redirect('/login')->with('error', 'Session expired. Please try logging in again.');
            
        } catch (Exception $e) {
            Log::error('Google OAuth Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect('/login')->with('error', 'Google login failed: ' . $e->getMessage());
        }
    }
}