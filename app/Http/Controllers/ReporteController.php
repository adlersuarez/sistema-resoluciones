<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class ReporteController extends Controller
{
    public function index()
    {
        $solicitud = "a";

        return Inertia::render('Admin/Reportes/Fecha',[
            'Resolucion' => $solicitud,
            
        ]);
    }
}
