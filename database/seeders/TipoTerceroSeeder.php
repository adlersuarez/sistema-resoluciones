<?php

namespace Database\Seeders;

use App\Models\TipoTercero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoTerceroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoTercero = TipoTercero::create([
            'nombreTercero'=>'Tercero 1',
            'descripcionTercero'=>'Descripcion 1',
        ]);
    }
}
