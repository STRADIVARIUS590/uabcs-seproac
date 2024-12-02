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
use MathieuViossat\Util\ArrayToTextTable;

class UsersReport {

    public $request;
    public $format;
    public function __construct(Request $request){
        $request['format'] = $request['format'] ?? 'xlsx';
        $this->request = $request;
    }

    public function query()
    {
        // traemos la info de la bd (aplicando filtros y eso)
        return User::query()->select(['id', ...(new User())->getFillable()])
        ->with('role')->when(isset($this->request->end_date, $this->request->start_date), function($q){})
        ->get();
    }

    public function report_info($collection)
    {
        $data = collect();
        // proceso de hacer el reporte (calculos, etc)
        // return User::query()->get();
        foreach ($collection as $key => $value){
            $collection[$key]['A_PENDED'] = $value['id'] * 3;
        }

        
        return $collection;
    }

    public function mapping()
    {
        return [
            ['heading' => 'Nombre', 'get' => 'name', 'transform' => function($value) { return strtoupper($value); }],
            // ['heading' => 'test', 'get' => 'A_PENDED'],
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

        if($this->request->format == 'xlsx'){

            return Excel::download($report, $this->file_name());

        }else if($this->request->format == 'txt'){

            $data = [];

            foreach($info as $key => $row) {
                $data[] = array_combine($report->headings(), $report->map($row));
            }

            $name = storage_path($this->file_name());
           
            $str = $this->renderer($data);
          
            file_put_contents($name , $str);

            return response()->download($name)->deleteFileAfterSend();

        }else if($this->request->format == 'json') {
            return json_encode($info);
        }


        
        // web xml , etc

    }

    public function file_name()
    {
        return 
        strtoupper(
        Str::slug(
        'REPORTE_USUARIOS_SEPROAC'.

        (isset($this->request->start_date, $this->request->end_date) 
        ? '_PERIODO_' . $this->request->start_date . '-' . $this->request->end_date
        : '') . 
    

        '_CREATED_'.Carbon::now()->format('Y-m-d H:i:s'), '_')).'.'.
        
        $this->request->format;
    }

     public static function renderer($array){
        return (new ArrayToTextTable($array))->getTable();
    }
}

