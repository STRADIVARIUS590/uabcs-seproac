<?php

namespace App\Services;

use Illuminate\Http\Request;
use Spatie\MediaLibrary\HasMedia;

class SpatieFileService {
    public static function store_files(HasMedia $model, Request $request){
           foreach($request->files as $key => $files) {
            foreach($files as $file) {
                $model->addMedia($file)->toMediaCollection($key);
            }
        }
    }
}