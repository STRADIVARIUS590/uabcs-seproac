<?php

namespace App\Services;

use App\Models\File;
use Illuminate\Http\Request;

trait FileService {

    public function store_files(Request $request)
    {
        if($request->hasFile('files_project')){
            foreach($request->files_project as $key => $file){

                $name = $file_name = uniqid() .'_.'. $file->getClientOriginalExtension();
              
                File::create([
                    'name' => $name,
                    'fileable_type' => $request['fileable_type'],
                    'fileable_id' => $request['fileable_id'],
                ]);

                $this->save_in_storage($file, $request);
            }
        }
    }

    public function save_in_storage($file, $request)
    {
        $file->storeAs('public/' . strtolower(class_basename($request['fileable_type'])) , $name);
    }
}