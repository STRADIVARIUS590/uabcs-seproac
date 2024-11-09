<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Sistemas de Informacion'],
            ['name' => 'Publicacion'],
            ['name' => 'Congreso'],
            ['name' => 'Disertacion'],
            ['name' => 'Tesis'],
            ['name' => 'Proyectos Academicos'],
    
        ];

        foreach ($tags as $tag_info) {
            $t = Tag::create([
                'name' => $tag_info['name'],
                'slug' => Str::slug($tag_info['name'])
            ]);
        }
    }
}
