<?php

namespace App\Actions;

use App\Models\User;
use Illuminate\Http\Request;

class UpdateUserData {

    public function __construct(){ }


    public function call(User $user, Request $request)
    {
        return $user;
    }
}