<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Cors;
use App\Models\File;
use Database\Seeders\PublicationSeeder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;
use NunoMaduro\Collision\Writer;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/prueba', function(Request $request){

    $request->validate([
        'images.*' => 'file',
    ]);
    
    foreach($request->images as $key => $file){ 
        // error_log(json_encode($image));
        $name = uniqid().'.png';
        $file->storeAs('public/lasd', $name);

        $file = File::create([
            'name' => $name,
            'fileable_type' => $request->fileable_type,
            'fileable_id' => $request->fileable_id,
        ]);
    }
});

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users', [UserController::class, 'store']);
Route::middleware(['auth:sanctum'])->group(function(){

    Route::prefix('/users')->group(function(){
        Route::get('/',  [UserController::class, 'index'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.get')]);
        Route::put('/',  [UserController::class, 'update'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.edit')]);
        Route::get('/get/{id}', [UserController::class, 'get'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.get')]);
        Route::delete('/{id}', [UserController::class, 'destroy'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.destroy')]);
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

Route::get('/roles', function(){
    return response()->json([
        'data' => Role::get()
    ]);
});

