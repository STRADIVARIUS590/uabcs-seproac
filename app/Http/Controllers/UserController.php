<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use function Laravel\Prompts\error;

class UserController extends Controller
{
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
        $request->validate( 
             [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'date_ingreso' => 'sometimes|nullable|date',
            'birth_date' => 'sometimes|nullable|date',
            'sex' => 'required',
            'password' => 'required|confirmed'
        ], ['sex' => 'asdasd' ]);
        // return $this->jsonResponse('asdaD', );
        $request['date_ingreso'] = Carbon::parse($request->date_ingreso)->format('Y-m-d H:i:s');
        $request['birth_date'] = Carbon::parse($request->birth_date)->format('Y-m-d H:i:s');
        $user = User::create($request->all());

        error_log(json_encode($user));
        // $this->log(__FUNCTION__, 'users', 'crear users', Auth::id(), $user->id);

        return $this->jsonResponse('Registro registro correctamente', compact('user'), Response::HTTP_OK);
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
}
