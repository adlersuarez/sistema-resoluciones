<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConvenioController extends Controller
{
    public function index()
    {
        $convenios = "convenios";

        return Inertia::render('Admin/Convenios/Index',[
            'convenios' => $convenios,
        ]);
    }
}
