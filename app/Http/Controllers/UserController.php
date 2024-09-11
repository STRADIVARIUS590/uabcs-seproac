<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
    public function store(UserRequest $request)
    {
        $user = User::create($request->all());

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
