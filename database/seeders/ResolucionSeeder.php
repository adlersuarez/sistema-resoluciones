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
            'nombreResolucion'=>'ABC',
            'numeroResolucion'=>'12',
            'archivoResolucion'=>'archivoPrueba.pdf',
            'asuntoResolucion'=>'Asunto de Prueba',
            'fechaResolucion'=>'2023-03-10',
        ]);
    }
}
