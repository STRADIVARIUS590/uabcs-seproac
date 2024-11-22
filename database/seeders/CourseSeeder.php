<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Institution;
use App\Models\Tag;
use App\Models\User;
use Database\Factories\CourseFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(User::all() as $user){
            $number = mt_rand(2, 5);
            Course::factory($number)->create([
                'user_id' => $user->id,
                'institution_id' => Institution::inRandomOrder()->first()->id
            ])->each(function($course){
                $course->tags()->attach(Tag::inRandomOrder()->take(2)->pluck('id'));
            });
        }
    }
}
