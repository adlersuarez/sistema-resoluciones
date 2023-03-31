<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Plantilla;
use App\Models\TipoResolucion;

class PlantillaController extends Controller
{
    public function index()
    {
        $plantillas = Plantilla::query()
        ->join('tipo_resolucions','tipo_resolucions.id_tipoResolucion','=','plantillas.id_tipoResolucion')
        ->get();

        $tipo_resolucion = TipoResolucion::all();
 
        return Inertia::render('Admin/Plantillas/Index',[
            'plantillas' => $plantillas,
            'tipo_resolucion' => $tipo_resolucion,
        ]);
    }

    public function create() 
    {
        $tipo_resolucion = TipoResolucion::all();
        $vistos = "";
        $considerandos = "";

        return Inertia::render('Admin/Plantillas/Registrar',[
            'tipo_resolucion' => $tipo_resolucion,
            'vistos' => $vistos,
            'considerandos' => $considerandos,
        ]);
    }
}
