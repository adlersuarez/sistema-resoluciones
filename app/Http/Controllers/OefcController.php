<?php

namespace App\Http\Controllers;

use App\Models\PagosNaOefc;

use Illuminate\Http\Request;
use Inertia\Inertia;

//correo
//use App\Mail\EnviarNotificacionDocFaltantesAE;
use Illuminate\Support\Facades\Mail;

class OefcController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaOefc::query()
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')
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
        ->where('pagos_na_oefcs.b_estadoOEF',0)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/Oefc/Index',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function show($id)
    {  
        $estado_adeudo = PagosNaOefc::where('id_pagoOEF',$id)
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')
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

        return Inertia::render('Admin/Oefc/MostrarAdeudoOefc',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function validar_Oefc ($id)
    {
        PagosNaOefc::where('id_pagoOEF',$id)->update([
            'b_estadoOEF' => '1',
            'd_fechaValidacionNA_Oef' => date('Y-m-d H:i:s'),
        ]);

        return redirect()->route('d.oefc');
    }

    public function estado_validado(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaOefc::query()
        
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')
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

        ->where('pagos_na_oefcs.b_estadoOEF',1)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('pagos_na_oefcs.d_fechaValidacionNA_Oef','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/Oefc/Validados',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }
}
