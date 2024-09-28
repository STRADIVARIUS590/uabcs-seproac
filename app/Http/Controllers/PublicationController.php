<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use App\Services\FileService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $publications = Publication::get();

        return $this->jsonResponse('Registro consultado correctamente', get_defined_vars(), Response::HTTP_OK);
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

        $publication = Publication::create($request->all());

        $request['fileable_type'] = Publication::class;
        $request['fileable_id'] = $publication->id;

        (new class { use FileService; })->store_files($request);

        return $this->jsonResponse('Registro creado correctamente', compact('publication'), Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function get($id)
    {
        $publication = Publication::findOrFail($id);

        return $this->jsonResponse('Registro consultado correctamente', compact('publication'), Response::HTTP_OK);
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
        $publication = Publication::findOrFail($request->id);

        $publication->update($request->all());

        return $this->jsonResponse('Registro actualizado correctamente', compact('publication'), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $publication = Publication::findOrFail($id); 

        $publication->delete();

        return $this->jsonResponse('Registro eliminado correctamente', [], Response::HTTP_OK);
    }
}
