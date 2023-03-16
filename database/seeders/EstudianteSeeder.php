<?php

namespace Database\Seeders;

use App\Models\Estudiante;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstudianteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $Estudiante = Estudiante::create([
            'c_codMatricula' => '',
            'id_tipoEstudiante' => '1',
            'id_especialidad' => '1',
            'id_modalidad' => '1',
            'id_modalidadIngreso' => '1',
            'id_sede' => '1',
            'id_nivel' => '1',
            'id_seccion' => '1',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2021453255J',
            'id_tipoEstudiante' => '4',
            'id_especialidad' => '2',
            'id_modalidad' => '4',
            'id_modalidadIngreso' => '2',
            'id_sede' => '2',
            'id_nivel' => '2',
            'id_seccion' => '2',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2020495283D',
            'id_tipoEstudiante' => '2',
            'id_especialidad' => '3',
            'id_modalidad' => '2',
            'id_modalidadIngreso' => '3',
            'id_sede' => '2',
            'id_nivel' => '3',
            'id_seccion' => '3',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2018401365F',
            'id_tipoEstudiante' => '3',
            'id_especialidad' => '4',
            'id_modalidad' => '3',
            'id_modalidadIngreso' => '4',
            'id_sede' => '3',
            'id_nivel' => '4',
            'id_seccion' => '4',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2021741245B',
            'id_tipoEstudiante' => '3',
            'id_especialidad' => '5',
            'id_modalidad' => '3',
            'id_modalidadIngreso' => '5',
            'id_sede' => '3',
            'id_nivel' => '5',
            'id_seccion' => '5',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2021756135G',
            'id_tipoEstudiante' => '2',
            'id_especialidad' => '6',
            'id_modalidad' => '3',
            'id_modalidadIngreso' => '6',
            'id_sede' => '2',
            'id_nivel' => '6',
            'id_seccion' => '6',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2021740786H',
            'id_tipoEstudiante' => '2',
            'id_especialidad' => '7',
            'id_modalidad' => '2',
            'id_modalidadIngreso' => '7',
            'id_sede' => '2',
            'id_nivel' => '7',
            'id_seccion' => '7',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2016740886C',
            'id_tipoEstudiante' => '3',
            'id_especialidad' => '8',
            'id_modalidad' => '2',
            'id_modalidadIngreso' => '8',
            'id_sede' => '2',
            'id_nivel' => '8',
            'id_seccion' => '8',
        ]);

        $Estudiante = Estudiante::create([
            'c_codMatricula' => '2019250886F',
            'id_tipoEstudiante' => '2',
            'id_especialidad' => '9',
            'id_modalidad' => '4',
            'id_modalidadIngreso' => '9',
            'id_sede' => '2',
            'id_nivel' => '9',
            'id_seccion' => '9',
        ]);

    }
}
