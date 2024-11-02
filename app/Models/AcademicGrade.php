<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicGrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'institution_id',
        'titulation_date'
    ];
   
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}
