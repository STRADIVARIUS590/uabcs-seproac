<?php

namespace App\Services;

use App\Models\File;
use Illuminate\Http\Request;

trait FileService {

    public function store_files(Request $request)
    {
        if($request->file('files')){
            foreach($request->file('files') as $key => $file){

                $name = uniqid() .'_.'. $file->getClientOriginalExtension();
                error_log($name);
                File::create([
                    'name' => $name,
                    'fileable_type' => $request['fileable_type'],
                    'fileable_id' => $request['fileable_id'],
                ]);

                // $this->save_in_storage($file, $request);
                
                $file->storeAs('public/' . strtolower(class_basename($request['fileable_type'] . '/' . $name)));
            }
        }
    }

    public function save_in_storage($file, $request)
    {
        $file->storeAs('public/' . strtolower(class_basename($request['fileable_type'])) , $file->name);
    }
}