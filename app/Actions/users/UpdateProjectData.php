<?php

namespace App\Actions;

use App\Models\Project;
use App\Services\SpatieFileService;
use Illuminate\Http\Request;

class UpdateProjectData {

    public function call(Project $project, Request $request)
    {
        SpatieFileService::store_files($project, $request);

        return $project;
    }
}