<?php

namespace App\Traits;

use App\Models\Congress;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;
use App\Models\AcademicGrade;
use App\Models\Course;
use App\Models\Institution;
use App\Models\Project;
use App\Models\Publication;
use Database\Seeders\AcademicGradeSeeder;

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
        Publication::class => [
             'title' => 'nullable|string|max:255',                   
            'user_id' => 'nullable|exists:users,id',                
            'type' => 'nullable|string|max:10',                     
            'issn-isbn' => 'nullable|string|max:255',             
            'doi' => 'nullable|string|max:255',                  
            'magazine_name' => 'nullable|string|max:255',        
            'authors' => 'nullable|string|max:255',              
            'publication_date' => 'nullable|date',                
            'period' => 'nullable|string|max:255',                

        ],

        Project::class => [ 'user_id' => 'nullable|exists:users,id',        
            'name' => 'nullable|string|max:60',                
            'description' => 'nullable|string|max:60',         
            'objetives' => 'nullable|string|max:60',          
            'colaborators' => 'nullable|string|max:60',       
            'start_date' => 'nullable|date',                  
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'nullable|integer',                           
            'period' => 'nullable|string|max:10',                   
    ],

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
        ],
        AcademicGradeSeeder::class ,'App\Models\Academicgrade' => [
            'user_id' => 'required|exists:users,id', 
            'institution_id' => 'required|exists:institutions,id',  
            'name' => 'required|string|max:255',                    
            'titulation_date' => 'required|date',  
        ],
        
        Institution::class => [
            'name' => 'required|string|max:255',                    
        ],
        Course::class => [
                'user_id' => 'nullable|exists:users,id',       
                'name' => 'required|string|max:255',           
                'total_hours' => 'required|integer|min:0',     
                'total_students' => 'required|integer|min:0',  
                'educative_level' => 'required|string|max:255', 
                'period' => 'required|string|max:255',          
                'institution_id' => 'sometimes|nullable|exists:institutions,id',          

            ]
        };

    }

    public function update_rules()
    {
        return match($this->model){
        Publication::class => array_merge($this->create_rules(), [  ])
        
        ,Project::class => array_merge($this->create_rules(), [  ])
        
        ,Tag::class => array_merge($this->create_rules(), [
                'name' => 'required|unique:tags,name,'.$this->request->id,      
                'slug' => 'required|unique:tags,slug,'.$this->request->id,      
        ])

        ,Congress::class => array_merge($this->create_rules(), [  ])
        
        ,AcademicGrade::class, 'App\Models\Academicgrade' => array_merge($this->create_rules(), [  ])
        
        ,Institution::class => array_merge($this->create_rules(), [  ])
        
        ,Course::class => array_merge($this->create_rules(), [  ])
        
    };
        

    }

    public function validator()
    {
        $validator =  $this->creating ? Validator::make($this->request->all(), $this->create_rules()) : Validator::make($this->request->all(), $this->update_rules());
        error_log(json_encode($validator->errors()));
        return $validator;
    }

    public function creating(){
        $this->creating = true;
        return $this;
    }
}