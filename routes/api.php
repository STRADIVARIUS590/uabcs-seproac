<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){
    
    Route::prefix('users')->group(function(){
        Route::get('/',  [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/',  [UserController::class, 'update']);
        Route::get('/get/{id}', [UserController::class, 'get']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    Route::prefix('projects')->group(function(){
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::put('/', [ProjectController::class, 'update']);
        Route::delete('/{id}', [ProjectController::class, 'destroy']);
    });

});

