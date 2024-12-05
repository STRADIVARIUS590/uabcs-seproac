<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use PhpParser\Builder\Class_;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Publication extends Model implements HasMedia {

    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'title',
        'user_id',
        'type',
        'issn_isbn',
        'doi',
        'magazine_name',
        'authors',
        'publication_date',
        'period'
    ];

    public function cover()
    {
        return $this->morphOne(Media::class, 'model')->latestOfMany();
    }

    public function registerMediaConversions(?Media $media = null): void    
    {
        $this->addMediaConversion('preview')
        ->fit(Fit::Contain, 300, 300)
        ->nonQueued();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    } 

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
