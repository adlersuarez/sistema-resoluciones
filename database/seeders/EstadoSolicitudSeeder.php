<?php

namespace Database\Seeders;

use App\Models\EstadoSolicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstadoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $estado_solicitud = EstadoSolicitud::create([
            'c_nomEstadoSol'=>'Pendiente',
        ]);

        $estado_solicitud = EstadoSolicitud::create([
            'c_nomEstadoSol'=>'Completado',
        ]);

        $estado_solicitud = EstadoSolicitud::create([
            'c_nomEstadoSol'=>'Rechazado',
        ]);

        $estado_solicitud = EstadoSolicitud::create([
            'c_nomEstadoSol'=>'Proceso',
        ]);
    }
}
