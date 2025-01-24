<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Course extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia ;

    protected $fillable = [
        'user_id',         
        'name',            
        'total_hours',     
        'total_students',  
        'educative_level', 
        'period',          
        'institution_id',
        'start_date', 
        'end_date', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }

    public function file()
    {
        return $this->morphOne(Media::class, 'model')->latestOfMany();
    }

    public function registerMediaConversions(?Media $media = null): void    
    {
        $this->addMediaConversion('preview')
        ->fit(Fit::Contain, 300, 300)
        ->nonQueued();
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
