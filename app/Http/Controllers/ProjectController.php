<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Project;
use App\Services\FileService;
use Database\Seeders\ProjectSeeder;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File as FacadesFile;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::get();

        return $this->jsonResponse('Registro consultado correctamente', compact('projects'), Response::HTTP_OK);
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
        $project = Project::create($request->all());

        $request['fileable_type'] = Project::class;
        $request['fileable_id'] = $project->id;

        (new class { use FileService;})->store_files($request);
        
        return $this->jsonResponse('Registro creado correctamente', compact('project'), Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function get($id)
    {
        $project = Project::findOrFail($id);

        return $this->jsonResponse('Registro consultado correctamente', compact('project'), Response::HTTP_OK);

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
        $project = Project::findOrFail($request->id);

        $project->update($request->all());

        return $this->jsonResponse('Registro actualizado correctamente', compact('project'), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        $project->delete();

        return $this->jsonResponse('Registro eliminado correctamente', [], Response::HTTP_OK);
    }
}
