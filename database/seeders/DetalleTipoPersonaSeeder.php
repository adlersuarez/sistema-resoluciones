<?php

namespace Database\Seeders;

use App\Models\DetalleTipoPersona;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DetalleTipoPersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'1',
            'id_estudiante'=>'1',
            'id_administrativo'=>'2',
            'id_persona'=>'1',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'2',
            'id_administrativo'=>'1',
            'id_persona'=>'2',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'3',
            'id_administrativo'=>'1',
            'id_persona'=>'3',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'4',
            'id_administrativo'=>'1',
            'id_persona'=>'4',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'5',
            'id_administrativo'=>'1',
            'id_persona'=>'5',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'6',
            'id_administrativo'=>'1',
            'id_persona'=>'6',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'2',
            'id_estudiante'=>'7',
            'id_administrativo'=>'1',
            'id_persona'=>'7',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'3',
            'id_estudiante'=>'8',
            'id_administrativo'=>'1',
            'id_persona'=>'8',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'3',
            'id_estudiante'=>'9',
            'id_administrativo'=>'1',
            'id_persona'=>'9',
        ]);

        $detalle_tipo_persona = DetalleTipoPersona::create([
            'id_tipoPersona'=>'1',
            'id_estudiante'=>'1',
            'id_administrativo'=>'4',
            'id_persona'=>'10',
        ]);
    }
}
