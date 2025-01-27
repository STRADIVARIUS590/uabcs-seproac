<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
class AcademicGrade extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

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

    public function file()
    {
        return $this->morphOne(Media::class, 'model')->whereIn('mime_type', [
            'application/pdf',
        ])->latest();
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
