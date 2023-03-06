<?php

namespace Database\Seeders;

use App\Models\TipoEstudiante;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoEstudianteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $tipo_estudiante = TipoEstudiante::create([
            'c_nomTipoEstud'=>'',
        ]);

        $tipo_estudiante = TipoEstudiante::create([
            'c_nomTipoEstud'=>'Regular',
        ]);

        $tipo_estudiante = TipoEstudiante::create([
            'c_nomTipoEstud'=>'Traslado interno',
        ]);

        $tipo_estudiante = TipoEstudiante::create([
            'c_nomTipoEstud'=>'Traslado externo',
        ]);
    }
}
