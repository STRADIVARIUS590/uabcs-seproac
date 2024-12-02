<?php

namespace App\Services;

use App\Exports\UsersReport as ExportsUsersReport;
use App\Models\User;
use App\Services\UserExcelReport;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;

class UsersReport {

    public $request;
    public $format;
    public function __construct(Request $request){
        $this->request = $request;
    }

    public function query()
    {
        // traemos la info de la bd (aplicando filtros y eso)
        return User::query()
        ->with('role')->when(isset($this->request->end_date, $this->request->start_date), function($q){})
        ->get();
    }

    public function report_info($collection)
    {
        $data = collect();
        // proceso de hacer el reporte (calculos, etc)
        // return User::query()->get();
        foreach ($collection as $key => $value){
         ///;
            // $data[] = $value * 3;
        }

        // return $data;
        return $collection;
    }

    public function mapping()
    {
        return [
            ['heading' => 'Nombre', 'get' => 'name', 'transform' => function($value) { return strtoupper($value); }],
            ['heading' => 'Correo', 'get' => 'email', 'transform' => function($value) { return strtoupper($value); }],
            ['heading' => 'Fecha de nacimiento', 'get' => 'birth_date', 'transform' => function($value) { return strtoupper($value); }],
            ['heading' => 'Fecha de ingreso', 'get' => 'date_ingreso', 'transform' => function($value) { return strtoupper($value); }],
            ['heading' => 'Genero', 'get' => 'sex', 'transform' => function($value) { return strtoupper($value); }],
            ['heading' => 'Rol', 'get' => function($item) { return $item['role']['name'] ?? ''; }, 'transform' => function($value) { return strtoupper($value); }],
        
            ];
    }

    public function make()
    {

        $info = $this->report_info($this->query());

        $report = new ExportsUsersReport($info, $this->mapping());

        if(true || $this->request->format == 'xlsx'){

            return Excel::download($report, $this->file_name());

        }else if($this->request->format == 'txt'){

            $data = [];

            foreach($info as $key => $row) {
                $data[] = $report->map($row);
            }

            $name = storage_path($this->file_name());

            Storage::put($name, json_encode($data));

            return Storage::download($name)->deleteAfterSend();

        }else if($this->request->format == 'json') {
            return json_encode($info);
        }

        // web xml , etc

    }

    public function file_name()
    {
        return 
        'REPORTE_USUARIOS_SEPROAC'.

        (isset($this->request->start_date, $this->request->end_date) 
        ? '_PERIODO_' . $this->request->start_date . '-' . $this->request->end_date
        : '') . 
    

        '_CREATED_'.Carbon::now()->format('Y-m-d H:i:s').'_.' 
        
        . $this->request->format;
    }
}

