<?php

namespace Database\Seeders;

use App\Models\Solicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class SolicitudSeeder extends Seeder
{

    public function run()
    {
        /* $solicitud = Solicitud::create([
            'id'=>'2',
            'd_fechaSolicitud'=>'2023-02-27',
            'c_archivoFut'=>'FUT-NA-2021453255J-20230128.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCD',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'1',
        ]); */

        $solicitud = Solicitud::create([
            'id'=>'3',
            'd_fechaSolicitud'=>'2023-02-26',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCD',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'2',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'4',
            'd_fechaSolicitud'=>'2023-02-27',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCD',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'3',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'5',
            'd_fechaSolicitud'=>'2023-02-26',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDE',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'1',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'6',
            'd_fechaSolicitud'=>'2023-02-27',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDF',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'2',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'7',
            'd_fechaSolicitud'=>'2023-02-27',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDG',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'1',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'8',
            'd_fechaSolicitud'=>'2023-02-26',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDH',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'3',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'9',
            'd_fechaSolicitud'=>'2023-02-26',
            'c_archivoFut'=>'FUT-NA-prueba.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDI',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'1',
        ]);

        /*
        $solicitud = Solicitud::create([
            'id'=>'2',
            'd_fechaSolicitud'=>'2023-02-22',
            'c_archivoFut'=>'FUT-NA-2021453255J-20230128.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDJ',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'1',
        ]);
        
        $solicitud = Solicitud::create([
            'id'=>'3',
            'd_fechaSolicitud'=>'2023-02-22',
            'c_archivoFut'=>'FUT-NA-2021453255J-20230128.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDK',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'2',
        ]);

        $solicitud = Solicitud::create([
            'id'=>'4',
            'd_fechaSolicitud'=>'2023-02-22',
            'c_archivoFut'=>'FUT-NA-2021453255J-20230128.pdf',
            'c_codigoFut'=>'FUT-NA-2021',
            'c_archivoBoucher'=>'pago1.jpg',
            'c_codigoBoucher'=>'ABCDL',
            'c_codSolicitud'=>'SNAEG-20230125',
            'id_tipoSolicitud'=>'1',
            'id_estadoSolicitud'=>'1',
            'id_finalidadSolicitud'=>'2',
        ]); */
    }
}
