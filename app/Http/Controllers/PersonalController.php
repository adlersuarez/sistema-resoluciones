<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Persona;
use App\Models\Administrativo;
use App\Models\DetalleTipoPersona;

use App\Models\CarreraProfesional;
use App\Models\Sede;
use App\Models\Seccion;
use App\Models\Nivel;

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
        DetalleTipoPersona::where('id_persona', $id)->delete();
        Persona::where('id_persona', $id)->delete();

        return redirect()->route('p.personalAdministrador');
    }

    //Tipo Docentes
    public function indexDocente()
    {
        $tipoDocente = Persona::query()
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('tipo_personas','tipo_personas.id_tipoPersona','=','detalle_tipo_personas.id_tipoPersona')
        ->where('tipo_personas.id_tipoPersona',2)
        ->get();

        return Inertia::render('Admin/Personal/Docente',[
            'tipoDocente' => $tipoDocente,
        ]);
    }

    public function updateDocente(Request $request, $id)
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
        
        return redirect()->route('p.personalDocente');
    }

    public function createDocente(Request $request)
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
            'id_tipoPersona' => 2,
            'id_persona' => $codigoPersona->id_persona,
            'id_estudiante' => 1,
            'id_administrativo' => $codigoAdmin->id_administrativo,
        ]);

        return redirect()->route('p.personalDocente');
    }

    public function deleteDocente($id)
    {
        DetalleTipoPersona::where('id_persona', $id)->delete();
        Persona::where('id_persona', $id)->delete();

        return redirect()->route('p.personalDocente');
    }

    //Tipo Estudiante
    public function indexEstudiante()
    {
        $tipoEstudiante = Persona::query()
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('tipo_personas','tipo_personas.id_tipoPersona','=','detalle_tipo_personas.id_tipoPersona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('seccions','seccions.id_seccion','=','estudiantes.id_seccion')
        ->join('nivels','nivels.id_nivel','=','estudiantes.id_nivel')

        ->where('tipo_personas.id_tipoPersona',3)
        ->get();

        $carrera = CarreraProfesional::where('id_carreraProfesional','<>',1)->get();
        $sede = Sede::where('id_sede','<>',1)->get();
        $nivel = Nivel::where('id_nivel','<>',1)->get();
        $seccion = Seccion::where('id_seccion','<>',1)->get();

        return Inertia::render('Admin/Personal/Estudiante',[
            'tipoEstudiante' => $tipoEstudiante,
            'carrera' => $carrera,
            'nivel' => $nivel,
            'seccion' => $seccion,
            'sede' => $sede,
        ]);
    }
}
