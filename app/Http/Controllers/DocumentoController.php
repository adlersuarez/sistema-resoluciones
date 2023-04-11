<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\TipoDocumento;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentoController extends Controller
{
    public function index()
    {
        $documentos = Documento::query()
        //INER JOINS
        ->join('tipo_documentos','tipo_documentos.id_tipoDocumento','=','documentos.id_tipoDocumento')
        ->get();

        $tipo_documento = TipoDocumento::all();
 
        return Inertia::render('Admin/Documentos/Index',[
            'documentos' => $documentos,
            'tipo_documento' => $tipo_documento,
        ]);
    }
}
