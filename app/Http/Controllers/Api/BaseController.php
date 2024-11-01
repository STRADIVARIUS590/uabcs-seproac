<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\Validates;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
class BaseController extends Controller implements HasMiddleware
{
    protected $model;

    public static function middleware() : array 
    {
     
        $base_name = basename(
                preg_replace('/\/get\/(\d+)|\/(\d+)$/', '',request()->url()));
        // $model = "App\Models\\".Str::singular(ucwords($base_name));
        return [
            'index' => 'permission:'.$base_name.'.get',
            'get' => 'permission:'.$base_name.'.get',
            'update' => 'permission:'.$base_name.'.edit',
            'destroy' => 'permission:'.$base_name.'.destroy'
        ];
    }
    public function __construct(){

        $this->model =  "App\Models\\".Str::singular(ucwords(basename(
                preg_replace('/\/get\/(\d+)|\/(\d+)$/', '',request()->url()))));
    }
    public function index()
    {
        $data = $this->model::select((new $this->model)->getFillable())->get();

        return $this->jsonResponse('Registron consultado correctamente', $data, Response::HTTP_OK);

    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        try{
            $validator = (new Validates($this->model, $request))->creating()->validator();

            if($validator->fails()){
                return $this->jsonResponse('Ha ocurrid un error', $validator->errors(), Response::HTTP_BAD_REQUEST);
            }

            $model = $this->model::create(
                $request->only(
                    (new $this->model)->getFillable()
                    )
                );
        }catch(Exception $e) {
            return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_OK);
        }

        return $this->jsonResponse('Registro creado correctamente', $model, Response::HTTP_OK);
    }

    public function get($id)
    {
        try {

            $model = $this->model::findOrFail($id);
        
        }catch(Exception $e) {
            return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_OK);
            
        }
        return $this->jsonResponse('Registro consultado correctamente', $model, Response::HTTP_OK);
    }

    public function update(Request $request)
    {
        
        try {
        
            $validator = (new Validates($this->model, $request))->validator();
            
            $model = $this->model::findOrFail($request->id);
            
            if($validator->fails()){
                return $this->jsonResponse('Ha ocurrido un error', $validator->errors() , Response::HTTP_BAD_REQUEST);
            }


            $model->update(
                $request->only(
                    (new $model)->getFillable()
                    )
                );
        }catch(Exception $e) {
            return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_OK);
        }

        return $this->jsonResponse('Registro actualizado correctamente', $model, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        try{
            $model = $this->model::findOrFail($id);

            $model->delete();
        
        }catch(Exception $e) {
                return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_OK);
        }

        return $this->jsonResponse('Registro elimonado correctamente', $model, Response::HTTP_OK);
    }

}
