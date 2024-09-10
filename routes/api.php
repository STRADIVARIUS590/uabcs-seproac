<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('users')->middleware('auth:sanctum')->group(function(){
    Route::get('/',  [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/',  [UserController::class, 'update']);
    Route::get('/get/{id}', [UserController::class, 'get']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});
