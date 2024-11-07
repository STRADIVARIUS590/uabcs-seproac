<?php

namespace App\Services;

class UserExcelReport {

    // public $mapping;
    public function __construct(protected $info, protected $mapping) { }

    public function collection(){   return $this->info;   }    

    public function map($row)
    {
        $data = [];
        foreach($this->mapping as $column){
            
            $value = is_string($column['get']) ? $row[$column['get']] : $column['get']($row); // el valor esta directamente en el array

            $transform = ($column['transform']) ?? null; // function para formatear (si existe)

            $value = $transform ? $transform($value) : $value;

            array_push($data, trim($value));
        }

        return $data;
    }
}