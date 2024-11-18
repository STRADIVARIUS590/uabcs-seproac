<?php

namespace Database\Seeders;

use App\Models\Institution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstitutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutions = [
            [
                'name' => 'Instituto Tecnologido de La Paz'
            ],
            [
                'name' => 'Universidad Automoma de Baja California Sur'
            ]
        ];

        foreach ($institutions as $institution){
            $i = Institution::create([
                'name' => $institution['name'],
            ]);
        }
    }
}
