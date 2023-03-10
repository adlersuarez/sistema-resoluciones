<?php

namespace Database\Seeders;


use App\Models\ExternosResolucion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExternosResolucionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $externosResolucion = ExternosResolucion::create([
            'id_resolucion'=>'1',
            'id_tercero'=>'1',
            'descripcionExterno'=>'Participante',
        ]);
    }
}
