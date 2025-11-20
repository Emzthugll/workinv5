<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    
protected $table = 'companies';

    protected $fillable = [
        'name',
        'email',
        'address',
        'contact_number',
        'logo',
        'company_overview',
        'company_code',
    ];

    public function recruitmentActivities()
    {
        return $this->belongsToMany(
            RecruitmentActivity::class,
            'company_recruitment_activity',
            'company_id',
            'recruitment_activity_id'
        );
    }
}
