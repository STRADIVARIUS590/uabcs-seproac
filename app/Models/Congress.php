<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Congress extends Model
{
    use HasFactory;


    protected $fillable = [
        'title_trabajo',
        'user_id',
        'event_name',
        'date',
        'colaborators'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
