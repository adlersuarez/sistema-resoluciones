<?php

namespace App\Http\Controllers;

use App\Models\TipoResolucion;
use App\Models\TipoSesion;
use App\Models\TipoPersona;

use Inertia\Inertia;

use Illuminate\Http\Request;

class TipoController extends Controller
{
    //TIPO RESOLUCIONES
    public function indexResolucion()
    {
        $tipoResoluciones = TipoResolucion::all();
        return Inertia::render('Admin/Tipos/Resolucion',[
            'tipoResoluciones' => $tipoResoluciones,
        ]);
    }

    public function updateResolucion(Request $request, $id)
    {
        $request->validate([
            'nombreTipoResolucion' => 'required',
            'acronimoTipoResolucion' => 'required',
            'descripcionTipoResolucion' => 'required',
        ]);

        $resolucion = $request->all();

        TipoResolucion::where('id_tipoResolucion', $id)->update([
            'nombreTipoResolucion' => $resolucion['nombreTipoResolucion'],
            'acronimoTipoResolucion' => $resolucion['acronimoTipoResolucion'],
            'descripcionTipoResolucion' => $resolucion['descripcionTipoResolucion'],
        ]);
        
        return redirect()->route('t.tipoResolucion');
    }

    public function createResolucion(Request $request)
    {
        $request->validate([
            'nombreTipoResolucion' => 'required',
            'acronimoTipoResolucion' => 'required',
            'descripcionTipoResolucion' => 'required',
        ]);

        $resolucion = $request->all();

        TipoResolucion::create([
            'nombreTipoResolucion' => $resolucion['nombreTipoResolucion'],
            'acronimoTipoResolucion' => $resolucion['acronimoTipoResolucion'],
            'descripcionTipoResolucion' => $resolucion['descripcionTipoResolucion'],
        ]);

        return redirect()->route('t.tipoResolucion');
    }

    public function deleteResolucion($id)
    {
        TipoResolucion::where('id_tipoResolucion', $id)->delete();
        return redirect()->route('t.tipoResolucion');
    }

    //TIPO SESIONES
    public function indexSesion()
    {
        $tipoSesiones = TipoSesion::all();
        return Inertia::render('Admin/Tipos/Sesion',[
            'tipoSesiones' => $tipoSesiones,
        ]);
    }

    public function updateSesion(Request $request, $id)
    {
        $request->validate([
            'nombreSesion' => 'required',
            'descripcionSesion' => 'required',
        ]);

        $sesion = $request->all();

        TipoSesion::where('id_tipoSesion', $id)->update([
            'nombreSesion' => $sesion['nombreSesion'],
            'descripcionSesion' => $sesion['descripcionSesion'],
        ]);
        
        return redirect()->route('t.tipoSesion');
    }

    public function createSesion(Request $request)
    {
        $request->validate([
            'nombreSesion' => 'required',
            'descripcionSesion' => 'required',
        ]);

        $sesion = $request->all();

        TipoSesion::create([
            'nombreSesion' => $sesion['nombreSesion'],
            'descripcionSesion' => $sesion['descripcionSesion'],
        ]);

        return redirect()->route('t.tipoSesion');
    }

    public function deleteSesion($id)
    {
        TipoSesion::where('id_tipoSesion', $id)->delete();
        return redirect()->route('t.tipoSesion');
    }

    //TIPO PERSONA
    public function indexPersona()
    {
        $tipoPersonas = TipoPersona::all();
        return Inertia::render('Admin/Tipos/Persona',[
            'tipoPersonas' => $tipoPersonas,
        ]);
    }

    public function updatePersona(Request $request, $id)
    {
        $request->validate([
            'nombreTipoPersona' => 'required',
            'descripcionPersona' => 'required',
        ]);

        $persona = $request->all();

        TipoPersona::where('id_tipoPersona', $id)->update([
            'nombreTipoPersona' => $persona['nombreTipoPersona'],
            'descripcionPersona' => $persona['descripcionPersona'],
        ]);
        
        return redirect()->route('t.tipoPersona');
    }

    public function createPersona(Request $request)
    {
        $request->validate([
            'nombreTipoPersona' => 'required',
            'descripcionPersona' => 'required',
        ]);

        $persona = $request->all();

        TipoPersona::create([
            'nombreTipoPersona' => $persona['nombreTipoPersona'],
            'descripcionPersona' => $persona['descripcionPersona'],
        ]);

        return redirect()->route('t.tipoPersona');
    }

    public function deletePersona($id)
    {
        TipoPersona::where('id_tipoPersona', $id)->delete();
        return redirect()->route('t.tipoPersona');
    }
}
