<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug'
    ];


    public function taggable()
    {
        // return $this->morphedByMany();
    }

    public function courses()
    {
        return $this->morphedByMany(Course::class, 'taggable'); ;
    }

    public function publications()
    {
        return $this->morphedByMany(Publication::class, 'taggable');
    }

    public function congresses()
    {
        return $this->morphedByMany(Congress::class, 'taggable');
    }

    public function projects()
    {
        return $this->morphedByMany(Project::class, 'taggable');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'taggable');
    }

}
