<?php

namespace Database\Seeders;

use App\Models\Facultad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FacultadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $facultad = Facultad::create([
            'c_nomFacultad'=>'',
            'c_acroFacultad'=>'',
        ]);

        $facultad = Facultad::create([
            'c_nomFacultad'=>'Facultad de Ciencias Administrativas y Contables',
            'c_acroFacultad'=>'CA',
        ]);

        $facultad = Facultad::create([
            'c_nomFacultad'=>'Facultad de Derecho y Ciencias Políticas',
            'c_acroFacultad'=>'DE',
        ]);

        $facultad = Facultad::create([
            'c_nomFacultad'=>'Facultad de Ingeniería',
            'c_acroFacultad'=>'IN',
        ]);

        $facultad = Facultad::create([
            'c_nomFacultad'=>'Facultad de Medicina Humana',
            'c_acroFacultad'=>'MH',
        ]);

        $facultad = Facultad::create([
            'c_nomFacultad'=>'Facultad de Ciencias de la Salud',
            'c_acroFacultad'=>'CS',
        ]);

    }
}
