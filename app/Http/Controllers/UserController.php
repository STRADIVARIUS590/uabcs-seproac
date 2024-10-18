<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Mockery\Matcher\HasKey;
use Symfony\Component\HttpFoundation\Response;

use function Laravel\Prompts\alert;
use function Laravel\Prompts\error;

class UserController extends Controller
{
    use ValidatesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::get();

        // $this->log(__FUNCTION__, 'users', 'consultar users', Auth::id(), route(), );

        return $this->jsonResponse('Registro consultado correctamente', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
    
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users,email',
            'name' => 'unique:users,name',
        ]);

        if($validator->fails()) return response()->json([
            'data' => $validator->errors()
        ], HttpResponse::HTTP_BAD_REQUEST);
        
        
        $request['date_ingreso'] = Carbon::parse($request->date_ingreso)->format('Y-m-d H:i:s');
        $request['birth_date'] = Carbon::parse($request->birth_date)->format('Y-m-d H:i:s');
        $user = User::create($request->all());

        $user['token'] = $user->createToken('')->plainTextToken;
        // $this->log(__FUNCTION__, 'users', 'crear users', Auth::id(), $user->id);

        $user->addMedia($request->avatar)->toMediaCollection('avatar');

        return $this->jsonResponse('Registro registro correctamente', $user);
    }

    /**
     * Display the specified resource.
     */
    public function get($id)
    {
        $user = User::findOrfail($id);

        // $this->log(__FUNCTION__, 'users', 'get users', Auth::id(),$user->id);

        return $this->jsonResponse('Registro consultado correctamente', compact('user'), Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);

        // $this->log(__FUNCTION__, 'users', 'update userr', Auth::id(), )
    
        $user->update($request->all());

        return $this->jsonResponse('Registro actualizado correctamente', compact('user'), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return $this->jsonResponse('Registro eliminado correctamente', compact('user'), Response::HTTP_OK);
    }
    public function login(Request $request)
    {
        error_log(json_encode($request->all()));

        $user = User::where('email', $request->email)->first();

        if(!$user){
            return $this->jsonResponse('Registro no encontrado', []);
        }

        if(!Hash::check($request->password, $user->password)){
            return $this->jsonResponse('REgistro no encontrado', []);
        }

        $user->tokens()->delete();
        
        $user['token'] = $user->createToken('')->plainTextToken;

        $user->append('all_permissions');

        return $this->jsonResponse('Registro consultado correctamente', $user);
    }
}
