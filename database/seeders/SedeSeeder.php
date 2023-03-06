<?php

namespace Database\Seeders;

use App\Models\Sede;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SedeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $sede = Sede::create([
            'c_nomSede' => '',
            'c_dirección' => ''
        ]);

        $sede = Sede::create([
            'c_nomSede' => 'Sede Central Huancayo',
            'c_dirección' => 'Av. Mártires del periodismo cuadra 20  (Ex Calmell del Solar) Chorrillos | Huancayo.'
        ]);

        $sede = Sede::create([
            'c_nomSede' => 'Filial Chanchamayo',
            'c_dirección' => 'Mg. Jesús César Sandoval Trigos'
        ]);
    }
}
