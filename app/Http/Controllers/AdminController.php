<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//php excel
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use PhpOffice\PhpSpreadsheet\Reader\Xlsx as ReaderXlsx;

use PhpOffice\PhpSpreadsheet\IOFactory;
//use PhpOffice\PhpSpreadsheet\Reader\Xlsx();

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('soloadmin',['only'=> ['index']]);
    }

    public function index()
    {
        $solicitud = Solicitud::all();
        $user = User::where('id_rol',2)->get();

        $contarEstado1 = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',1)
        ->where('solicituds.c_archivoFut', '<>', null)
        ->where('c_archivoBoucher', '<>', null)
        ->count();


        $contarEstado2 = Solicitud::query()->where('solicituds.id_estadoSolicitud',2)->count();
        $contarEstado3 = Solicitud::query()->where('solicituds.id_estadoSolicitud',3)->count();
        $contarEstado4 = Solicitud::query()->where('solicituds.id_estadoSolicitud',4)->count();

        //Fechas
        $fecha_0 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01"),date("Y-m-t")])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();

        //Fechas
        $fecha_1 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01", strtotime('-1 month')),date("Y-m-t", strtotime('-1 month'))])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();

        //Fechas
        $fecha_2 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01", strtotime('-2 month')),date("Y-m-t", strtotime('-2 month'))])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();

        //Fechas
        $fecha_3 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01", strtotime('-3 month')),date("Y-m-t", strtotime('-3 month'))])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();

        //Fechas
        $fecha_4 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01", strtotime('-4 month')),date("Y-m-t", strtotime('-4 month'))])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();

        //Fechas
        $fecha_5 = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        ->whereBetween('detalle_solicituds.d_fechaCreacion',[date("Y-m-01", strtotime('-5 month')),date("Y-m-t", strtotime('-5 month'))])
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->count();


        //FACULTADES
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $cantidad_facultades = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        
        ->pluck('facultads.c_nomFacultad');

        //CARRERAS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $cantidad_carreras = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        
        ->pluck('carrera_profesionals.c_nomCarreraProf');

        //FINALIDADES
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $cantidad_finalidades = Solicitud::query()
        //condicionales
        ->where('solicituds.id_estadoSolicitud',2)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('finalidad_solicituds','solicituds.id_finalidadSolicitud','=','finalidad_solicituds.id_finalidadSolicitud')
        
        ->pluck('finalidad_solicituds.c_nomFinalidadSolicitud');

        //DIFERENCIA DE TIEMPOS Solicitud Completada
        $diferencia_finalizado = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        //INER JOINS
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->pluck('solicituds.d_fechaSolicitud','detalle_solicituds.d_fechaCreacion');

        //DIFERENCIA DE TIEMPOS Solicitud en Proceso
        $diferencia_proceso = Solicitud::query()
        //->where('solicituds.id_estadoSolicitud')
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('solicituds.d_fechaAceptacion','!=', null)
        //INER JOINS
        //->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->pluck('solicituds.d_fechaSolicitud','solicituds.d_fechaAceptacion');

        return Inertia::render('Admin/Admin',[
            'solicitud' => $solicitud,
            'user' => $user,
            //cantidades por estado solicitud
            'estado_solicitudes' => [
                'Pendiente' => $contarEstado1,
                'Completado' => $contarEstado2,
                'Rechazado' => $contarEstado3, 
                'Proceso' => $contarEstado4, 
            ],
            //cantidades por fecha
            'constancias_fecha' => [
                'fecha_5' => $fecha_5,
                'fecha_4' => $fecha_4,
                'fecha_3' => $fecha_3,
                'fecha_2' => $fecha_2,
                'fecha_1' => $fecha_1,
                'fecha_0' => $fecha_0,
            ],
            //cantidades carrera
            'cantidades_carrera'=> $cantidad_carreras,
            'cantidades_finalidad'=> $cantidad_finalidades,
            'cantidades_facultad'=> $cantidad_facultades,
            //diferencia tiempos
            'diferencia_finalizado' => $diferencia_finalizado,
            'diferencia_proceso' => $diferencia_proceso,

        ]);
    }

    public function generarReporte()
    {   
        $soli_pendientes = Solicitud::query()->where('solicituds.id_estadoSolicitud',1)->count();
        $soli_rechazadas = Solicitud::query()->where('solicituds.id_estadoSolicitud',3)->count();
        $soli_proceso = Solicitud::query()->where('solicituds.id_estadoSolicitud',4)->count();
        $soli_finalizado = Solicitud::query()->where('solicituds.id_estadoSolicitud',2)->count();

        $fac_CAC = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('facultads.id_facultad',2)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->count();

        $fac_DCP = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('facultads.id_facultad',3)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->count();

        $fac_I = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('facultads.id_facultad',4)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->count();

        $fac_MH = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('facultads.id_facultad',5)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->count();

        $fac_CS = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('facultads.id_facultad',6)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->count();

        $final_egre = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',1)
        ->count();

        $final_gBach = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',2)
        ->count();

        $final_tProf = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',3)
        ->count();

        $final_gMaes = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',4)
        ->count();

        $final_gDoc = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',5)
        ->count();

        $final_sEsp = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('solicituds.id_finalidadSolicitud',6)
        ->count();

        $carrProf_adminSistm = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',2)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_contFin = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',3)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_derecho = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',4)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_educIni = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',5)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_educPrim = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',6)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();
        
        $carrProf_arqui = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',7)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_ingCiv = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',8)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        
        $carrProf_ingMedDes = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',9)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_ingIndus = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',10)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_ingSistC = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',11)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_medHum = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',12)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_enferm = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',13)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_farmaBio = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',14)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_medVetZoo = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',15)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_nutriHum = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',16)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_obstet = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',17)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_odonto = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',18)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_psico = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',19)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $carrProf_tecMedic = Solicitud::query()
        ->where('solicituds.id_estadoSolicitud',2)
        ->where('carrera_profesionals.id_carreraProfesional',20)
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->count();

        $fecha_reporte = date("d")."/".date("m")."/".date("Y");

        //
        $reader = new ReaderXlsx();
        $spreadsheet = $reader->load('plantillas/reportes/plantilla-reporte-NA.xlsx');
        $sheet = $spreadsheet->getActiveSheet();

        //Fecha
        $sheet->setCellValue('H3',$fecha_reporte);

        //Solicitudes
        $sheet->setCellValue('B6',$soli_pendientes);
        $sheet->setCellValue('D6',$soli_rechazadas);
        $sheet->setCellValue('F6',$soli_proceso);
        $sheet->setCellValue('H6',$soli_finalizado);

        //Facultades
        $sheet->setCellValue('D10',$fac_CAC);
        $sheet->setCellValue('D11',$fac_DCP);
        $sheet->setCellValue('D12',$fac_I);
        $sheet->setCellValue('D13',$fac_MH);
        $sheet->setCellValue('D14',$fac_CS);

        //Finalidades
        $sheet->setCellValue('H10',$final_egre);
        $sheet->setCellValue('H11',$final_gBach);
        $sheet->setCellValue('H12',$final_tProf);
        $sheet->setCellValue('H13',$final_gMaes);
        $sheet->setCellValue('H14',$final_gDoc);
        $sheet->setCellValue('H15',$final_sEsp);

        //Carrera Profesional
        $sheet->setCellValue('H19',$carrProf_adminSistm);
        $sheet->setCellValue('H20',$carrProf_contFin);
        $sheet->setCellValue('H21',$carrProf_derecho);
        $sheet->setCellValue('H22',$carrProf_educIni);
        $sheet->setCellValue('H23',$carrProf_educPrim);
        $sheet->setCellValue('H24',$carrProf_arqui);
        $sheet->setCellValue('H25',$carrProf_ingCiv);
        $sheet->setCellValue('H26',$carrProf_ingMedDes);
        $sheet->setCellValue('H27',$carrProf_ingIndus);
        $sheet->setCellValue('H28',$carrProf_ingSistC);
        $sheet->setCellValue('H29',$carrProf_medHum);
        $sheet->setCellValue('H30',$carrProf_enferm);
        $sheet->setCellValue('H31',$carrProf_farmaBio);
        $sheet->setCellValue('H32',$carrProf_medVetZoo);
        $sheet->setCellValue('H33',$carrProf_nutriHum);
        $sheet->setCellValue('H34',$carrProf_obstet);
        $sheet->setCellValue('H35',$carrProf_odonto);
        $sheet->setCellValue('H36',$carrProf_psico);
        $sheet->setCellValue('H37',$carrProf_tecMedic);

        $writer = IOFactory::createWriter($spreadsheet,'Xlsx');
        
        //fecha
        $day_fecha = date("d"); 
        $month_numero_fecha = date("n");
        $year_fecha = date("Y");

        $month_numero_fecha_codigo = date("m");
        $fecha_codigo = $year_fecha.$month_numero_fecha_codigo.$day_fecha;
        
        //nombre archivo
        $direccion = 'reportes/';
        $fileName = 'ReporteNA-'.$fecha_codigo;

        $writer->save($direccion.$fileName.'.xlsx');

        return response()->download($direccion.$fileName.'.xlsx');
    }
    
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

  
    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

  
    public function destroy($id)
    {
        //
    }
}
