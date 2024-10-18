<?php

namespace Database\Seeders;

use App\Models\User;
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
        $data = [
        [
            'name' => 'Sistemas',
            'email' =>  'sistemas@gmail.com',
            'password' => bcrypt('secret'),
            'role_id' => 1,
        ],
        [
            'name' => 'Joel',
            'email' => 'joel@gmail.com',
            'password' => bcrypt('secret'),
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
