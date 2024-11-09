<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Congress extends Model
{
    use HasFactory, SoftDeletes;


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

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
    
}
