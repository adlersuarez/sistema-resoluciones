<?php

namespace Database\Seeders;

use App\Models\TipoSesion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoSesionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoSesion = TipoSesion::create([
            'nombreSesion'=>'Ordinaria',
            'descripcionSesion'=>'Descripcion de ordinaria',
        ]);

        $tipoSesion = TipoSesion::create([
            'nombreSesion'=>'Extraordinaria',
            'descripcionSesion'=>'Descripcion de extraordinaria',
        ]);
    }
}
