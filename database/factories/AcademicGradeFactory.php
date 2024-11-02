<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AcademicGrade>
 */
class AcademicGradeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulation_date' => fake()->date(),
            'name' => fake()->randomElement(['Licenciatura', 'Ingenieria', 'Doctorado']) . ' en ' . fake()->randomElement(['Sistemas', 'Administracion', 'Quimica Organica', 'Sistemas de INformacion'])
        ];
    }
}
