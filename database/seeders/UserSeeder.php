<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        
        $data = [
        [
            'name' => 'Sistemas',
            'email' =>  'sistemas@gmail.com',
            'password' => bcrypt('secret'),
            'role_id' => 1,
            'birth_date' => Carbon::parse('28-11-1999'),
            'date_ingreso' => Carbon::parse('28-11-1999'),
            'contratation_type' => 'Base',
            'sex' => 'M',
            'category' => 'Titular C',
            
        ],
        [
            'name' => 'Joel',
            'email' => 'joel@gmail.com',
            'password' => bcrypt('secret'),
            'birth_date' => Carbon::parse('28-11-1999'),
            'date_ingreso' => Carbon::parse('28-11-1999'),
            'role_id' => 2,
            'contratation_type' => 'Base',
            'sex' => 'M',
            'category' => 'Titular C',
        ],
        [
            'name' => 'Marcos',
            'email' => 'masrcons_21@alu.uabcs.mx',
            'password' => bcrypt('1234567890'),
            'birth_date' => Carbon::parse('07-09-2003'),
            'date_ingreso' => Carbon::parse('28-11-1999'),
            'role_id' => 3,
            'contratation_type' => 'Base',
            'sex' => 'M',
            'category' => 'Titular C',

        ],
        [
            'name' => 'Hazael',
            'email' => 'hazaels_21@alu.uabcs.mx',
            'password' => bcrypt('1234567890'),
            'birth_date' => Carbon::parse('07-09-2003'),
            'date_ingreso' => Carbon::parse('28-11-1999'),
            'role_id' => 4,
            'sex' => 'M',
            'contratation_type' => 'Base',
            'category' => 'Titular C',
        ],
        
        ];

        $users = [];
        foreach ($data as $item) {
            User::create($item);
            $users[] = $item;
        }

    }
}
