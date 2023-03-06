<?php

namespace Database\Seeders;

use App\Models\Modalidad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModalidadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $modalidad = Modalidad::create([
            'c_nomModalidad'=>'',
        ]);

        $modalidad = Modalidad::create([
            'c_nomModalidad'=>'Presencial',
        ]);

        $modalidad = Modalidad::create([
            'c_nomModalidad'=>'Virtual',
        ]);

        $modalidad = Modalidad::create([
            'c_nomModalidad'=>'Semi-presencial',
        ]);

    }
}
