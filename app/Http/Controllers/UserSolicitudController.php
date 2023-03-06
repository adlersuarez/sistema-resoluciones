<?php

namespace App\Http\Controllers;


use App\Models\Solicitud;
use App\Models\FinalidadSolicitud;
use App\Models\TipoSolicitud;
use App\Models\DetalleSolicitud;
use App\Models\User;
use App\Models\Documento;
use App\Models\DetalleTipoPersona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

//crear pdf
use setasign\Fpdi\Fpdi;

class UserSolicitudController extends Controller
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
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','estudiantes.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('detalle_solicituds','detalle_solicituds.id_solicitud','=','solicituds.id_solicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')

        ->when($search, fn($query) => $query
        ->where('estudiantes.c_codMatricula','LIKE',"%{$search}%")

        ->orWhere('personas.c_nombres', 'LIKE', "%{$search}%")
        ->orWhere('personas.c_apellidoP', 'LIKE', "%{$search}%")
        ->orWhere('personas.c_apellidoM', 'LIKE', "%{$search}%")

        )
        ->orderBy('solicituds.created_at','desc')
        ->paginate(5);


        return Inertia::render('User/Solicitud/Mostrar',[
            'solis' => $solis,
        ]);
    }

    public function show()
    {

        return Inertia::render('User/Solicitud/Create',[

            'finalidad_soli' =>FinalidadSolicitud::all(),
            'tipo_soli' =>TipoSolicitud::all(),
        ]);

    }

    public function create()
    {
        return Inertia::render('User/Solicitud/Create');
    }

    public function store(Request $request)
    {
        $request ->validate([
            'id' => 'required',
            'd_fechaSolicitud' => 'required',
            'id_estadoSolicitud' => 'required',
            'id_tipoSolicitud' => 'required',
            'id_finalidadSolicitud' => 'required',
        ]);

        $soli = $request->all();

        if($imagen = $request->file('c_archivoFut')) {
            $rutaGuardarImg = 'documentos/pagos';
            $imagenProducto = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenProducto);
            $soli['c_archivoFut'] = "$imagenProducto";  
        }

        Solicitud::create($soli);
        return redirect()->route('user');
    }

    public function mostrarSolicitud()
    {
        $solicituds = Solicitud::where('id',auth::user()->id)

        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')
        ->join('finalidad_solicituds','finalidad_solicituds.id_finalidadSolicitud','=','solicituds.id_finalidadSolicitud')
        ->orderBy('solicituds.d_fechaSolicitud','desc')
        ->paginate(8);


        return Inertia::render('User/Solicitud/Mostrar',[
            'solicitudes' => $solicituds,
        ]);
    }

    public function vistaSolicitud($id)
    {
        $solicituds = Solicitud::where('id_solicitud',$id)


        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')

        ->first();

        $noAdeudo = Solicitud::where('id_solicitud',$id)


        ->join('users','users.id','=','solicituds.id')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->join('sedes','sedes.id_sede','=','estudiantes.id_sede')
        ->join('estado_solicituds','estado_solicituds.id_estadoSolicitud','=','solicituds.id_estadoSolicitud')

        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
         //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')

        ->first();

        $documentos = Documento::where('id_estudiante',$solicituds->id_estudiante)->first();

        $detalle_solicitud = DetalleSolicitud::where('id_solicitud',$id)
        #->orderBy('detalle_solicituds.created_at','desc')
        ->first();

        return Inertia::render('User/Solicitud/VistaSolicitud',[
            'solicitudes' => $solicituds,
            'documentos' => $documentos,
            'detalle_solicitud' => $detalle_solicitud,
            'noAdeudo' =>$noAdeudo,
        ]);
    }

    public function generarSolicitudFUT($id)
    {
        $dataFUT = User::where('id',auth::user()->id)

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

        $dataSolicitud = Solicitud::where('id_solicitud',$id)

        ->join('finalidad_solicituds','solicituds.id_finalidadSolicitud','=','finalidad_solicituds.id_finalidadSolicitud')
        ->join('tipo_solicituds','tipo_solicituds.id_tipoSolicitud','=','solicituds.id_tipoSolicitud')
        ->orderBy('solicituds.id_solicitud', 'desc')
        ->first();

        $correo_personal = $dataFUT->c_email;

        $codigo = utf8_decode($dataFUT->c_codMatricula);

        $nombre_completo = utf8_decode($dataFUT->c_nombres." ".$dataFUT->c_apellidoP." ".$dataFUT->c_apellidoM);

        $facultad = utf8_decode($dataFUT->c_nomFacultad);//facultad
        $carrera = utf8_decode($dataFUT->c_nomCarreraProf);//carrera

        $finalidad = utf8_decode($dataSolicitud->c_nomFinalidadSolicitud);//grados - finalidad

        $tramite = utf8_decode($dataSolicitud->c_nomSolicitud);//tipo de solicitud

        $montoFut = utf8_decode("S/.".$dataSolicitud->f_montoPagoTipo);//precio de pago

        $modalidad = utf8_decode($dataFUT->c_nomModalidad);

        $sede = utf8_decode($dataFUT->c_nomSede);

        $celular = utf8_decode($dataFUT->c_numCelular);

        $fechaFUT = utf8_decode($dataSolicitud->d_fechaSolicitud);

        $tipo_solicitud = utf8_decode($dataSolicitud->c_nomSolicitud);

        $tipo_solicitud = strtoupper($tipo_solicitud);

        $finalidad = strtoupper($finalidad);

        $fecha_actual = date("y-m-d H:i:s");

        $day_fecha = date("d",strtotime($fechaFUT));
        $month_numero_fecha = date("m",strtotime($fechaFUT));
        $year_fecha = date("Y",strtotime($fechaFUT));

        $hora_fecha = date("H",strtotime($fechaFUT));
        $minutos_fecha = date("i",strtotime($fechaFUT));
        $segundos_fecha = date("s",strtotime($fechaFUT));

        $fecha_codigo = $year_fecha.$month_numero_fecha.$day_fecha."-".$hora_fecha.$minutos_fecha.$segundos_fecha;

        $codigoFut = $year_fecha.$day_fecha.$hora_fecha.$segundos_fecha."FUT".$codigo;

        //Documento PDF

        $fpdi = new Fpdi();

        $count = $fpdi -> setSourceFile("plantillas/constancias/plantilla-fut.pdf");

        for ($i=1 ; $i<=$count ; $i++) {

            $template = $fpdi -> importPage($i);

            $size = $fpdi -> getTemplateSize($template);

            $fpdi -> AddPage($size['orientation'],array($size['width'],$size['height']));

            $fpdi ->useTemplate($template);

            $fpdi -> SetFont("Times","",14);

            $fpdi -> SetTextColor(0,0,0);

            //$fpdi -> Text(10,10,$fecha_creacion."---d: ".$day_fecha."---m: ".$month_numero_fecha."---y: ".$year_fecha);

            //      Text("Left","Top","texto")

            $fpdi ->Text(48,57,$nombre_completo);

            $fpdi ->Text(188,57,$codigo);

            $fpdi ->Text(48,69,$celular);

            $fpdi ->Text(188,69,$sede);

            $fpdi ->Text(48,81,$facultad);

            $fpdi ->Text(188,81,$modalidad);

            $fpdi ->Text(48,93,$carrera);

            $fpdi ->Text(188,93,$fechaFUT);

            $fpdi ->Text(189,43.5,$codigoFut);

            $fpdi -> SetFont("Times","",14);
            $fpdi ->Text(126,272,$fecha_actual);

            $fpdi -> SetFont("Times","B",18);
            $fpdi -> SetXY(132, 110);
            $fpdi -> Cell(100, 8, $tipo_solicitud, 0, 1, 'L');

            $fpdi -> SetFont("Times","B",18);
            $fpdi -> SetXY(132, 124);
            $fpdi -> Cell(100, 8, $montoFut, 0, 1, 'L');

            $fpdi -> SetFont("Times","B",22);
            $fpdi -> SetXY(80, 136);
            $fpdi -> Cell(100, 9, $finalidad, 0, 1, 'C');

            $fpdi -> SetXY(0, 0);

            //$fpdi -> Image ("images/personal/jefaturaORyM/codigoQR.png",75.5,216);

            //$fpdi -> Image ("images/personal/jefaturaORyM/firma.png",123.5,225.5);

            /*if($constancia->c_codigoBarras != null){
            $fpdi -> Image ($imagen,35,275,40,13);
            }*/
        }

        $fileName = 'FUT-NA-'.$codigo.'-'.$fecha_codigo;
        $nombre_archivo = $fileName.'.pdf';

        $fpdi -> Output('documentos/constancia/fut/'.$nombre_archivo,'F');

        Solicitud::where('id',auth::user()->id)->where('d_fechaSolicitud',$dataSolicitud->d_fechaSolicitud)->update([
            'c_archivoFut' => $nombre_archivo,
            'd_fechaFut' => $fecha_actual,
            'c_codigoFut' => $fileName,
        ]);
        return;
    }

    public function cargarBoucher(Request $request,$id)
    {
        $request ->validate([
            'c_archivoBoucher' => 'required',
            'c_codigoBoucher' => 'required',
        ]);

        $boucher = $request->all();

        if($imagen = $request->file('c_archivoBoucher')) {//c_archivoBoucher
            $rutaGuardarImg = 'documentos/pagos';
            $imagenBoucher = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenBoucher);
            $boucher['c_archivoBoucher'] = "$imagenBoucher";  //c_archivoBoucher
        }

        Solicitud::where('id_solicitud',$id)->update([
            'c_archivoBoucher' => $boucher['c_archivoBoucher'],
            'c_codigoBoucher' => $boucher['c_codigoBoucher'],
        ]);

    }

    public function verDocumentos()
    {
        $estudiante = User::where('id',auth::user()->id)
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->first();

        $detalleTipoPersona = DetalleTipoPersona::where('id_persona',$estudiante->id_estudiante)
        ->join('estudiantes','estudiantes.id_estudiante','=','detalle_tipo_personas.id_estudiante')
        ->join('modalidad_ingresos','modalidad_ingresos.id_modalidadIngreso','=','estudiantes.id_modalidadIngreso')
        
        ->join('pagos_nas','pagos_nas.id_estudiante','=','estudiantes.id_estudiante')
         //pagos
        ->join('pagos_na_aes','pagos_nas.id_pago','=','pagos_na_aes.id_pago')
        ->join('pagos_na_pais','pagos_nas.id_pago','=','pagos_na_pais.id_pago')
        ->join('pagos_na_facs','pagos_nas.id_pago','=','pagos_na_facs.id_pago')
        ->join('pagos_na_oefcs','pagos_nas.id_pago','=','pagos_na_oefcs.id_pago')
        
        ->first();
    
        
        $documentos = Documento::where('id_estudiante',$estudiante->id_estudiante)->first();

        return Inertia::render('User/Solicitud/Documentos',[
            'documentos' => $documentos,
            'detTipPer' => $detalleTipoPersona,
        ]);
    }

    public function subirDocumentos(Request $request,$id_estudiante)
    {


        $request ->validate([

            'c_archivoDoc' => 'required',
            'c_imagenDoc' => 'required',

        ]);

        $imgDoc = $request->all();

        if($imagen = $request->file('c_imagenDoc')) {
            $rutaGuardarImg = 'documentos/estudiante';
            $imagenDoc = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenDoc);
            $imgDoc[$request->c_archivoDoc] = "$imagenDoc";
        }

        Documento::where('id_estudiante',$id_estudiante)->update([
            $request->c_archivoDoc => $imgDoc[$request->c_archivoDoc]
        ]);

    }

    public function downloadFUT($id)
    {
        $pdf = Solicitud::where('id_solicitud',$id)->first();
        $pathToFile = public_path('documentos/constancia/fut/'.$pdf->c_archivoFut);
        $headers = ['Content-Type: application/pdf'];
        $filename = $pdf->c_archivoFut;
        dd($pathToFile);
        dd($filename);
        dd($headers);
        return response()->download($pathToFile,$filename,$headers);
    }


}
