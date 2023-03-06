<?php

namespace App\Http\Controllers;

use App\Models\Especificacion_Equipo;
use App\Models\Solicitud;
use App\Models\Tipo_Equipo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller{

    public function index(){
        
        return Inertia::render('User/Index',[
            'solicitudes' => Solicitud::all()
            //->where('id','=','2'),
        ]);
    }

    public function show(){
        return Inertia::render('User/Lista',[]);
    }

}