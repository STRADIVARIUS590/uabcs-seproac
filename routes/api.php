<?php

use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Middleware\Cors;
use App\Models\File;
use Database\Seeders\PublicationSeeder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Route;
use Monolog\Handler\RotatingFileHandler;
use NunoMaduro\Collision\Writer;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/pepe', function (Request $request) {
    return "popo";
});

Route::get('/caca', function (Request $request) {
    return "pipi";
});

Route::post('/password/send-token', [UserController::class, 'sendResetToken']);
Route::post('/password/reset', [UserController::class, 'resetPassword']);

Route::get('/create', [ReportController::class, 'index']);
Route::post('/prueba', function (Request $request) {

    $request->validate([
        'images.*' => 'file',
    ]);

    foreach ($request->images as $key => $file) {
        // error_log(json_encode($image));
        $name = uniqid() . '.png';
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
Route::middleware(['auth:sanctum'])->group(function () {

    Route::prefix('/users')->group(function () {
        Route::get('/',  [UserController::class, 'index'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.get')]);
        Route::post('/update',  [UserController::class, 'update'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.edit')]);
        Route::get('/get/{id}', [UserController::class, 'get'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.get')]);
        Route::delete('/{id}', [UserController::class, 'destroy'])->middleware([\Illuminate\Auth\Middleware\Authorize::using('users.destroy')]);
    });

    Route::controller(BaseController::class)->prefix('projects')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });


    Route::controller(BaseController::class)->prefix('publications')->group(function () {
        Route::get('/', 'index');
        Route::post('/', [PublicationController::class, 'store']);
        Route::post('/update', [PublicationController::class, 'update']);
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });

    Route::controller(BaseController::class)->prefix('permissions')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::post('/update', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });


    Route::controller(BaseController::class)->prefix('tags')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });


    Route::controller(BaseController::class)->prefix('congresses')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });

    Route::controller(BaseController::class)->prefix('academic-grades')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });

    Route::controller(BaseController::class)->prefix('institutions')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });


    Route::controller(BaseController::class)->prefix('courses')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });

    Route::controller(RoleController::class)->prefix('roles')->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/', 'update');
        Route::get('/get/{id}', 'get');
        Route::delete('/{id}', 'destroy');
    });

    Route::controller(UserController::class)->prefix('dashboard')->group(function () {
        Route::get('/', 'dashboard');
    });
});

// Route::get('/roles', function(){
//     return response()->json([
//         'data' => Role::get()
//     ]);
// });
