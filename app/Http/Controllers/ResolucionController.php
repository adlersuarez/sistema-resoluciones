<?php

namespace App\Http\Controllers;

use App\Models\Resolucion;
use App\Models\Persona;

use App\Models\MiembrosResolucion;

use App\Models\TipoResolucion;
use App\Models\TipoSesion;

use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class ResolucionController extends Controller
{
    public function index()
    {
        $resoluciones = Resolucion::query()
        //INER JOINS
        ->join('users','users.id','=','resolucions.id')
        ->join('tipo_sesions','tipo_sesions.id_tipoSesion','=','resolucions.id_tipoSesion')
        ->join('tipo_resolucions','tipo_resolucions.id_tipoResolucion','=','resolucions.id_tipoResolucion')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','resolucions.id_carreraProfesional')
        ->join('sedes','sedes.id_sede','=','resolucions.id_sede')
        ->get();

        $miembros = MiembrosResolucion::query()
        ->join('personas','personas.id_persona','=','miembros_resolucions.id_persona')
        ->get();

        $tipo_sesion = TipoSesion::all();
        $tipo_resolucion = TipoResolucion::all();

        return Inertia::render('Admin/Resoluciones/Index',[
            'resoluciones' => $resoluciones,
            'miembros' => $miembros,
            'tipo_sesion' => $tipo_sesion,
            'tipo_resolucion' => $tipo_resolucion,
        ]);
    }

    public function create() 
    {
        $persona = Persona::all();
        $tipo_resolucion= TipoResolucion::all();
        $tipo_sesion= TipoSesion::all();

        return Inertia::render('Admin/Resoluciones/Registrar',[
            'persona' => $persona,
            'tipo_resolucion' => $tipo_resolucion,
            'tipo_sesion' => $tipo_sesion,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            //'id' => 'required',
            'id_tipoSesion' => 'required',
            'id_tipoResolucion' => 'required',
            //'id_carreraProfesional' => 'required',
            //'id_sede' => 'required',
            'numeroResolucion' => 'required',
            'archivoResolucion' => 'required',
            'asuntoResolucion' => 'required',
            'fechaResolucion' => 'required',
            'miembros' => 'required',
        ]);

        $resolucion = $request->all();
       
        $tipoRes = TipoResolucion::where('id_tipoResolucion',$resolucion['id_tipoResolucion'])
        ->first();

        $year_fecha = date("Y",strtotime($resolucion['fechaResolucion']));

        $numRes = $resolucion['numeroResolucion'];
        $numRes = sprintf("%02d", $numRes);

        $acroTipo = $tipoRes -> acronimoTipoResolucion;

        $nombreRes= $numRes.'-'.$year_fecha.'-'.$acroTipo;

        //archivo
        if($resol = $request->file('archivoResolucion')) {
            $rutaGuardarResolucion = 'documentos/resoluciones';
            $nombreResolucion = $nombreRes.' A-'.date('YmdHis').'.' . $resol->getClientOriginalExtension();
            $resol->move($rutaGuardarResolucion, $nombreResolucion);
            $resolucion['archivoResolucion'] = $nombreResolucion;
            
            Resolucion::create([
                'id' => auth::user()->id,
                'id_tipoSesion' => $resolucion['id_tipoSesion'],
                'id_tipoResolucion' => $resolucion['id_tipoResolucion'],
                'id_carreraProfesional' => 1,
                'id_sede' => 1,
                'nombreResolucion' => $nombreRes,
                'numeroResolucion' => $resolucion['numeroResolucion'],
                'archivoResolucion' => $nombreResolucion,
                'asuntoResolucion' => $resolucion['asuntoResolucion'],
                'fechaResolucion' => $resolucion['fechaResolucion'],
            ]);
        }

        $idResolucion = Resolucion::query()
            ->orderBy('created_at','desc')
            ->first();

        foreach ($resolucion['miembros'] as $codigoPersona) {
            if($codigoPersona != 0){
                MiembrosResolucion::create([
                    'id_resolucion' => $idResolucion->id_resolucion,
                    'id_persona' => $codigoPersona,
                    'descripcionMiembro' => 'Participante',
                ]);
            }
        }
        
        return redirect()->route('r.resoluciones');
    }

    public function descargarResolucion($id)
    {
        $pdf = Resolucion::where('id_resolucion',$id)->first();

        $filename = $pdf->archivoResolucion;
        $pathToFile = public_path('documentos/resoluciones/'.$filename);
        $headers = ['Content-Type: application/pdf'];
        
        return response()->download($pathToFile,$filename,$headers);
    }
}
