<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Str;
class PublicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach(User::all() as $user)
        {
            Publication::create([
                'user_id' => $user->id,
                'title' => 'PUBLICATION '.uniqid(),
                'type' => fake()->randomElement(['A', 'B', 'C', 'D', 'E', 'F']),
                'issn-isbn' => Str::random(10),
                'doi' => Str::random(10),
                'magazine_name' => fake()->randomElement(['Nature Today', 'Science']) ,
                'authors' => fake()->name(),
                'publication_date' => fake()->dateTimeInInterval(),
                'period' => 'Period'
            ]);
        }
    }
}
