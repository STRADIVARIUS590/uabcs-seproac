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

            // publicaciones
            ['name' => 'Articulo'],
            ['name' => 'Libro'],
            ['name' => 'Capitulo'],

            // proyectos
            ['name' => 'Interno'],
            ['name' => 'Externo'],
            // cursos // trabajos de titulacion
            ['name' => 'Licenciatura'],
            ['name' => 'Maestria'],
            ['name' => 'Doctorado'],
            // congresos
            ['name' => 'Nacional'],
            ['name' => 'Internacional'],

            // tipos de contratacion / categorias de  maestros            
            ['name' => 'Tiempo completo'],
            ['name' => 'Titular C']
        ];

        foreach ($tags as $tag_info) {
            $t = Tag::create([
                'name' => $tag_info['name'],
                'slug' => Str::slug($tag_info['name'])
            ]);
        }
    }
}
