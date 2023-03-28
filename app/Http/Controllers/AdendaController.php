<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdendaController extends Controller
{
    public function index()
    {
        $adendas = "adendas";

        return Inertia::render('Admin/Adendas/Index',[
            'adendas' => $adendas,
        ]);
    }

    public function create() 
    {
        $empresas = "empresas";
        $contratos = "contratos";
        $convenios = "convenios";

        return Inertia::render('Admin/Adendas/Registrar',[
            'empresas' => $empresas,
            'contratos' => $contratos,
            'convenios' => $convenios,
        ]);
    }
}
