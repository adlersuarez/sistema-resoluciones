<?php

namespace App\Http\Controllers;

//use App\Models\Solicitud;
use App\Models\PagosNaAe;
use App\Models\Documento;

use Illuminate\Http\Request;
use Inertia\Inertia;

//correo
use App\Mail\EnviarNotificacionDocFaltantesAE;
use Illuminate\Support\Facades\Mail;

class ArchivoEstudiantilController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaAe::query()
        
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
        
        //->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        
        ->where('solicituds.id_estadoSolicitud',4)
        ->where('pagos_na_aes.b_estadoAE',0)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/ArchivoEstudiantil/Index',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function estado_validado(Request $request)
    {
        $search = $request->query('search');
        $estado_adeudo = PagosNaAe::query()
        
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
        
        ->where(function($query) {
            $query->where('solicituds.id_estadoSolicitud',2)
                ->orWhere('solicituds.id_estadoSolicitud',4);
        })

        ->where('pagos_na_aes.b_estadoAE',1)

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('pagos_na_aes.d_fechaSolicitudNA_Ae','asc')
        ->distinct()
        ->paginate(10);

        return Inertia::render('Admin/ArchivoEstudiantil/Validados',[
            'estado_adeudo' => $estado_adeudo,
        ]);
    }

    public function show($id)
    {  
        $estado_adeudo = PagosNaAe::where('id_pagoAE',$id)
        
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
        
        ->first();

        $id_estudiante = $estado_adeudo->id_estudiante;

        $documentos = Documento::where('id_estudiante',$id_estudiante)
        ->first();

        return Inertia::render('Admin/ArchivoEstudiantil/MostrarDocContenido',[
            'estado_adeudo' => $estado_adeudo,
            'documentos' => $documentos,
        ]);
    }

    /* public function mostrar_documento(Request $request){
        $documento = $request->query('etiqueta');
        $estado_adeudo = Documento::where('id_estudiante',$id)
        ->first();

        return Inertia::render('../Components/ArchivoEstudiantil/List_Documentos',[
            'archivo' => $archivo,
        ]);
    } */

    public function validar_ArchivoEstudiantil ($id)
    {
        PagosNaAe::where('id_pagoAE',$id)->update([
            'b_estadoAE' => '1',
            'd_fechaValidacionNA_Ae' => date('Y-m-d H:i:s'),
        ]);

        return redirect()->route('d.archivoEstudiantil');
    }

    public function notificar_estudianteAE ($id)
    {
        $datos_mensaje = PagosNaAe::where('id_pagoAE',$id)
        //INER JOINS
        ->join('pagos_nas','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('estudiantes','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('users','users.id_persona','=','personas.id_persona')
        ->join('solicituds','solicituds.id','=','users.id')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('modalidad_ingresos','modalidad_ingresos.id_modalidadIngreso','=','estudiantes.id_modalidadIngreso')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        ->join('documentos','documentos.id_estudiante','=','estudiantes.id_estudiante')
        ->first();

        $mod_ingreso = $datos_mensaje -> id_modalidadIngreso;

        //$doc_1 = $datos_mensaje -> a_partidaNacimiento;
        
        $lista_documentos_estudiante = [
            '0' =>  [
                'doc'=>'a_partidaNacimiento',
                'descripcion'=>'Partida o acta de nacimiento en original'
                ],

            '1' =>  [
                'doc'=>'a_copiaDNI',
                'descripcion'=>'Copia del DNI'
                ],

            '2' =>  [
                'doc'=>'a_certificadoEstudioSecReg',
                'descripcion'=>'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular'
                ],
            
            '3' =>  [
                'doc'=>'a_certificadoEstudioSecRegAlt',
                'descripcion'=>'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular o del 1ro al 4to año para educación básica alternativa'
                ],

            '4' =>  [
                'doc'=>'a_certificadoEstudioUni',
                'descripcion'=>'Certificado de estudios universitarios original'
                ],
            
            '5' =>  [
                'doc'=>'a_copiaLegalTituloBach',
                'descripcion'=>'Copia legalizada de titulo o grado académico de Bachiller'
                ],
            
            '6' =>  [
                'doc'=>'a_certificadoEstudioExterno',
                'descripcion'=>'Certificado de estudios superiores originales de la universidad, que acredite haber aprobado 4 periodos lectivos semestrales, 2 anuales o 72 créditos'
                ],
            
            '7' =>  [
                'doc'=>'a_constanciaConductaExterno',
                'descripcion'=>'Constancia de conducta que acredite no haber sido separado por medidas disciplinarias de la universidad de procedencia'
                ],

            '8' =>  [
                'doc'=>'a_certificadoEstudioInterno',
                'descripcion'=>'Certificado de Estudios originales'
                ],
            
            '9' =>  [
                'doc'=>'a_constanciaConductaInterno',
                'descripcion'=>'Constancia de conducta'
                ],

            '10' =>  [
                'doc'=>'a_constanciaPrimerosPuestos',
                'descripcion'=>'Constancia de haber obtenido uno de los 5 primeros puestos en educación secundaria refrendada por el director departamental de educación'
                ],
            
            '11' =>  [
                'doc'=>'a_curriculoDeportivo',
                'descripcion'=>'Currículo Deportivo documentado y legalizado'
                ],

            '12' =>  [
                'doc'=>'a_constanciaDeportistaDestacado',
                'descripcion'=>'Constancia original que lo acredite como deportista destacado expedida por el IPD con antigüedad no mayor de 2 años'
                ],

            '13' =>  [
                'doc'=>'a_informeOriginalFPD',
                'descripcion'=>'Informe original de FPD, del deporte que representa'
                ],
            
            '14' =>  [
                'doc'=>'a_carnetRegistroCONADIS',
                'descripcion'=>'Carnet de registro del Consejo Nacionalde Integración de la persona con discapacidad (CONADIS)'
                ],

            '15' =>  [
                'doc'=>'a_certificadoEstudioInst',
                'descripcion'=>'Certificado de estudios originales de su Instituto Pedagógico o Tecnológico'
                ],
            
            '16' =>  [
                'doc'=>'a_copiaLegalTituloEgreInst',
                'descripcion'=>'Copia legalizada del título o constancia original de egresado emitida por la Dirección del Instituto Superior de Procedencia'
                ],

            '17' =>  [
                'doc'=>'a_curriculoVitaeDescriptivo',
                'descripcion'=>'Currículo Vitae descriptivo'
                ],
            
            '18' =>  [
                'doc'=>'a_certificadoEstudioEscuelaOficiales',
                'descripcion'=>'Certificado de Estudios superiores de las escuelas de oficiales de las FF.AA. o FF.PP.'
                ],

            '19' =>  [
                'doc'=>'a_certificadoAcreditacionGradoOficial',
                'descripcion'=>'Certificado original de la Comandancia General que acredite el Grado de oficial  y de pertenecer a las FF.AA. o FF.PP.'
                ],
            
            '20' =>  [
                'doc'=>'a_certificadoEstudioEscuelaSuboficiales',
                'descripcion'=>'Certificado de Estudios superiores emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.'
                ],

            '21' =>  [
                'doc'=>'a_constanciaLegalizadaTituloEgreEscSub',
                'descripcion'=>'Constancia legalizada del titulo o constancia original de egresado emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.'
                ],
        ];

        $documentos = [];

        switch ($mod_ingreso) {
            case '1':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[3];            
                break;
            
            case '2':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[4];
                    $documentos[] = $lista_documentos_estudiante[5];            
                break;
            
            case '3':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[6];
                    $documentos[] = $lista_documentos_estudiante[7];             
                break;
            
            case '4':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[8];
                    $documentos[] = $lista_documentos_estudiante[9];            
                break;
            
            case '5':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[2];
                    $documentos[] = $lista_documentos_estudiante[10];            
                break;
            
            case '6':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[3];
                    $documentos[] = $lista_documentos_estudiante[11];
                    $documentos[] = $lista_documentos_estudiante[12]; 
                    $documentos[] = $lista_documentos_estudiante[13];
                break;
            
            case '7':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[3];
                    $documentos[] = $lista_documentos_estudiante[14];            
                break;
            
            case '8':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[15];
                    $documentos[] = $lista_documentos_estudiante[16];             
                break;
            
            case '9':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[3];
                    $documentos[] = $lista_documentos_estudiante[17];            
                break;
            
            case '10':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[3];         
                break;

            case '11':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[18];
                    $documentos[] = $lista_documentos_estudiante[19];            
                break;
            
            case '12':
                    $documentos[] = $lista_documentos_estudiante[0];
                    $documentos[] = $lista_documentos_estudiante[1]; 
                    $documentos[] = $lista_documentos_estudiante[20];
                    $documentos[] = $lista_documentos_estudiante[21];            
                break;
            
            default:
                break;
        }
        
        $lista = [];

        $id_estudiante = $datos_mensaje -> id_modalidadIngreso;

        for ($i=0; $i < count($documentos) ; $i++) {
            $rspta = Documento::where('id_estudiante',$id_estudiante)
            ->where($documentos[$i]['doc'],null)
            ->count();
            if($rspta==1){
                $lista[]=$documentos[$i]['descripcion'];
            }
        }
        
        //Email
        Mail::to($datos_mensaje->c_email)->send(new EnviarNotificacionDocFaltantesAE($datos_mensaje,$lista));
        
        PagosNaAe::where('id_pagoAE',$id)->update([
            'b_estadoNotificacionNA_Ae' => '1',
        ]);

        return redirect()->route('d.archivoEstudiantil');
    }

}
