<?php

namespace App\Reports;

use App\Models\User;
use App\Services\UserExcelReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserReport {

    public $request;
    public $format;
    public function __construct(Request $request){

    }

    public function query()
    {
        // traemos la info de la bd (aplicando filtros y eso)
        return User::query()
        ->when(isset($this->request->end_date, $this->request->start_date), function($q){
            //// code 
        })
        ->get();
    }

    public function report_info($collection)
    {
        $data = collect();
        // proceso de hacer el reporte (calculos, etc)
        // return User::query()->get();
        foreach ($collection as $key => $value){
         ///    ;
            $data[] = $value * 3;
        }

        return $data;
    }

    public function mapping()
    {
        return [
            'heading' => 'Nombre', 'get' => 'name', 'transform' => function($value) { return strtoupper($value); }
        ];
    }

    public function make()
    {


        $info = $this->report_info($this->query());

        $report = new UserExcelReport($info, $this->mapping());

        if($this->request->format == 'xlsx'){

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
        return  Str::slug(now()->format('Y-m-d H:ii:s'). ' ' .
        isset($this->request->start_date, $this->request->end_date) ? 'PERIODO DEL ' .Str::slug($this->request->start_date) . ' AL ' . Str::slug($this->request->end_date) : ''. 
        'REPORTE_USUARIOS .' . $this->request->format);
    }
}

