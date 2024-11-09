<?php

namespace App\Http\Controllers\Api;

use App\Actions\StoreProjectData;
use App\Actions\StoreUserData;
use App\Actions\UpdateProjectData;
use App\Actions\UpdateUserData;
use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\User;
use App\Reports\UserReport;
use App\Traits\Validates;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use ReflectionClass;
use Spatie\QueryBuilder\QueryBuilder;

// User;
class BaseController extends Controller implements HasMiddleware
{

    /* preg_match('/\/(?P<action>[a-zA-Z\-]+)\/?(\d+)?|\/(\d+)$/', request()->url(), $matches);

$this->action = $matches['action'] ?? null; // Capture the action (get, update, update-password, etc.)

$this->model = 'App\\Models\\' . Str::singular(str_replace(' ', '', ucwords(basename(
    preg_replace('/\/[a-zA-Z\-]+\/?(\d+)?|\/(\d+)$/', ' ', request()->url())
))));
 */

  
     protected $model;
    
    public function __construct(){
    
        $this->model = 'App\\Models\\'.Str::singular(str_replace(' ', '', ucwords(basename(preg_replace('/\/get\/(\d+)|\/(\d+)$|-/', ' ', request()->url())))));
        // $this->model = "App\Models\\".Str::singular(ucwords(basename(preg_replace('/\/get\/(\d+)|\/(\d+)$|-/', '',request()->url()))));
    }

    public function method($action)
    {
        // metodos especificos para cada modelo 
        return match($this->model){
            User::class => [
                'store'  => function ($model, $request) { return (new StoreUserData())->call($model, $request);  },
                'update' => function ($model, $request) { return (new UpdateUserData())->call($model, $request); },
            ][$action] ?? null,
            Project::class => [
                'store' => function($model, $request) { return (new StoreProjectData())->call($model, $request); },
                'update' => function ($model, $request){ return (new UpdateProjectData())->call($model, $request); },
            ][$action] ?? null,

            default => null
        };
    }


    public static function middleware() : array 
    {
        $base_name = basename(preg_replace('/\/get\/(\d+)|\/(\d+)$/', '',request()->url()));
       
        return [
            'index' => 'permission:'.$base_name.'.get',
            'get' => 'permission:'.$base_name.'.get',
            'store' => 'permission:'.$base_name.'.add',
            'update' => 'permission:'.$base_name.'.edit',
            'destroy' => 'permission:'.$base_name.'.destroy'
        ];
    }

  
    public function index()
    {
        $fields = (new $this->model)->getFillable();   
        $data = QueryBuilder::for($this->model)
        ->allowedFilters(['id',...$fields])
        ->allowedIncludes(['user', 'tags'])
        // ->allowedFields(['id', ...$fields])
        ->allowedSorts(['id',...$fields, 'created_at', 'updated_at', 'created_at'])   
        ->select('id',...$fields)
        ->get();


        $this->log(__FUNCTION__, $this->model, '', auth()->id(), request()->url(), 0);

        return $this->jsonResponse('Registro consultado correctamente', $data, Response::HTTP_OK);

    }

    public function store(Request $request)
    {
        $validator = (new Validates($this->model, $request))->creating()->validator();

        if($validator->fails()){ return $this->jsonResponse('Ha ocurrido un error', $validator->errors(), Response::HTTP_BAD_REQUEST); }            

        $model = $this->model::create($request->only((new $this->model)->getFillable()));

        $model_specific_metod = $this->method(__FUNCTION__);

        if(is_callable($model_specific_metod)) $model = $model_specific_metod($model, $request);

        return $this->jsonResponse('Registro creado correctamente', $model, Response::HTTP_OK);
    }

    public function get($id)
    {
        $fields = (new $this->model)->getFillable();   
      
        $data = QueryBuilder::for($this->model)
        ->allowedFilters(['id',...$fields])
        ->allowedIncludes(['user', 'tags'])
        ->select('id',...$fields)
        ->where('id', $id)
        ->firstOrFail();

        return $this->jsonResponse('Registro consultado correctamente', $data, Response::HTTP_OK);
    }

    public function update(Request $request)
    {   
        error_log(json_encode($request->all()));
        try {
        
            $validator = (new Validates($this->model, $request))->validator();
         
            if($validator->fails()){ return $this->jsonResponse('Ha ocurrido un error', $validator->errors() , Response::HTTP_BAD_REQUEST);}
        
            $model = $this->model::findOrFail($request->id);

            if(isset($request->tags)){
                $model->tags()->sync($request->tags);
            }
            $model->update( $request->only( (new $model)->getFillable() ) );
                        
            $model_specific_metod = $this->method(__METHOD__);

            // error_log(json_encode($model->tags, JSON_PRETTY_PRINT));

            if(is_callable($model_specific_metod)) $model = $model_specific_metod($model, $request);

        }catch(Exception $e) {
            return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->jsonResponse('Registro actualizado correctamente', $model, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        try{
            $model = $this->model::findOrFail($id);

            $model->delete();
        
        }catch(Exception $e) {
            
                return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->jsonResponse('Registro eliminado correctamente', $model, Response::HTTP_OK);
    }

}
