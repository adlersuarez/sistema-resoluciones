<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratoController extends Controller
{
    public function index()
    {
        $contratos = "contratos";

        return Inertia::render('Admin/Contratos/Index',[
            'contratos' => $contratos,
        ]);
    }

    public function create() 
    {
        $empresas = "empresas";

        return Inertia::render('Admin/Contratos/Registrar',[
            'empresas' => $empresas,
        ]);
    }
}
