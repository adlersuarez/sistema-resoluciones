<?php

namespace Database\Seeders;

use App\Models\TipoAsunto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoAsuntoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Aprobar',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Disponer',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Encargar',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Dar por conocido',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Transcribir',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Desestimar',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Modificar',
        ]);
        
        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Precisar',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Autorizar',
        ]);

        $tipo_asunto = TipoAsunto::create([
            'c_nombreTipoAsunto'=>'Rectificar',
        ]);
    }
}
