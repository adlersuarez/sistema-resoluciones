<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ResolucionController extends Controller
{
    public function index()
    {
        $resoluciones = [1,2,3];

        return Inertia::render('Admin/Resoluciones/Index',[
            'resoluciones' => $resoluciones,
        ]);
    }

    public function create() 
    {
        return Inertia::render('Admin/Resoluciones/Registrar');
    }
}
