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
            'archivoResolucion'=>'1-2022-AU A.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-10',
        ]);

        $resolucion = Resolucion::create([
            'id'=>'1',
            'id_tipoSesion'=>'2',
            'id_tipoResolucion'=>'2',
            'id_carreraProfesional'=>'2',
            'id_sede'=>'2',
            'nombreResolucion'=>'01-2022-R',
            'numeroResolucion'=>'1',
            'archivoResolucion'=>'1-2022-R A.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-10',
        ]);

        $resolucion = Resolucion::create([
            'id'=>'1',
            'id_tipoSesion'=>'2',
            'id_tipoResolucion'=>'3',
            'id_carreraProfesional'=>'3',
            'id_sede'=>'2',
            'nombreResolucion'=>'01-2022-CU',
            'numeroResolucion'=>'1',
            'archivoResolucion'=>'1-2022-CU A.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-10',
        ]);
    }
}
