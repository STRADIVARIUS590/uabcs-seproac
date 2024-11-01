<?php

namespace App\Traits;

use App\Models\Congress;
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

        ],
        Congress::class => [
                // 'name' => 'required',
                'user_id' => 'required|exists:users,id',
                'date' => 'required|date',
                'colaborators' => 'required|integer',
                'title_trabajo' => 'required',
                'event_name' => 'required'
            ]
        };

    }

    public function update_rules()
    {
        return match($this->model){
        Tag::class => array_merge($this->create_rules(), [
                'name' => 'required|unique:tags,name,'.$this->request->id,      
                'slug' => 'required|unique:tags,slug,'.$this->request->id,      
        ]),

        Congress::class => array_merge($this->create_rules(), [  ])};

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