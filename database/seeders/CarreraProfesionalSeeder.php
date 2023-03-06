<?php

namespace Database\Seeders;

use App\Models\CarreraProfesional;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarreraProfesionalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'1',
            'c_nomCarreraProf'=>'',
            'c_acroCarreraProf'=>''
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'2',
            'c_nomCarreraProf'=>'Administración y Sistemas',
            'c_acroCarreraProf'=>'AS'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'2',
            'c_nomCarreraProf'=>'Contabilidad y Finanzas',
            'c_acroCarreraProf'=>'CF'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'3',
            'c_nomCarreraProf'=>'Derecho',
            'c_acroCarreraProf'=>'DR'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'3',
            'c_nomCarreraProf'=>'Educación Inicial',
            'c_acroCarreraProf'=>'EI'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'3',
            'c_nomCarreraProf'=>'Educación Primaria',
            'c_acroCarreraProf'=>'EP'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'4',
            'c_nomCarreraProf'=>'Arquitectura',
            'c_acroCarreraProf'=>'AQ'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'4',
            'c_nomCarreraProf'=>'Ingeniería Civil',
            'c_acroCarreraProf'=>'IC'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'4',
            'c_nomCarreraProf'=>'Ingeniería del Medio Ambiente y Desarrollo',
            'c_acroCarreraProf'=>'MA'

        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'4',
            'c_nomCarreraProf'=>'Ingeniería Industrial',
            'c_acroCarreraProf'=>'II'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'4',
            'c_nomCarreraProf'=>'Ingeniería de Sistemas y Computación',
            'c_acroCarreraProf'=>'SC'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'5',
            'c_nomCarreraProf'=>'Medicina Humana',
            'c_acroCarreraProf'=>'MH'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Enfermería',
            'c_acroCarreraProf'=>'EF'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Farmacia y Bioquímica',
            'c_acroCarreraProf'=>'FB'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Medicina Veterinaria y Zootecnia',
            'c_acroCarreraProf'=>'VZ'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Nutrición Humana',
            'c_acroCarreraProf'=>'NH'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Obstetricia',
            'c_acroCarreraProf'=>'OT'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Odontología',
            'c_acroCarreraProf'=>'OL'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Psicología',
            'c_acroCarreraProf'=>'PS'
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'6',
            'c_nomCarreraProf'=>'Tecnología Médica',
            'c_acroCarreraProf'=>'TM'
        ]);

        /*
        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'7',
            'c_nomCarreraProf'=>'Tecnología Médica Especialidad de Laboratorio Clínico y Anatomía Patológica',
            'c_acroCarreraProf'=>''

        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'7',
            'c_nomCarreraProf'=>'Tecnología Médica Especialidad de Terápia Física y Rehabilitación',
            'c_acroCarreraProf'=>''
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'7',
            'c_nomCarreraProf'=>'Tecnología Médica Especialidad de Radiología',
            'c_acroCarreraProf'=>''
        ]);

        $carrera_profesional = CarreraProfesional::create([
            'id_facultad'=>'7',
            'c_nomCarreraProf'=>'Tecnología Médica Especialidad de Optometría',
            'c_acroCarreraProf'=>''
        ]);
        */

    }
}
