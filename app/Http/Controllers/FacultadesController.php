<?php

namespace App\Http\Controllers;

use App\Models\PagosNaFac;

use Illuminate\Http\Request;
use Inertia\Inertia;

//correo
//use App\Mail\EnviarNotificacionDocFaltantesAE;
use Illuminate\Support\Facades\Mail;

class FacultadesController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaFac::query()
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('estudiantes','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('users','users.id_persona','=','personas.id_persona')
        ->join('solicituds','solicituds.id','=','users.id')
        
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        
        //->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_facs.b_estadoFac',0)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/Facultades/Index',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function show($id)
    {  
        $estado_adeudo = PagosNaFac::where('id_pagoFac',$id)
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('estudiantes','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('users','users.id_persona','=','personas.id_persona')
        ->join('solicituds','solicituds.id','=','users.id')
        
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('modalidad_ingresos','modalidad_ingresos.id_modalidadIngreso','=','estudiantes.id_modalidadIngreso')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('modalidads','modalidads.id_modalidad','=','estudiantes.id_modalidad')
        
        ->first();

        return Inertia::render('Admin/Facultades/MostrarAdeudoFac',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function validar_Fac ($id)
    {
        PagosNaFac::where('id_pagoFac',$id)->update([
            'b_estadoFac' => '1',
            'd_fechaValidacionNA_Fac' => date('Y-m-d H:i:s'),
        ]);

        return redirect()->route('d.facultades');
    }

    public function estado_validado(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaFac::query()
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('estudiantes','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('users','users.id_persona','=','personas.id_persona')
        ->join('solicituds','solicituds.id','=','users.id')
        
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        
        ->join('modalidad_ingresos','modalidad_ingresos.id_modalidadIngreso','=','estudiantes.id_modalidadIngreso')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('modalidads','modalidads.id_modalidad','=','estudiantes.id_modalidad')
        
        ->where(function($query) {
            $query->where('solicituds.id_estadoSolicitud',2)
                ->orWhere('solicituds.id_estadoSolicitud',4);
        })

        ->where('pagos_na_facs.b_estadoFac',1)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('pagos_na_facs.d_fechaValidacionNA_Fac','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/Facultades/Validados',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }
}
