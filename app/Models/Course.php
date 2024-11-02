<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',         
        'name',            
        'total_hours',     
        'total_students',  
        'educative_level', 
        'period',          
        'institution_id'
    ];
}
