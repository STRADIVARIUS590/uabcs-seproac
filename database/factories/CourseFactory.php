<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomError;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Matematicas Discretas', 'Calculo Integral', 'Redes 2', 'Redes 1', 'Base de datos ']) . '' . random_int(1,6) . ' Semestre ' . fake()->randomElement(['IDS', 'ITC', 'LATI']),
            'total_hours' => mt_rand(50, 100),
            'total_students' => mt_rand(10, 30),
            'educative_level' => fake()->randomElement(['Licenciatura', 'Doctorado', 'Maestria']),
            'period' => fake()->date() . ' - ' . fake()->date(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
        ];
    }
}
