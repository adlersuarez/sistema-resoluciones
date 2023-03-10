<?php

namespace Database\Seeders;

use App\Models\TipoResolucion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoResolucionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoResolucion = TipoResolucion::create([
            'nombreTipoResolucion'=>'Asamblea Universitaria',
            'acronimoTipoResolucion'=>'AU',
            'descripcionTipoResolucion'=>'Descripcion de AU',
        ]);

        $tipoResolucion = TipoResolucion::create([
            'nombreTipoResolucion'=>'Rectorado',
            'acronimoTipoResolucion'=>'R',
            'descripcionTipoResolucion'=>'Descripcion de R',
        ]);

        $tipoResolucion = TipoResolucion::create([
            'nombreTipoResolucion'=>'Consejo Universitario',
            'acronimoTipoResolucion'=>'CU',
            'descripcionTipoResolucion'=>'Descripcion de CU',
        ]);
    }
}
