<?php

namespace Database\Seeders;

use App\Models\AcademicGrade;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicGradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(User::get() as $user){
             $number = mt_rand(2, 4);
            AcademicGrade::factory($number)->create([
                'user_id' => $user->id,
                'institution_id' => Institution::inRandomOrder()->first()->id,
            ]);
        }
    }
}
