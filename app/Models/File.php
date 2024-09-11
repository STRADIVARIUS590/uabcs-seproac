<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'fileable_type',
        'fileable_id',
    ];

    protected $appends = [
        'full_url'
    ];

    public function fileable()
    {
        return $this->morphTo();
    }

    public function FullUrl() : Attribute
    {
        return new Attribute(
            get: fn() => env('APP_URL').'/storage/' . strtolower(class_basename(Project::class)) . '/'. $this->name
        );
    }
}
