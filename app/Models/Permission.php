<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    // Define the table name dynamically based on configuration
    protected $table = 'permissions';

    // Define fillable attributes to allow mass assignment
    protected $fillable = [
        'name',
        'guard_name',
    ];

    /**
     * Define the many-to-many relationship with roles.
     */
    public function roles()
    {
        return $this->belongsToMany(
            Role::class,
            config('permission.table_names.role_has_permissions'),
            config('permission.column_names.permission_pivot_key', 'permission_id'),
            config('permission.column_names.role_pivot_key', 'role_id')
        );
    }

    /**
     * Define the polymorphic relationship with models (e.g., users).
     */
    public function models()
    {
        return $this->morphedByMany(
            config('auth.providers.users.model'), // Dynamically resolve the model
            'model',
            config('permission.table_names.model_has_permissions'),
            config('permission.column_names.permission_pivot_key', 'permission_id'),
            config('permission.column_names.model_morph_key', 'model_id')
        );
    }
}
