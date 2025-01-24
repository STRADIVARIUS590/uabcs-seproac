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
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use ReflectionClass;
use Spatie\QueryBuilder\QueryBuilder;

use function Laravel\Prompts\error;

class BaseController extends Controller 
// }implements HasMiddleware
{
    protected $model;

    public function __construct(){
        $this->middleware('auth');
        $this->model = 'App\\Models\\' . Str::singular(
            str_replace(
                ' ', 
                '', 
                ucwords(
                    basename(
                        preg_replace('/\/get\/(\d+)|\/(\d+)$|\/update|-/', ' ', request()->url())
                    )
                )
            )
        );    
        
        error_log($this->model);
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
        
        $own = request()->query('filter')['user_id'] ?? null;        
        $m = [
             new Middleware('permission:'.$base_name.'.get', only: !$own ? ['index'] : []),
             new Middleware('permission:'.$base_name.'.get', only: ['get']),
             new Middleware('permission:'.$base_name.'.add', only: ['store']),
             new Middleware('permission:'.$base_name.'.edit', only: ['update']),
             new Middleware('permission:'.$base_name.'.delete', only: ['destroy']),
        ];

        return $m;
    }

  
    public function index(Request $request)
    {
        $base_name = basename(preg_replace('/\/get\/(\d+)|\/(\d+)$/', '',request()->url()));
        $p = $base_name.'.get';
        if(! $request->user()->hasPermissionTo($p)) $request['user_id'] = auth()->id();


        $fields = (new $this->model)->getFillable();   
        $data = QueryBuilder::for($this->model)
        ->allowedFilters(['id',...$fields])
        ->allowedIncludes(['user', 'tags', 'institution', 'cover', 'file'])
        ->allowedSorts(['id',...$fields, 'created_at', 'updated_at', 'created_at'])   
        ->select('id',...$fields)


         ->when(isset($request->user_id), function($q) use ($request){
            try {
                $q->where('user_id', $request->user_id);
            }catch(\Exception $e){}
        })

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

        $this->log(__FUNCTION__, $this->model, '', auth()->id(), request()->url(), $model->id);

        if(is_callable($model_specific_metod)) $model = $model_specific_metod($model, $request);

        return $this->jsonResponse('Registro creado correctamente', $model, Response::HTTP_OK);
    }

    public function get($id)
    {
        $fields = (new $this->model)->getFillable();   
      
        $data = QueryBuilder::for($this->model)
        ->allowedFilters(['id',...$fields])
        ->allowedIncludes(['user', 'tags', 'institution', 'cover', 'file'])
        ->select('id',...$fields)
        ->where('id', $id)
        ->firstOrFail();
        
        $this->log(__FUNCTION__, $this->model, '', auth()->id(), request()->url(), $data->id);

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

            if($request->files)$this->store_files($request, $model);

            $model->update( $request->only( (new $model)->getFillable() ) );
                        
            $model_specific_metod = $this->method(__METHOD__);

            $this->log(__FUNCTION__, $this->model, '', auth()->id(), request()->url(), $model->id);

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

            $this->log(__FUNCTION__, $this->model, '', auth()->id(), request()->url(), $model->id);

            $model->delete();
        
        }catch(Exception $e) {
            
                return $this->jsonResponse('Ha ocurrido un error', $e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->jsonResponse('Registro eliminado correctamente', $model, Response::HTTP_OK);
    }

    public function store_files(Request $request, Model $model)
    {
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
            $model->addMedia($file)->toMediaCollection('files');
            }
        }
    }

}
