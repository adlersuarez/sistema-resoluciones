<?php

namespace Database\Seeders;

use App\Models\ModalidadIngreso;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModalidadIngresoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Postulante Ordinario o Regular',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Titulados o Graduados',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Traslado Externo de una Universidad Nacional o Extranjera',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Traslado Interno',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Primeros puestos de nivel secundario',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Deportista destacado',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Personas con discapacidad',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Titulado o Egresado de Institutos Pedagógicos o Tecnológicos',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Mayores de 30 años',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Primera Selección',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Oficiales de las FF.AA. y FF.PP.',
        ]);

        $modalidad_ingreso = ModalidadIngreso::create([
            'c_nomModalidadIngreso'=>'Sub Oficiales de las FF.AA. y FF.PP.',
        ]);
    }
}
