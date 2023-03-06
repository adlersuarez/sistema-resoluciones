<?php

namespace Database\Seeders;

use App\Models\FinalidadSolicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FinalidadSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Egresado',
            'c_acroFinalSolicitud'=>'EG',
        ]);
        
        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Grado de Bachiller',
            'c_acroFinalSolicitud'=>'GB',
        ]);

        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Título Profesional',
            'c_acroFinalSolicitud'=>'TP',
        ]);

        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Grado de Maestro',
            'c_acroFinalSolicitud'=>'GM',
        ]);

        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Grado de Doctor',
            'c_acroFinalSolicitud'=>'GD',
        ]);

        $finalidad_solicitud = FinalidadSolicitud::create([
            'c_nomFinalidadSolicitud'=>'Segunda Especialidad',
            'c_acroFinalSolicitud'=>'SE',
        ]);
    }
}
