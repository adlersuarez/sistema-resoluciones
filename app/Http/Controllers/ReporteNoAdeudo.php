<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReporteNoAdeudo extends Controller
{
    public function index()
    {
        $solicitud = Solicitud::all();

        $contarEstado1 = Solicitud::query('count(*) as filas ')->where('solicituds.id_estadoSolicitud','1')->get();
        $contarEstado2 = Solicitud::query('count(*) as filas ')->where('solicituds.id_estadoSolicitud','2')->get();
        $contarEstado3 = Solicitud::query('count(*) as filas ')->where('solicituds.id_estadoSolicitud','3')->get();
        $contarEstado4 = Solicitud::query('count(*) as filas ')->where('solicituds.id_estadoSolicitud','4')->get();

        return Inertia::render('Admin/Admin',[
            'solicitud' => $solicitud,
            'cantPendiente' => $contarEstado1,
            'cantCompletado' => $contarEstado2,
            'cantRechazado' => $contarEstado3,
            'cantProceso' => $contarEstado4,
        ]);
    }
}
