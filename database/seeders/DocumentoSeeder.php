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
        //
        $documento = Documento::create([
            'id_tipoDocumento'=>'1',
            'num_documento'=>'3911',
            'subNum_documento'=>'2021-SUNEDU-02-13',
            'fecha_documento'=>'2021-12-15',
            'considerando_documento'=>'la Dirección de Supervisión de la Superintendencia Nacional de Educación Superior Universitaria mediante Oficio N° 3911-2021-SUNEDU-02-13 de fecha 15.12.2021, remite al señor Rector de la Universidad Peruana Los Andes, adjuntado el Informe de Resultados N° 0507-2021-SUNEDU02-13, en la cual informa los resultados de la supervisión a la Universidad Peruana Los Andes, respecto al cumplimiento de las obligaciones previstas en el artículo 6, numeral 7.1 del artículo 7, numeral 8.1 del artículo 8, el artículo 9 y el literal a) del artículo 13 del Reglamento del Proceso de Cese de Actividades de Universidades y Escuelas de Posgrado, aprobado mediante Resolución del Consejo Directivo N° 111-2018-SUNEDU/CD, en el marco del cese voluntario de programas y/o establecimientos, para su tratamiento en lo pertinente;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'1',
            'num_documento'=>'3914',
            'subNum_documento'=>'2021-SUNEDU-02-13',
            'fecha_documento'=>'2021-12-15',
            'considerando_documento'=>'la Dirección de Supervisión de la Superintendencia Nacional de Educación Superior Universitaria mediante Oficio N° 3914-2021-SUNEDU-02-13 de fecha 15.12.2021, remite al señor Rector de la Universidad Peruana Los Andes, adjuntado ei informe de Resultados N° 0509-2021-SUNEDU02-13 en ia cual informa los resultados de la supenvisión a la Universidad Peruana Los Andes, respecto al cumplimiento de las obligaciones previstas en el artículo 6, y numerales 7.1 y 7.2 del artículo 7 del Reglamento del Proceso de Cese de Actividades de Universidades y Escuelas de Posgrado durante el año 2020, aprobado mediante Resolución del Consejo Directivo N° 111-2018-SUNEDU/CD, en el marco del cese voluntario de programas y/o establecimientos, para su tratamiento en lo pertinente;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'1',
            'num_documento'=>'305',
            'subNum_documento'=>'OPDITT-UPLA-2021',
            'fecha_documento'=>'2021-12-29',
            'considerando_documento'=>'el Jefe Oficina de Proyectos Desarrollo Investigación y Transferencia Tecnológica mediante Oficio N" 305-OPDITT-UPLA-2021 de fecha 29.12.2021, comunica al señor Vicerrector de Investigación, que ha revisado el Proyecto de Investigación titulado: "MORTALIDAD POR TOXICIDAD PULMONAR POR OXIGENO EN PACIENTES EN VENTILACIÓN MECÁNICA INVASIVA EN LA ALTITUD. ESTUDIO DE COHORTE", presentado por el Docente Ejecutor: M.C. Juan Amilcar Tinoco Solórzano (Investigador Principal), Docente Contratado, adscrito al Departamento de Ciencias Biomédicas de la Facultad de Medicina Humana, el mismo que cumple con los requisitos exigidos por el Reglamento de Investigación de la Universidad Peruana Los Andes, siendo su opinión favorable;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'1',
            'num_documento'=>'0002',
            'subNum_documento'=>'VRINV.UPLA-2022',
            'fecha_documento'=>'2022-01-03',
            'considerando_documento'=>'el señor Vicerrector de Investigación mediante Oficio N° 0002-VRINV.UPLA-2022 de fecha 03.01.2022, remite al señor Rector el expediente con opinión favorable para la emisión de la Resoludón correspondiente;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'1',
            'num_documento'=>'005',
            'subNum_documento'=>'2022-APLA',
            'fecha_documento'=>'2022-03-28',
            'considerando_documento'=>'el Oficio N° 005-2022-APLA de fecha 28.03.2022 mediante la cual la Asociación Promotora Los Andes, peticiona al Rector convocar a los Representantes de la APLA ante la Asamblea Universitaria, a fin de participar en las reuniones programadas por la Universidad, en mérito al Artículo 17° del Estatuto de la Universidad Peruana Los Andes;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'2',
            'num_documento'=>'1 y 2',
            'subNum_documento'=>'2022-R-UPLA',
            'fecha_documento'=>'2022-01-03',
            'considerando_documento'=>'el señor Rector toma conocimiento de los expedientes y mediante Proveídos Nros. 1 y 2-2022-R-UPLA de fecha 03.01.2022 respectivamente, lo remite a Secretaria General para ser puesto a consideración del Consejo Universitario;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'2',
            'num_documento'=>'3',
            'subNum_documento'=>'2022-R-UPLA',
            'fecha_documento'=>'2022-01-03',
            'considerando_documento'=>'el señor Rector toma conodmiento del expediente y mediante Proveído N° 3-2022-R-UPLA de fecha 03.01.2022, lo remite a Secretaria General para emisión de la Resolución;',
        ]);

        $documento = Documento::create([
            'id_tipoDocumento'=>'2',
            'num_documento'=>'1939',
            'subNum_documento'=>'2022-R-UPLA',
            'fecha_documento'=>'2022-03-29',
            'considerando_documento'=>'El Proveído N° 1939-2022-R-UPLA de fecha 29.03.2022 mediante la cual el Rector toma conocimiento del documento y lo remite a Secretaria General para ser puesto a consideración de la Asamblea Universitaria;',
        ]);
    }
}
