<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;

class Vacancy extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'title',
        'details',
        'sub_specialization_id', 
        'job_type',
        'location', 
        'salary_from', 
        'salary_to',
        'total_vacancy'
    ];

    

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function subSpecialization()
    {
        return $this->belongsTo(SubSpecialization::class);
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class, 'vacancy_id', 'id');
    }
}