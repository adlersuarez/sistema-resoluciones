<?php

namespace App\Http\Controllers;

use App\Models\Resolucion;
use App\Models\Persona;
use App\Models\TipoResolucion;
use App\Models\TipoSesion;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ResolucionController extends Controller
{
    public function index()
    {
        $resoluciones = Resolucion::query()
        //INER JOINS
        ->join('users','users.id','=','resolucions.id')
        ->join('tipo_sesions','tipo_sesions.id_tipoSesion','=','resolucions.id_tipoSesion')
        ->join('tipo_resolucions','tipo_resolucions.id_tipoResolucion','=','resolucions.id_tipoResolucion')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','resolucions.id_carreraProfesional')
        ->join('sedes','sedes.id_sede','=','resolucions.id_sede')
       
        //->orderBy('solicituds.d_fechaSolicitud','asc')
        ->get();

        return Inertia::render('Admin/Resoluciones/Index',[
            'resoluciones' => $resoluciones,
        ]);
    }

    public function create() 
    {
        $persona = Persona::all();
        $tipo_resolucion= TipoResolucion::all();
        $tipo_sesion= TipoSesion::all();

        return Inertia::render('Admin/Resoluciones/Registrar',[
            'persona' => $persona,
            'tipo_resolucion' => $tipo_resolucion,
            'tipo_sesion' => $tipo_sesion,
        ]);
    }
}
