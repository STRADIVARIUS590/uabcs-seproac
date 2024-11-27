<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/prueba', function (Request $request){ 
    //   DB::table('users')->orderBy('id')->chunk(10, function ($chunk){
    //     error_log('--------');
    //     foreach($chunk as $user){
    //         error_log($user->name);
    //     }
    // });
    
    // DB::table('users')->orderBy('id')->lazyById()->each(function($user){
    //     error_log(json_encode($user));
    // });

    // $users = DB::table('users')->select('id','name', 'name as t', 'email', DB::raw('CONCAT(name, " ", email) as name_email'))->get();
    // $users = DB::table('users')
    // ->join('roles', 'users.role_id', '=', 'roles.id')
    // ->select('users.id','users.name', 'roles.name as role_name', 'email')
    // // ->selectRaw( DB::raw('CONCAT(name, " ", email) as name_email'))
    // // ->whereRaw('(id > 2')
    // // ->orwhereRaw('id < 24)')
    // ->get();

    
    //   $users = DB::table('users')
    // ->join('roles', 'users.role_id', '=', 'roles.id')
    // ->select('users.id','users.name', 'roles.name as role_name', 'email')
    // ->get();

    
    // return $users  ;
});