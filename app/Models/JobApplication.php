<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $table = 'applicant_profile_vacancy';

    public function applicant_profile()
    {
        return $this->belongsTo( ApplicantProfile::class);
    }

    public function vacancy()
    {
        return $this->belongsTo(Vacancy::class);
    }
}
