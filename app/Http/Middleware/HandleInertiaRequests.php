<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

//
use App\Models\Solicitud;
use App\Models\PagosNaAe;
use App\Models\PagosNaFac;
use App\Models\PagosNaOefc;
use App\Models\PagosNaPai;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {
        $cantidad_secretaria = Solicitud::query()
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
        ->count();

        $cantidad_jefatura = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud','4')
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
        ->count();

        $cantidad_AE = PagosNaAe::query()
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
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
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_aes.b_estadoAE',0)

        ->distinct()
        ->count();

        $cantidad_FAC = PagosNaFac::query()
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
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_facs.b_estadoFac',0)

        ->distinct()
        ->count();

        $cantidad_PAI = PagosNaPai::query()
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
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
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_pais.b_estadoPAI',0)

        ->distinct()
        ->count();

        $cantidad_OEFC = PagosNaOefc::query()
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
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_oefcs.b_estadoOEF',0)

        ->distinct()
        ->count();

        $contarEstado1 = Solicitud::query()->where('solicituds.id_estadoSolicitud',1)->count();
        $contarEstado2 = Solicitud::query()->where('solicituds.id_estadoSolicitud',2)->count();
        $contarEstado3 = Solicitud::query()->where('solicituds.id_estadoSolicitud',3)->count();
        $contarEstado4 = Solicitud::query()->where('solicituds.id_estadoSolicitud',4)->count();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'cantidad_secretaria'=> $cantidad_secretaria,
                'cantidad_jefatura'=> $cantidad_jefatura,
                'cantidad_AE' => $cantidad_AE,
                'cantidad_FAC'=> $cantidad_FAC,
                'cantidad_PAI'=> $cantidad_PAI,
                'cantidad_OEFC'=> $cantidad_OEFC,
                'cantidad_estado' => [
                    'cant_1' => $contarEstado1,
                    'cant_2' => $contarEstado2,
                    'cant_3' => $contarEstado3,
                    'cant_4' => $contarEstado4,
                ],
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
