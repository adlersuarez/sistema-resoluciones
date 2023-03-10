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
            'nombreResolucion'=>'Asamblea Universitaria',
            'acronimoResolucion'=>'AU',
            'descripcionResolucion'=>'Descripcion de AU',
        ]);

        $tipoResolucion = TipoResolucion::create([
            'nombreResolucion'=>'Rectorado',
            'acronimoResolucion'=>'R',
            'descripcionResolucion'=>'Descripcion de R',
        ]);

        $tipoResolucion = TipoResolucion::create([
            'nombreResolucion'=>'Consejo Universitario',
            'acronimoResolucion'=>'CU',
            'descripcionResolucion'=>'Descripcion de CU',
        ]);
    }
}
