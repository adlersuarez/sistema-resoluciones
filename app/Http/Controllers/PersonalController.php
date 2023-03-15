<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Persona;
use App\Models\Administrativo;
use App\Models\DetalleTipoPersona;

use Illuminate\Http\Request;

use Inertia\Inertia;

class PersonalController extends Controller
{
    //Tipo Administradores
    public function indexAdministrador()
    {
        $tipoAdmin = Persona::query()
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('tipo_personas','tipo_personas.id_tipoPersona','=','detalle_tipo_personas.id_tipoPersona')
        ->where('tipo_personas.id_tipoPersona',1)
        ->get();

        return Inertia::render('Admin/Personal/Administrador',[
            'tipoAdmin' => $tipoAdmin,
        ]);
    }

    public function updateAdministrador(Request $request, $id)
    {
        $request->validate([
            'c_dni' => 'required',
            'c_apellidoP' => 'required',
            'c_apellidoM' => 'required',
            'c_nombres' => 'required',
            'c_numTelefono' => 'required',
            'c_email' => 'required',
        ]);

        $administrador = $request->all();

        Persona::where('id_persona', $id)->update([
            'c_dni' => $administrador['c_dni'],
            'c_apellidoP' => $administrador['c_apellidoP'],
            'c_apellidoM' => $administrador['c_apellidoM'],
            'c_nombres' => $administrador['c_nombres'],
            'c_numTelefono' => $administrador['c_numTelefono'],
            'c_email' => $administrador['c_email'],
        ]);
        
        return redirect()->route('p.personalAdministrador');
    }

    public function createAdministrador(Request $request)
    {
        $request->validate([
            'c_dni' => 'required',
            'c_apellidoP' => 'required',
            'c_apellidoM' => 'required',
            'c_nombres' => 'required',
            'c_numTelefono' => 'required',
            'c_email' => 'required',
        ]);

        $administrador = $request->all();

        Persona::create([
            'c_dni' => $administrador['c_dni'],
            'c_apellidoP' => $administrador['c_apellidoP'],
            'c_apellidoM' => $administrador['c_apellidoM'],
            'c_nombres' => $administrador['c_nombres'],
            'c_numTelefono' => $administrador['c_numTelefono'],
            'c_email' => $administrador['c_email'],
        ]);

        Administrativo::create([
            'id_oficina' => 1,
            'c_cargo' => "",
        ]);

        $codigoPersona = Persona::where('c_dni',$administrador['c_dni'])
            ->where('c_email',$administrador['c_email'])
            ->first();
        
        $codigoAdmin = Administrativo::query()
            ->orderBy('created_at','desc')
            ->first();

        DetalleTipoPersona::create([
            'id_tipoPersona' => 1,
            'id_persona' => $codigoPersona->id_persona,
            'id_estudiante' => 1,
            'id_administrativo' => $codigoAdmin->id_administrativo,
        ]);

        return redirect()->route('p.personalAdministrador');
    }

    public function deleteAdministrador($id)
    {
        Persona::where('id_persona', $id)->delete();
        DetalleTipoPersona::where('id_persona', $id)->delete();

        return redirect()->route('p.personalAdministrador');
    }
}
