<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Congress extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;


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

    public function file()
    {
        return $this->morphOne(Media::class, 'model')->whereIn('mime_type', [
            'application/pdf',
        ])->latest();
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }
    
}
