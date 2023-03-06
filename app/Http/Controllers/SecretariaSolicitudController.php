<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\DetalleSolicitud;
use App\Models\PagosNa;
use App\Models\PagosNaAe;
use App\Models\PagosNaFac;
use App\Models\PagosNaOefc;
use App\Models\PagosNaPai;

use App\Models\CodigoPago;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpWord\TemplateProcessor;

//correo
use App\Mail\EnviarAceptacionSolicitudNA;
use App\Mail\EnviarRechazoSolicitudNA;
use Illuminate\Support\Facades\Mail;

class SecretariaSolicitudController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $solis = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud','1')
        ->where('solicituds.c_archivoFut', '<>', null)
        ->where('c_archivoBoucher', '<>', null)

        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        //->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        
        //->orWhere('personas.c_nombres', 'LIKE', "%{$search}%")
        //->orWhere('personas.c_apellidoP', 'LIKE', "%{$search}%")
        //->orWhere('personas.c_apellidoM', 'LIKE', "%{$search}%")
        )
        
        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->paginate(5);

        // $codigo_rep = CodigoPago::where('c_codigoPago',$id)
        //->count();

        return Inertia::render('Admin/Solicitud/SecretariaMode',[
            'solis' => $solis,
            //'cant_codigo' => $codigo_rep,
        ]);
    }

    public function show($id)
    {  
        $solicituds = Solicitud::where('id_solicitud',$id)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('sedes','estudiantes.id_sede','=','sedes.id_sede')
        ->join('modalidads','estudiantes.id_modalidad','=','modalidads.id_modalidad')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        //pagos

        ->first();

        $codigo_rep = CodigoPago::where('c_codigoPago',$solicituds->c_codigoBoucher)
        ->count();

        return Inertia::render('Admin/Solicitud/Revisar_pago_solicitud',[
            'solicitud' => $solicituds,
            'cantidad_rep' => $codigo_rep,
        ]); 

    }

    public function viewDocument($id)
    {   
        return Inertia::render('Admin/Solicitud/ViewDocument',[
            'solis' =>Solicitud::where('id_solicitud',$id)->get(),
        ]);
    }

    public function aceptar_solicitud(Request $request, $id)
    {   
        $request ->validate([
            'codigo' => 'required'
         ]);
        
        $envio_datos = $request->all();

        Solicitud::where('id_solicitud',$id)->update([
            'c_comentarioSolicitud' => "Validado Correctamente"
        ]);

        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '4',
            'd_fechaAceptacion'=> date('Y-m-d H:i:s'),
        ]);

        DetalleSolicitud::create([
            'id_solicitud'=>$id,
        ]);

        CodigoPago::create([
            'c_codigoPago'=> $envio_datos['codigo'],
            'd_fechaCodigoPago'=> date('Y-m-d H:i:s'),
        ]);

        //busqueda id estudiante
        $estudiante = Solicitud::where('id_solicitud',$id)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->first();

        //Busqueda id pagos NA
        $cant = PagosNa::where('id_estudiante',$estudiante->id_estudiante)
        //INER JOINS
        ->count();

        if($cant == 0){
            PagosNa::create([
                'id_estudiante'=> $estudiante->id_estudiante,
                'd_fechaSolicitudNA' => date('Y-m-d H:i:s'),
            ]);
    
            //Busqueda id pagos NA
            $pagoNA = PagosNa::where('id_estudiante',$estudiante->id_estudiante)
            //INER JOINS
            ->first();
    
            PagosNaAe::create([
                'id_pago'=>$pagoNA->id_pago,
                'd_fechaSolicitudNA_Ae'=> date('Y-m-d H:i:s'),
            ]);
    
            PagosNaFac::create([
                'id_pago'=>$pagoNA->id_pago,
                'd_fechaSolicitudNA_Fac'=> date('Y-m-d H:i:s'),
            ]);
            
            PagosNaOefc::create([
                'id_pago'=>$pagoNA->id_pago,
                'd_fechaSolicitudNA_Oef'=> date('Y-m-d H:i:s'),
            ]);
    
            PagosNaPai::create([
                'id_pago'=>$pagoNA->id_pago,
                'd_fechaSolicitudNA_Pai'=> date('Y-m-d H:i:s'),
            ]);
        }

        //
        $datos_mensaje = Solicitud::where('id_solicitud',$id)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        ->first();

        //Email
        Mail::to($datos_mensaje->c_email)->send(new EnviarAceptacionSolicitudNA($datos_mensaje));

        return redirect()->route('d.solicitud.secretaria');
    }

    public function rechazar_solicitud(Request $request, $id)
    {   
        $request ->validate([
            'comentario' => 'required'
         ]);
        
        $comentario = $request->all();

        Solicitud::where('id_solicitud',$id)->update([
            'c_comentarioSolicitud' => $comentario['comentario']
        ]);

        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '3'
        ]);

        $datos_mensaje = Solicitud::where('id_solicitud',$id)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        ->first();

        //Email
        Mail::to($datos_mensaje->c_email)->send(new EnviarRechazoSolicitudNA($datos_mensaje));

        return redirect()->route('d.solicitud.secretaria');
    }

}
