<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    public function jsonResponse($message, $data, $status = Response::HTTP_OK){
        return response()->json([
            'message' => $message, 
            'data' => $data,
        ], $status);
    }

    public function log($action, $module = null, $description = null, $user_id = null,$route = null, $second_id = 0 ){
        $l = Log::create([
            'action' => $action,
            'module' => $module ?? get_called_class(),
            'description' => $description,
            'user_id' => $user_id ?? Auth::id(),
            'second_id' => $second_id,
            'route' => $route ?? request()->url(),
            'ip' => $ip ?? ''
        ]);

        // error_log(json_encode($l));
    }
}
