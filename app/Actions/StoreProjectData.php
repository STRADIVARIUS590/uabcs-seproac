<?php

namespace App\Actions;

use App\Models\Project;
use App\Services\SpafieFileService;
use Illuminate\Http\Request;
use App\Services\SpatieFileService;

class StoreProjectData {

    public function call(Project $project, Request $request)
    {
        SpatieFileService::store_files($project, $request);
        return $project;
    }
}