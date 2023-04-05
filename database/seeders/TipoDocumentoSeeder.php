<?php

namespace Database\Seeders;

use App\Models\TipoDocumento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoDocumentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $tipo_documento = TipoDocumento::create([
            'nombreDocumento'=>'Oficio',
            'descripcionDocumento' => 'Es un documento que se usa cuando un mismo tema o texto va dirigido a más de un destinatario, por esta razón las instituciones o dependencias incluyen el número de oficio, dejando puntos suspensivos para escribir el nombre y el cargo, para especificarlo cuando el caso lo requiera',
        ]);

        $tipo_documento = TipoDocumento::create([
            'nombreDocumento'=>'Proveído',
            'descripcionDocumento' => 'Es un documento generado por un órgano o unidad orgánica, que deriva, conduce o remite el expediente por un flujo determinado, impulsando su trámite o información solicitada, debe ser breve y contener en el mensaje la recomendación del caso.',
        ]);
    }
}
