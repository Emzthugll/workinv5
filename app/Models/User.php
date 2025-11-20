<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

/**
 * @method \Illuminate\Database\Eloquent\Collection getRoleNames()
 * @method \Illuminate\Database\Eloquent\Collection getPermissionNames()
 * @method bool hasRole(string|array|\Spatie\Permission\Contracts\Role $roles, ?string $guard = null)
 * @method bool hasAnyRole(string|array|\Spatie\Permission\Contracts\Role $roles, ?string $guard = null)
 * @method bool hasAllRoles(string|array|\Spatie\Permission\Contracts\Role $roles, ?string $guard = null)
 * @method static assignRole(...$roles)
 * @method static removeRole(...$roles)
 * @method static syncRoles(...$roles)
 * @method bool hasPermissionTo(string|int|\Spatie\Permission\Contracts\Permission $permission, ?string $guardName = null)
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}