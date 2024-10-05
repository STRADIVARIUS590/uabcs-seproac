<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use Database\Seeders\PublicationSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/users', [UserController::class, 'store']);
Route::middleware('auth:sanctum')->group(function(){
    
    Route::prefix('/users')->group(function(){
        Route::get('/',  [UserController::class, 'index']);
        Route::put('/',  [UserController::class, 'update']);
        Route::get('/get/{id}', [UserController::class, 'get']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    Route::prefix('/projects')->group(function(){
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::put('/', [ProjectController::class, 'update']);
        Route::get('/get/{id}', [ProjectController::class, 'get']);
        Route::delete('/{id}', [ProjectController::class, 'destroy']);
    });

    Route::prefix('/publications')->group(function(){
        Route::get('/', [PublicationController::class, 'index']);
        Route::post('/', [PublicationController::class, 'store']);
        Route::put('/', [PublicationController::class, 'update']);
        Route::get('/get/{id}', [PublicationController::class, 'get']);
        Route::delete('/{id}', [PublicationController::class, 'destroy']);
    });
});

