<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use App\Models\DetalleSolicitud;
use App\Models\PagosNa;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpWord\TemplateProcessor;

//codigo barras
use Picqer;

//crear pdf
use setasign\Fpdi\Fpdi;

//correo
use App\Mail\EnvioConstanciaNA;
use Illuminate\Support\Facades\Mail;

class JefaturaSolicitudController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $solis = Solicitud::query()

        ->where(function($query) {
            $query->where('solicituds.id_estadoSolicitud','4')
                ->orWhere('solicituds.id_estadoSolicitud','2');
        })

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
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')

        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')
        

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        
        //->orWhere('personas.c_nombres', 'LIKE', "%{$search}%")
        //->orWhere('personas.c_apellidoP', 'LIKE', "%{$search}%")
        //->orWhere('personas.c_apellidoM', 'LIKE', "%{$search}%")
        )
        
        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->paginate(5);

        return Inertia::render('Admin/Solicitud/JefaturaMode',[
            'solis' => $solis,
        ]);
    }

    public function viewDocument($id)
    {   
        return Inertia::render('Admin/Solicitud/ViewDocument',[
            'solis' =>Solicitud::where('id_solicitud',$id)->get(),
        ]);
    }


    //Constancia
    public function validar_constancia($id)
    {   
        DetalleSolicitud::where('id_solicitud', $id)
        ->update([
            'b_estadoDetalleNA' => '1',
            //'id_estadoSolicitud' => '2'
            'd_fechaCreacion' => date("Y-m-d H:i:s"),
        ]);

        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '2'
        ]);

        $codigo_soliNA = Solicitud::where('id_solicitud',$id)
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
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();


        PagosNa::where('id_pago',$codigo_soliNA->id_pago)->update([
            'b_estadoPagos' => '1'
        ]);        

        return redirect()->route('d.solicitud.jefatura');
    }

    public function rechazar_constancia($id)
    {   
        DetalleSolicitud::where('id_solicitud', $id)
        ->update([
            'b_estadoDetalleNA' => '0'
        ]);

        return redirect()->route('d.solicitud.jefatura');
    }

    //public function wordExport($id,$codigo,$nombre,$programa,$especialidad,$tramite,$lugar,$fecha,$fecha_valida,$nombre_archivo)
    public function wordExport($id)
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

        ->first();

        $codigo_alumno = $solicituds->c_codMatricula;
        $apellidos_nombres = $solicituds->c_apellidoP." ".$solicituds->c_apellidoM." ".$solicituds->c_nombres;

        $tipo=$solicituds->c_nomSolicitud;
        $facultad=$solicituds->c_nomFacultad;

        $tipo_y_facultad = $tipo." en ".$facultad;
        $carrera_profesional = $solicituds->c_nomCarreraProf;
        $tipo_tramite = $solicituds->c_nomSolicitud;
        $lugar = "Huancayo";
        
        $day_fecha = date("d"); 
        $month_numero_fecha = date("n");
        $year_fecha = date("Y");

        $month_numero_fecha_codigo = date("m");
        $fecha_codigo = $year_fecha.$month_numero_fecha_codigo.$day_fecha;
        
        $meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
                  "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        
        $fecha_nombre = $day_fecha." de ".$meses[$month_numero_fecha-1]." de ".$year_fecha;

        if($month_numero_fecha>=7) {
            $year_fecha=$year_fecha+1;
        }
                
        $fecha_nombre_valida = $day_fecha." de ".$meses[$month_numero_fecha+5]." de ".$year_fecha;

        $templateProcessor = new TemplateProcessor('plantillas/constancias/plantilla-constancia-noadeudo.docx');
        //
        $templateProcessor->setValue('codigo_alumno', strtoupper($codigo_alumno));
        $templateProcessor->setValue('apellidos_nombres', strtoupper($apellidos_nombres));
        $templateProcessor->setValue('tipo_y_facultad', strtoupper($tipo_y_facultad));
        $templateProcessor->setValue('carrera_profesional', strtoupper($carrera_profesional));
        $templateProcessor->setValue('tipo_tramite', strtoupper($tipo_tramite));
        $templateProcessor->setValue('lugar', $lugar);
        $templateProcessor->setValue('fecha', $fecha_nombre);
        $templateProcessor->setValue('fecha_valida', $fecha_nombre_valida);

        $direccion = 'documentos/constancia/no-adeudo/';
        $fileName = 'C-NA-'.$codigo_alumno.'-'.$fecha_codigo;

        $templateProcessor->saveAs($direccion.$fileName . '.docx');
        
        return response()->download($direccion.$fileName . '.docx');
        //return response()->download($fileName . '.docx');
    }

    public function viewRequisitoAE($id)
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
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();

        return Inertia::render('Admin/Solicitud/Requisitos/ViewRequisitoAE',[
            'solis' => $solicituds,
        ]);
    }

    public function viewRequisitoFac($id)
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
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();

        return Inertia::render('Admin/Solicitud/Requisitos/ViewRequisitoFac',[
            'solis' => $solicituds,
        ]);
    }

    public function viewRequisitoOEF($id)
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
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();

        return Inertia::render('Admin/Solicitud/Requisitos/ViewRequisitoOEF',[
            'solis' => $solicituds,
        ]);
    }

    public function viewRequisitoPAI($id)
    {   
        $solicituds = Solicitud::where('id_solicitud',$id)
        //INER JOINS
        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','estudiantes.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();

        return Inertia::render('Admin/Solicitud/Requisitos/ViewRequisitoPAI',[
            'solis' => $solicituds,
        ]);
    }

    public function generarBarcode($id)
    {
        $barcode = DetalleSolicitud::where('id_detalleSolicitudNA',$id)
        //INER JOINS
        ->join('solicituds','solicituds.id_solicitud','=','detalle_solicituds.id_solicitud')
        ->join('finalidad_solicituds','solicituds.id_finalidadSolicitud','=','finalidad_solicituds.id_finalidadSolicitud')

        ->join('users','users.id','=','solicituds.id')
        ->join('personas','personas.id_persona','=','users.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('modalidads','modalidads.id_modalidad','=','estudiantes.id_modalidad')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')

        ->first();

        $fecha_creacion = $barcode->d_fechaCreacion;

        $acro_facultad = $barcode->c_acroFacultad;
        $acro_tramite = $barcode->c_acroFinalSolicitud;
        $codigo_estudiante = $barcode->c_codMatricula;

        //trabajo de fechas
        $day_fecha = date("d",strtotime($fecha_creacion)); 
        $month_numero_fecha = date("m",strtotime($fecha_creacion));
        $year_fecha = date("y",strtotime($fecha_creacion));


        $barcode_generator = new Picqer\Barcode\BarcodeGeneratorPNG();

        // modificar el codigo a uno de datos
        $codigo = $day_fecha.$month_numero_fecha.$year_fecha."-".$acro_facultad."-".$acro_tramite."-".$codigo_estudiante;
        $directorio = "documentos/constancia/code-barras/";

        file_put_contents($directorio.$codigo.".png", $barcode_generator->getBarcode($codigo,$barcode_generator::TYPE_CODE_93));

        DetalleSolicitud::where('id_detalleSolicitudNA', $id)
        ->update([
            'c_codigoBarras' => $codigo.".png"
        ]);

        return redirect()->route('d.solicitud.jefatura');
    }

    public function generarConstanciaPDF($id)
    {
        $constancia = DetalleSolicitud::where('id_detalleSolicitudNA',$id)
        //INER JOINS
        ->join('solicituds','solicituds.id_solicitud','=','detalle_solicituds.id_solicitud')
        ->join('finalidad_solicituds','solicituds.id_finalidadSolicitud','=','finalidad_solicituds.id_finalidadSolicitud')

        ->join('users','users.id','=','solicituds.id')
        ->join('personas','personas.id_persona','=','users.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('modalidads','modalidads.id_modalidad','=','estudiantes.id_modalidad')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')

        ->first();

        $correo_personal = $constancia->c_email;

        $codigo = utf8_decode($constancia->c_codMatricula);
        $nombre_completo = utf8_decode($constancia->c_apellidoP." ".$constancia->c_apellidoM." ".$constancia->c_nombres);

        $programa = utf8_decode($constancia->c_nomFacultad);
        $especialidad = utf8_decode($constancia->c_nomCarreraProf);

        $finalidad = utf8_decode($constancia->c_nomFinalidadSolicitud);

        $fecha_creacion = utf8_decode($constancia->d_fechaCreacion);

        //trabajo de fechas
        $day_fecha = date("d",strtotime($fecha_creacion)); 
        $month_numero_fecha = date("n",strtotime($fecha_creacion));
        $year_fecha = date("Y",strtotime($fecha_creacion));

        $month_numero_fecha_codigo = date("m",(int)$fecha_creacion);
        
        $fecha_codigo = $year_fecha.$month_numero_fecha_codigo.$day_fecha;
        
        $meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
                  "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        $fecha_expedito = utf8_decode("Huancayo, ".$day_fecha." de ".$meses[$month_numero_fecha-1]." de ".$year_fecha.".");

        if($month_numero_fecha>=7) {
            $year_fecha=$year_fecha+1;
        }

        $fecha_validez = utf8_decode("La presente constancia es válida solo hasta el ".$day_fecha." de ".$meses[$month_numero_fecha+5]." de ".$year_fecha.".");

        $imagen = "documentos/constancia/code-barras/".$constancia->c_codigoBarras;
        //Documento PDF

        $fpdi = new Fpdi();

        $count = $fpdi -> setSourceFile("plantillas/constancias/plantilla-constancia-noadeudo.pdf");
        
        for ($i=1 ; $i<=$count ; $i++) { 

            $template = $fpdi -> importPage($i);

            $size = $fpdi -> getTemplateSize($template);

            $fpdi -> AddPage($size['orientation'],array($size['width'],$size['height']));

            $fpdi ->useTemplate($template);

            $fpdi -> SetFont("Times","",12);

            $fpdi -> SetTextColor(0,0,0);
           
            //$fpdi -> Text(10,10,$fecha_creacion."---d: ".$day_fecha."---m: ".$month_numero_fecha."---y: ".$year_fecha);
            
            //      Text("Left","Top","texto") 
            $fpdi ->Text(72,97.5,$codigo);

            $fpdi ->Text(72,108,$nombre_completo);

            $fpdi ->Text(72,118.5,$programa);

            $fpdi ->Text(72,129.5,$especialidad);

            $fpdi -> SetFont("Times","B",14);
            $fpdi -> SetXY(64.5, 182.5);
            $fpdi -> Cell(81, 8, $finalidad, 0, 1, 'C');

            $fpdi -> SetFont("Times","",10);
            $fpdi -> SetXY(105, 195);
            $fpdi -> Cell(81, 8, $fecha_expedito, 0, 1, 'R');

            $fpdi -> SetFont("Times","B",10);
            $fpdi -> SetXY(26, 205);
            $fpdi -> Cell(81, 8, $fecha_validez, 0, 1, '');

            $fpdi -> SetXY(0, 0);
            
            $fpdi -> Image ("images/personal/jefaturaORyM/codigoQR.png",75.5,216);

            $fpdi -> Image ("images/personal/jefaturaORyM/firma.png",123.5,225.5);

            if($constancia->c_codigoBarras != null){
            $fpdi -> Image ($imagen,35,275,40,13);
            }
        }

        $fileName = 'C-NA-'.$codigo.'-'.$fecha_codigo;
        $nombre_archivo = $fileName.'.pdf';

        $fpdi -> Output('documentos/constancia/no-adeudo/'.$nombre_archivo,'F');

        DetalleSolicitud::where('id_detalleSolicitudNA',$id)->update([
            'c_constanciaNA' => $nombre_archivo,
        ]);

        $archivo= DetalleSolicitud::where('id_detalleSolicitudNA',$id)
        //INER JOINS
        ->join('solicituds','solicituds.id_solicitud','=','detalle_solicituds.id_solicitud')
        ->join('finalidad_solicituds','solicituds.id_finalidadSolicitud','=','finalidad_solicituds.id_finalidadSolicitud')

        ->join('users','users.id','=','solicituds.id')
        ->join('personas','personas.id_persona','=','users.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('modalidads','modalidads.id_modalidad','=','estudiantes.id_modalidad')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')

        ->first();

        $datos_mensaje = $archivo;
        //Email
        Mail::to($correo_personal)->send(new EnvioConstanciaNA($datos_mensaje));


        return redirect()->route('d.solicitud.jefatura');
    }

}
