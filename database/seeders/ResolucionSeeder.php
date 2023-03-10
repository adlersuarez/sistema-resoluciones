<?php

namespace Database\Seeders;

use App\Models\Resolucion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResolucionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $resolucion = Resolucion::create([
            'id'=>'1',
            'id_tipoSesion'=>'1',
            'id_tipoResolucion'=>'1',
            'id_carreraProfesional'=>'1',
            'id_sede'=>'1',
            'nombreResolucion'=>'01-2022-AU',
            'numeroResolucion'=>'1',
            'archivoResolucion'=>'archivoPrueba.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-09',
        ]);

        $resolucion = Resolucion::create([
            'id'=>'1',
            'id_tipoSesion'=>'2',
            'id_tipoResolucion'=>'2',
            'id_carreraProfesional'=>'2',
            'id_sede'=>'2',
            'nombreResolucion'=>'02-2022-AU',
            'numeroResolucion'=>'2',
            'archivoResolucion'=>'archivoPrueba.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-10',
        ]);
    }
}
