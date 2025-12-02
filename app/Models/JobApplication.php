<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

   

    protected $fillable = [
        'applicant_profile_id',
        'vacancy_id',
        'applied_at',
        'cover_letter',
        'resume',
        'access_code',
        'status',
    ];

    public function applicantProfile()
    {
        return $this->belongsTo(ApplicantProfile::class);
    }

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }
}