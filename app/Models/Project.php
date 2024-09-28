<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Symfony\Component\HttpKernel\Profiler\Profile;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description', 
        'objetives',
        'colaborators',
        'start_date', 
        'end_date',
        'type',
        'period',
        'user_id',
    ];

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');    
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
  
}
