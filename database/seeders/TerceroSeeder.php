<?php

namespace Database\Seeders;

use App\Models\Tercero;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TerceroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tercero = Tercero::create([
            'id_tipoTercero'=>'1',
            't_dni'=>'76872456',
            't_apellidoP'=>'ApellidoP',
            't_apellidoM'=>'ApellidoM',
            't_nombres'=>'Nombre',
            't_numTelefono'=>'475132',
            't_numCelular'=>'965004343',
            't_email'=>'prueba@gmail.com',
        ]);
    }
}
