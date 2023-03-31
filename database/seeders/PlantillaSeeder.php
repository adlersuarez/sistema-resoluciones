<?php

namespace Database\Seeders;

use App\Models\Plantilla;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlantillaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plantilla = Plantilla::create([
            'id_tipoResolucion' => '1',
            'c_nombrePlantilla' => 'Asamblea Uiversitaria - 0001',
            'c_descripcionPlantilla' => 'Elaborada el 30.03.2023 con.....',
            'c_archivoPlantilla' => 'plantilla-AU.docx',
            'fecha_plantilla' => '2023-03-30',
        ]);

        $plantilla = Plantilla::create([
            'id_tipoResolucion' => '2',
            'c_nombrePlantilla' => 'Rectorado - 0001',
            'c_descripcionPlantilla' => 'Elaborada el 29.03.2023 con.....',
            'c_archivoPlantilla' => 'plantilla-R.docx',
            'fecha_plantilla' => '2023-03-29',
        ]);

        $plantilla = Plantilla::create([
            'id_tipoResolucion' => '3',
            'c_nombrePlantilla' => 'Consejo Uiversitario - 0001',
            'c_descripcionPlantilla' => 'Elaborada el 28.03.2023 con.....',
            'c_archivoPlantilla' => 'plantilla-CU.docx',
            'fecha_plantilla' => '2023-03-28',
        ]);

    }
}
