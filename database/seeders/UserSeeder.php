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
            
        ],
        [
            'name' => 'Joel',
            'email' => 'joel@gmail.com',
            'password' => bcrypt('secret'),
            'birth_date' => Carbon::parse('28-11-1999'),
            'date_ingreso' => Carbon::parse('28-11-1999'),
            'role_id' => 2,
            ]
        ];

        $users = [];
        foreach ($data as $item) {
            User::create($item);
            $users[] = $item;
        }

    }
}
