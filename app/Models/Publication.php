<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Publication extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'user_id',
        'issn-isbn',
        'doi',
        'magazine_name',
        'authors',
        'publication_date',
        'period'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    } 

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
