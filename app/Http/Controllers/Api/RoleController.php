<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\Validates;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Response as FacadesResponse;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\QueryBuilder;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'index' => 'permission:roles.get',
            'get' => 'permission:roles.get'
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $includes = array_filter(explode('*', request()->query('include')));

        $data = Role::when(sizeof($includes) > 0, function ($q) use ($includes) {
            $q->with($includes);
        })->get();

        $this->log(__FUNCTION__, Role::class, '', auth()->id(), request()->url(), 0);

        return $this->jsonResponse('Registro consultado correctamente', $data, Response::HTTP_OK);
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
        $validator = (new Validates(Role::class, $request))->creating()->validator();

        if ($validator->fails()) return $this->jsonResponse('Ha ocurrido un error', $validator->errors(), Response::HTTP_BAD_REQUEST);

        $model = Role::create($request->only('name'));

        $model->permissions()->sync($request->get('permissions', []));

        return $this->jsonResponse('Registro creado correctamente', $model, Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     */
    public function get($id)
    {
        $fields = ['id', 'name'];
        $data = QueryBuilder::for(Role::class)
            ->allowedFilters(['id', ...$fields])
            ->allowedIncludes(['permissions'])
            ->select('id', ...$fields)
            ->where('id', $id)
            ->firstOrFail();

        return $this->jsonResponse('Registro creado correctamente', $data, Response::HTTP_OK);
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

        $validator = (new Validates(Role::class, $request))->validator();

        if ($validator->fails()) return $this->jsonResponse('Ha ocurrido un error', $validator->errors(), Response::HTTP_OK);

        $model = Role::findOrFail($request->id);

        $model->update($request->only('name'));

        sizeof($request->permissions) > 0 && $model->permissions()->sync($request->permissions);

        $model->load('permissions');

        $this->log(__FUNCTION__, Role::class, '', auth()->id(), request()->url(), $model->id);

        return $this->jsonResponse('Registro actualizado correctamente', $model, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {

            $model = Role::findOrFail($id);

            $this->log(__FUNCTION__, Role::class, '', auth()->id(), request()->url(), $model->id);

            $model->delete();
        } catch (Exception $e) {
            $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->jsonResponse('Registro eliminado correctamente', Response::HTTP_OK);
    }
}
