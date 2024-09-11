<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_ids = User::all();
        foreach(User::all() as $user){
            $p = Project::create([
                'name' => 'RESEARCH _' . uniqid(),
                'user_id' => $user->id,
                'description' => fake()->text(10),
                'objetives' => fake()->text(10),
                'colaborators' => fake()->text(10),
                'start_date' => now()->subYears(10),
                'end_date' => now(),
            ]);
            error_log(json_encode($p));
        }
    }
}
