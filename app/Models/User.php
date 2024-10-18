<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use Spatie\MediaLibrary\HasMedia;

class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens, HasRoles, HasPermissions, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'date_ingreso',
        'birth_date',
        'sex',
        'role_id',
    ];

    public function avatar(){
        return $this->getMedia('avatar')->first();
    }
    public function registerMediaConversions(?Media $media = null): void
    {
    $this
        ->addMediaConversion('preview')
        ->fit(Fit::Contain, 300, 300)
        ->nonQueued();
    }

    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getAllPermissionsAttribute(){
        return $this->getAllPermissions()->pluck('name');
    }

      public function projects() {
        return $this->hasMany(Project::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
