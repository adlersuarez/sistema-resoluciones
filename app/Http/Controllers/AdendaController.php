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
}
