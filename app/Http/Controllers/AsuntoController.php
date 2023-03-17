<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AsuntoController extends Controller
{
    public function index()
    {
        $asuntos = "asuntos";

        return Inertia::render('Admin/Asuntos/Index',[
            'asuntos' => $asuntos,
        ]);
    }
}
