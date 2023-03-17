<?php

namespace Database\Seeders;

use App\Models\MiembrosResolucion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MiembrosResolucionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $miembrosResolucion = MiembrosResolucion::create([
            'id_resolucion'=>'1',
            'id_persona'=>'1',
            'descripcionMiembro'=>'Participante',
        ]);

        $miembrosResolucion = MiembrosResolucion::create([
            'id_resolucion'=>'1',
            'id_persona'=>'2',
            'descripcionMiembro'=>'Participante',
        ]);

        $miembrosResolucion = MiembrosResolucion::create([
            'id_resolucion'=>'1',
            'id_persona'=>'3',
            'descripcionMiembro'=>'Participante',
        ]);
    }
}
