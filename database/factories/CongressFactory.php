<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Congress>
 */
class CongressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title_trabajo' => 'Estudio sobre '. fake()->randomElement(['el impacto', 'la importancia', 'el rendimiento']) .' de '. fake()->randomElement(['Las universidades', 'La Tecnologia', 'Las clases virtuales']). ' _ '.uniqid(),
            'event_name' => 'Congreso sobre '. fake()->randomElement(['', 'Bioquimica en las plantas', 'Desarrollo organizacional', 'Sistemas concurrentes']),
            'date' => fake()->date(),
            'colaborators' => fake()->name().', '.fake()->name(),
        ];
    }
}
