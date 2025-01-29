<?php

namespace Database\Seeders;

use App\Models\Publication;
use App\Models\Tag;
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
            $user_name = $user->name;
            $p = Publication::create([
                'user_id' => $user->id,
                'title' => 'PUBLICATION '.uniqid(),
                'type' => fake()->randomElement(['A', 'B', 'C', 'D', 'E', 'F']),
                'issn_isbn' => Str::random(10),
                'doi' => Str::random(10),
                'magazine_name' => fake()->randomElement(['Nature Today', 'Science']) ,
                'authors' => json_encode(array_map(
                    fn($name) => ['name' => $name], // Convert each name to ['name' => $name]
                    array_merge(
                        [$user_name], // Start with the given user name
                        [fake()->name], // Add one randomly generated name
                        array_map(fn() => fake()->name, range(1, random_int(0, 4))) // Generate unique names
                    )
                )),
                'publication_date' => fake()->dateTimeInInterval(),
                'period' => 'Period'
            ]);
            
            $p->tags()->attach(Tag::inRandomOrder()->take(2)->pluck('id'));
                        
        }
    }
}
