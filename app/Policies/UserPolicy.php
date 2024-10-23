<?php

namespace App\Policies;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct(){ }

    public function autor(User $user, Publication $pubilcation) { 
        return $user->id === $pubilcation->user_id;
    }
}
