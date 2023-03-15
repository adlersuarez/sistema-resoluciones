<?php

namespace Database\Seeders;

use App\Models\TipoPersona;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoPersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipo_persona = TipoPersona::create([
            'nombreTipoPersona'=>'Administrativo',
            'descripcionPersona'=>'Descripción tipo administrativo',
        ]);

        $tipo_persona = TipoPersona::create([
            'nombreTipoPersona'=>'Docente',
            'descripcionPersona'=>'Descripción tipo docente',
        ]);

        $tipo_persona = TipoPersona::create([
            'nombreTipoPersona'=>'Estudiante',
            'descripcionPersona'=>'Descripción tipo estudiante',
        ]);
    }
}
