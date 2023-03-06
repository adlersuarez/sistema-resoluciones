<?php

namespace App\Http\Controllers;

//use App\Models\Especificacion_Equipo;
use App\Models\Solicitud;
use App\Models\DetalleSolicitud;
//use App\Models\Tipo_Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpWord\TemplateProcessor;
//use PhpOffice\PhpWord\IOFactory;
//crear pdf
use setasign\Fpdi\Fpdi;

class AdminSolicitudController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $solis = Solicitud::query()
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
        
        ->orWhere('personas.c_nombres', 'LIKE', "%{$search}%")
        ->orWhere('personas.c_apellidoP', 'LIKE', "%{$search}%")
        ->orWhere('personas.c_apellidoM', 'LIKE', "%{$search}%")
        
        )
        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->paginate(5);

        return Inertia::render('Admin/Solicitud/Index',[
            'solis' => $solis,
        ]);
    }

    public function mostrarEstado(Request $request,$id)
    {
        $search = $request->query('search');
        $num=0;

        $nombres = ['','pendientes','finalizadas','rechazadas','en proceso'];
        $path = ['','pendiente','finalizado','rechazado','proceso'];

        switch($id){
            case 'pendiente':
                $num = 1;
                break;
            case 'finalizado':
                $num = 2;
                break;
            case 'rechazado':
                $num = 3;
                break;
            case 'proceso':
                $num = 4;
                break;
        }

        $solis = Solicitud::query()
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
        
        ->where('solicituds.id_estadoSolicitud',$num)
        
        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->paginate(5);

        return Inertia::render('Admin/Solicitud/EstadoSolicitud',[
            'solis' => $solis,
            'nombres' => $nombres,
            'num' => $num,
            'path' => $path,
        ]);
    }

    public function mostrarEstadoPendRech(Request $request,$id)
    {
        $search = $request->query('search');
        $num=0;

        $nombres = ['','pendientes','finalizadas','rechazadas','en proceso'];
        $path = ['','pendiente','finalizado','rechazado','proceso'];

        switch($id){
            case 'pendiente':
                $num = 1;
                break;
            case 'finalizado':
                $num = 2;
                break;
            case 'rechazado':
                $num = 3;
                break;
            case 'proceso':
                $num = 4;
                break;
        }

        $solis = Solicitud::query()
        //INER JOINS
        ->where('solicituds.c_archivoFut', '<>', null)
        ->where('c_archivoBoucher', '<>', null)
        
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
        
        ->where('solicituds.id_estadoSolicitud',$num)
        
        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")
        )

        ->orderBy('solicituds.d_fechaSolicitud','asc')
        ->paginate(5);

        return Inertia::render('Admin/Solicitud/EstadoSolicitud',[
            'solis' => $solis,
            'nombres' => $nombres,
            'num' => $num,
            'path' => $path,
        ]);
    }

    public function store(Request $request)
    {
        $request ->validate([
            'id' => 'required',
            'd_fechaSolicitud' => 'required',
            'id_tipoSolicitud' => 'required',
            'id_estadoSolicitud' => 'required',
            'c_archivoFut' => 'required|image|mimes:pdf|max:1024'
        ]);

        //$tipo_equip = $request->all();

        if($imagen = $request->file('c_archivoFut')) {
            $rutaGuardarImg = 'images/documentos';
            $imagenProducto = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenProducto);
            //$tipo_equip['c_archivoFut'] = "$imagenProducto";         
        }
      
        //Tipo_Equipo::create($tipo_equip);
        return redirect()->route('d.solicituds');
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
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
        //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();
        return Inertia::render('Admin/Solicitud/Mostrar_Deudas',[
            'solicitud' => $solicituds,
        ]); 

    }
    

    public function viewDocument($id)
    {   
        return Inertia::render('Admin/Solicitud/ViewDocument',[
            'solis' =>Solicitud::where('id_solicitud',$id)->get(),
        ]);
    }

    

    //Solicitud
    public function aceptar_solicitud($id)
    {   
        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '4'
        ]);
        return redirect()->route('d.solicituds');
    }

    

    public function rechazar_solicitud($id)
    {   
        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '3'
        ]);
        return redirect()->route('d.solicituds');
    }

    //Constancia
    public function validar_constancia($id)
    {   
        DetalleSolicitud::where('id_solicitud', $id)
        ->update([
            'b_estadoDetalleNA' => '1',
            //'id_estadoSolicitud' => '2'
            'd_fechaCreacion' => date('Y-m-d H:i:s'),
        ]);

        Solicitud::where('id_solicitud',$id)->update([
            'id_estadoSolicitud' => '2'
        ]);

        return redirect()->route('d.solicituds');
    }

    public function rechazar_constancia($id)
    {   
        DetalleSolicitud::where('id_solicitud', $id)
        ->update([
            'b_estadoDetalleNA' => '0'
        ]);

        return redirect()->route('d.solicituds');
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
        //$templateProcessor = new TemplateProcessor('plantillas/constancias/plantilla-constancia-noadeudo-prueba.docx');
        //
        $templateProcessor->setValue('codigo_alumno', strtoupper($codigo_alumno));
        $templateProcessor->setValue('apellidos_nombres', strtoupper($apellidos_nombres));
        $templateProcessor->setValue('tipo_y_facultad', strtoupper($tipo_y_facultad));
        $templateProcessor->setValue('carrera_profesional', strtoupper($carrera_profesional));
        $templateProcessor->setValue('tipo_tramite', strtoupper($tipo_tramite));
        $templateProcessor->setValue('lugar', $lugar);
        $templateProcessor->setValue('fecha', $fecha_nombre);
        $templateProcessor->setValue('fecha_valida', $fecha_nombre_valida);
        //
        //$templateProcessor->setImageValue('codigoQR', array('path' => 'images/personal/jefaturaORyM/codigoQR.png', 'width' => 165, 'height' => 165, 'ratio' => true));
        //$templateProcessor->setImageValue('firma', array('path' => 'images/personal/jefaturaORyM/firma.png', 'width' => 100, 'height' => 100, 'ratio' => true));
        //

        $direccion = 'documentos/constancia/no-adeudo/';
        $fileName = 'C-NA-'.$codigo_alumno.'-'.$fecha_codigo;

        $templateProcessor->saveAs($direccion.$fileName . '.docx');
        
        return response()->download($direccion.$fileName . '.docx');
        //return response()->download($fileName . '.docx');
    }


    //generar pdf
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

        return redirect()->route('d.solicituds');
    }

    //Para eliminar tildes
    function eliminar_tildes($cadena){

        //Codificamos la cadena en formato utf8 en caso de que nos de errores
        $cadena = utf8_encode($cadena);
    
        //Ahora reemplazamos las letras
        $cadena = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $cadena
        );
    
        $cadena = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $cadena );
    
        $cadena = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $cadena );
    
        $cadena = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $cadena );
    
        $cadena = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $cadena );
    
        $cadena = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C'),
            $cadena
        );
    
        return $cadena;
    }

}
