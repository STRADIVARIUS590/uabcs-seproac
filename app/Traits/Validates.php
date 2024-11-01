<?php

namespace App\Traits;

use App\Models\Tag;
use Illuminate\Support\Facades\Validator;

class Validates
{
    protected $model;
    protected $request;
    protected $creating = false;
    public function __construct($model, $request) {
        $this->model = $model;
        $this->request = $request;   
    }

    public function create_rules()
    {
        return match($this->model){
        Tag::class => [
                'name' => 'required|unique:tags,name',
                'slug' => 'required|unique:tags,name',

            ]
        };

    }

    public function update_rules()
    {
        return match($this->model){
        Tag::class => [
                'name' => 'required|unique:tags,name,'.$this->request->id,      
                'slug' => 'required|unique:tags,slug,'.$this->request->id,      
            ]
        };

    }

    public function validator()
    {
        return $this->creating ? Validator::make($this->request->all(), $this->create_rules()) : Validator::make($this->request->all(), $this->update_rules());
    }

    public function creating(){
        $this->creating = true;
        return $this;
    }
}