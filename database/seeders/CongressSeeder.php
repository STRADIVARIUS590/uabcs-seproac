<?php

namespace Database\Seeders;

use App\Models\Congress;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CongressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(User::get() as $user)
        {
            $congress_number = mt_rand(5, 20);
            Congress::factory($congress_number)->create([
                'user_id' => $user->id,
            ])->each(function($item)
        {
            $item->tags()->attach(Tag::take(2)->get());
        });
        }
    }
}
