<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersReport implements FromCollection, WithMapping, WithHeadings, ShouldAutoSize
{

    public function __construct(protected $info, protected $mapping )
    {
        
    }
    public function collection(){   return $this->info;   }    

    public function map($row) : array
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

    public function headings(): array
    {
        return array_column($this->mapping, 'heading');
    }
    
}
