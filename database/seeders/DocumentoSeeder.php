<?php

namespace Database\Seeders;

use App\Models\Documento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $documento = Documento::create([
            'id_estudiante'=>'2',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'3',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'4',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'5',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'6',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecReg'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'7',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
            'a_carnetRegistroCONADIS'=>'carnet-conadis.jpeg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'8',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecReg'=>'certificado-secundaria-prueba.jpg',
        ]);

        $documento = Documento::create([
            'id_estudiante'=>'9',
            'a_partidaNacimiento'=>'partida-de-nacimiento-prueba.png',
            'a_copiaDNI'=>'dni-prueba.jpg',
            'a_certificadoEstudioSecRegAlt'=>'certificado-secundaria-prueba.jpg',
        ]);
    }
}
