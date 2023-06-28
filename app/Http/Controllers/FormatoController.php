<?php

namespace App\Http\Controllers;

use App\Models\Formato;
use App\Models\Facultad;
use App\Models\Resolucion;
use App\Models\DetalleResolucionVisto;
use App\Models\DetalleResolucionConsiderando;
use App\Models\DetalleResolucionAsunto;
use App\Models\ModalidadIngreso;
use App\Models\Persona;

use Illuminate\Http\Request;

use Inertia\Inertia;

use PhpOffice\PhpWord\TemplateProcessor;

//codigo barras
use Picqer;

//codigo QR
use SimpleSoftwareIO\QrCode\Facades\QrCode;

use Illuminate\Support\Facades\Auth;

class FormatoController extends Controller
{
    public function index()
    {
        $formatos = Formato::all();

        return Inertia::render('Admin/Formatos/Index',[
            'formatos' => $formatos,
        ]);
    }

    //Formato Auspicio Academico
    public function createAuspicioAcademico() 
    {
        $facultades = Facultad::query()
        ->where('id_facultad','<>','1')
        ->get();

        return Inertia::render('Admin/Formatos/Tipos/AuspicioAcademico',[
            'facultades' => $facultades,
        ]);
    }

    public function storeAuspicioAcademico(Request $request)
    {
        $request->validate([
            'visto_resolucion' => 'required',
            'numeroResolucion' => 'required',
            'fechaResolucion' => 'required',

            'asuntos' => 'required',
            'considerando' => 'required',
            'imagenQR64' => 'required',
        ]);

        //dd($request);

        $resolucion = $request->all();

        $year_fecha = date("Y",strtotime($resolucion['fechaResolucion']));

        $numRes = $resolucion['numeroResolucion'];
        $numRes = sprintf("%03d", $numRes);

        $acroTipo = 'CU-UPLA';

        $nombreRes= $numRes.'-'.$year_fecha.'-'.$acroTipo;

        //Crear resolucion
        Resolucion::create([
            'id' => auth::user()->id,
            'id_tipoSesion' => 1,
            'id_tipoResolucion' => 3,
            'id_carreraProfesional' => 1,
            'id_sede' => 1,
            'nombreResolucion' => $nombreRes,
            'numeroResolucion' => $resolucion['numeroResolucion'],
            'archivoResolucion' => $nombreRes.".docx",
            'descripcion_vistoResolucion' => $resolucion['visto_resolucion'],
            'fechaResolucion' => $resolucion['fechaResolucion'],
        ]);

        //ID resolucion
        $idResolucion = Resolucion::query()
        ->orderBy('created_at','desc')
        ->first();

        // Visto
        DetalleResolucionVisto::create([
            'id_resolucion' => $idResolucion->id_resolucion,
            'descripcion_vistoResolucion' => $resolucion['visto_resolucion'],
        ]);
    
        // Considerando
        foreach ($resolucion['considerando'] as $considerando) {
            //
            DetalleResolucionConsiderando::create([
                'id_resolucion' => $idResolucion->id_resolucion,
                'descripcion_considerandoResolucion' => $considerando['descripcion'],
            ]);
        }

        $count = 0;
        // Lista Asuntos
        foreach ($resolucion['asuntos'] as $asunto){
            //dd($asunto);
            DetalleResolucionAsunto::create([
                'id_resolucion' => $idResolucion->id_resolucion,
                'id_tipoAsunto' => $asunto['id'],
                'descripcion_asuntoResolucion' => $asunto['descripcion'],
                'imagen_asuntoResolucion' => '',
            ]);
        }


        //fecha con puntos
        $day_fecha = substr($resolucion['fechaResolucion'], 8, 2);
        $mes_fecha = substr($resolucion['fechaResolucion'], 5, 2);
        $year_fecha = substr($resolucion['fechaResolucion'], 0, 4);

        $fecha_puntos = $day_fecha.".".$mes_fecha.".".$year_fecha;
        //guardar img64 a png
        $data64 = $resolucion['imagenQR64'];
        list($type, $data64) = explode(';', $data64);
        list(, $data64)      = explode(',', $data64);
        $data64 = base64_decode($data64);
        file_put_contents('documentos/resoluciones/codigoQr/'.$nombreRes.'_'.$fecha_puntos.'.png', $data64);

        Resolucion::where('id_resolucion', $idResolucion->id_resolucion)
        ->update([
            'c_codigoQr' => $nombreRes.'_'.$fecha_puntos.'.png'
        ]);

        //CREAR DOCUMENTO
        $funciones = New ResolucionController();
        $funciones->generarBarcode($idResolucion->id_resolucion,$nombreRes);

        $formatos_funciones = New FormatoController();
        $formatos_funciones->generarAuspicioAcademicoWord($resolucion,$nombreRes,$idResolucion->id_resolucion);

        return redirect()->route('r.resoluciones');
    }

    public function generarAuspicioAcademicoWord($resolucion,$nombre,$id)
    {
        $resuelves = $resolucion['asuntos'];
        $nombre_resolucion = $nombre;
        $day_fecha = substr($resolucion['fechaResolucion'], 8, 2);
        $mes_fecha = substr($resolucion['fechaResolucion'], 5, 2);
        $year_fecha = substr($resolucion['fechaResolucion'], 0, 4);

        $numero_resolucion = sprintf("%04d", $resolucion['numeroResolucion']);
        
        $fecha_puntos = $day_fecha.".".$mes_fecha.".".$year_fecha;

        $templateProcessor = new TemplateProcessor('plantillas/formatos/formato-auspicio-academico.docx');
        //

        $templateProcessor->setValue('numero_resolucion', strtoupper($numero_resolucion));

        $templateProcessor->setValue('fecha', $fecha_puntos);
        $templateProcessor->setValue('visto_resolucion', $resolucion['visto_resolucion']);
       
        $templateProcessor->setImageValue('codigo_barras', array('path' => 'documentos/resoluciones/codigoBarras/'.$nombre_resolucion.'.png', 'width' => '3cm', 'height' => '1cm', 'ratio' => false));

        $templateProcessor->setImageValue('codigo_qr', array('path' => 'documentos/resoluciones/codigoQr/'.$nombre_resolucion.'_'.$fecha_puntos.'.png', 'width' => '3cm', 'height' => '3cm', 'ratio' => true));

        $considerandos = DetalleResolucionConsiderando::where('id_resolucion',$id)
        ->get();

        //$templateProcessor->cloneBlock('block_name', count($resuelves), true, true );
        $templateProcessor->cloneBlock('block_considerando', count($considerandos), true, true );
        
        foreach ($considerandos as $key => $value) {
            //dd($value->imagen_asuntoResolucion);
            $templateProcessor->setValue('descripcion_considerando#'.($key+1), $value->descripcion_considerandoResolucion);
        }

        $asuntos = DetalleResolucionAsunto::where('id_resolucion',$id)
        ->join('tipo_asuntos','tipo_asuntos.id_tipoAsunto','=','detalle_resolucion_asuntos.id_tipoAsunto')
        ->get();

        //$templateProcessor->cloneBlock('block_name', count($resuelves), true, true );
        $templateProcessor->cloneBlock('block_asunto', count($asuntos), true, true );
        
        foreach ($asuntos as $key => $value) {
            //dd($value->imagen_asuntoResolucion);
            $templateProcessor->setValue('asunto#'.($key+1), strtoupper($value->c_nombreTipoAsunto));
            $templateProcessor->setValue('descripcion_asunto#'.($key+1), $value->descripcion_asuntoResolucion);
        }
        

        $direccion = 'documentos/resoluciones/';
        $fileName = $nombre;
        //$fileName = $nombre." A-".date('YmdHis');

        $templateProcessor->saveAs($direccion.$fileName . '.docx');
        
        return response()->download($direccion.$fileName . '.docx');
        //return response()->download($fileName . '.docx');
    }

    //Formato Cambio de modalidad de ingreso
    public function createCambioModalidadIngreso() 
    {
        $estudiantes = Persona::where('estudiantes.id_estudiante','<>',1)
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->join('tipo_estudiantes','tipo_estudiantes.id_tipoEstudiante','=','estudiantes.id_tipoEstudiante')
        ->get();

        $modalidades = ModalidadIngreso ::all();

        return Inertia::render('Admin/Formatos/Tipos/CambioModalidadIngreso',[
            'estudiantes' => $estudiantes,
            'modalidades' => $modalidades
        ]);
    }

    public function storeCambioModalidadIngreso(Request $request)
    {
        $request->validate([
            'visto_resolucion' => 'required',
            'numeroResolucion' => 'required',
            'fechaResolucion' => 'required',
            'modalidad_pre' => 'required',
            'modalidad_pos' => 'required',

            'asuntos' => 'required',
            'considerando' => 'required',
            'imagenQR64' => 'required',
        ]);

        //dd($request);

        $resolucion = $request->all();

        $year_fecha = date("Y",strtotime($resolucion['fechaResolucion']));

        $numRes = $resolucion['numeroResolucion'];
        $numRes = sprintf("%03d", $numRes);

        $acroTipo = 'CU-UPLA';

        $nombreRes= $numRes.'-'.$year_fecha.'-'.$acroTipo;

        //Crear resolucion
        Resolucion::create([
            'id' => auth::user()->id,
            'id_tipoSesion' => 1,
            'id_tipoResolucion' => 3,
            'id_carreraProfesional' => 1,
            'id_sede' => 1,
            'nombreResolucion' => $nombreRes,
            'numeroResolucion' => $resolucion['numeroResolucion'],
            'archivoResolucion' => $nombreRes.".docx",
            'descripcion_vistoResolucion' => $resolucion['visto_resolucion'],
            'fechaResolucion' => $resolucion['fechaResolucion'],
        ]);

        //ID resolucion
        $idResolucion = Resolucion::query()
        ->orderBy('created_at','desc')
        ->first();

        // Visto
        DetalleResolucionVisto::create([
            'id_resolucion' => $idResolucion->id_resolucion,
            'descripcion_vistoResolucion' => $resolucion['visto_resolucion'],
        ]);
    
        // Considerando
        foreach ($resolucion['considerando'] as $considerando) {
            //
            DetalleResolucionConsiderando::create([
                'id_resolucion' => $idResolucion->id_resolucion,
                'descripcion_considerandoResolucion' => $considerando['descripcion'],
            ]);
        }

        $count = 0;
        // Lista Asuntos
        foreach ($resolucion['asuntos'] as $asunto){
            //dd($asunto);
            DetalleResolucionAsunto::create([
                'id_resolucion' => $idResolucion->id_resolucion,
                'id_tipoAsunto' => $asunto['id'],
                'descripcion_asuntoResolucion' => $asunto['descripcion'],
                'imagen_asuntoResolucion' => '',
            ]);
        }


        //fecha con puntos
        $day_fecha = substr($resolucion['fechaResolucion'], 8, 2);
        $mes_fecha = substr($resolucion['fechaResolucion'], 5, 2);
        $year_fecha = substr($resolucion['fechaResolucion'], 0, 4);

        $fecha_puntos = $day_fecha.".".$mes_fecha.".".$year_fecha;
        //guardar img64 a png
        $data64 = $resolucion['imagenQR64'];
        list($type, $data64) = explode(';', $data64);
        list(, $data64)      = explode(',', $data64);
        $data64 = base64_decode($data64);
        file_put_contents('documentos/resoluciones/codigoQr/'.$nombreRes.'_'.$fecha_puntos.'.png', $data64);

        Resolucion::where('id_resolucion', $idResolucion->id_resolucion)
        ->update([
            'c_codigoQr' => $nombreRes.'_'.$fecha_puntos.'.png'
        ]);

        //CREAR DOCUMENTO
        $funciones = New ResolucionController();
        $funciones->generarBarcode($idResolucion->id_resolucion,$nombreRes);

        $formatos_funciones = New FormatoController();
        $formatos_funciones->generarAuspicioAcademicoWord($resolucion,$nombreRes,$idResolucion->id_resolucion);

        return redirect()->route('r.resoluciones');
    }


    //Formato PIA - Presupuesto Institucional
    public function createPia() 
    {
        return Inertia::render('Admin/Formatos/Tipos/Pia',[
        ]);
    }

    //Formato PIA (modificado)
    public function createPiaModificado() 
    {
        return Inertia::render('Admin/Formatos/Tipos/PiaModificado',[
        ]);
    }

    //Formato Por navidad
    public function createPorNavidad() 
    {
        return Inertia::render('Admin/Formatos/Tipos/PorNavidad',[
        ]);
    }

    //Formato Por uniforme
    public function createPorUniforme() 
    {
        return Inertia::render('Admin/Formatos/Tipos/PorUniforme',[
        ]);
    }

    //Formato Propuesta Jefe Of.
    public function createPropuestaJefe() 
    {
        return Inertia::render('Admin/Formatos/Tipos/PropuestaJefe',[
        ]);
    }

    //Formato Calendario académico a nivel general
    public function createCalendarioAcademicoGeneral() 
    {
        return Inertia::render('Admin/Formatos/Tipos/CalendarioAcademicoGeneral',[
        ]);
    }

    //Formato Calendario académico específico internado médico
    public function createCalendarioAcademicoInternadoMedico() 
    {
        return Inertia::render('Admin/Formatos/Tipos/CalendarioAcademicoInternadoMedico',[
        ]);
    }

    //Formato Cronograma de pagos
    public function createCronogramaPagos() 
    {
        return Inertia::render('Admin/Formatos/Tipos/CronogramaPagos',[
        ]);
    }

    //Formato Presupuesto Admisión
    public function createPresupuestoAdmision() 
    {
        return Inertia::render('Admin/Formatos/Tipos/PresupuestoAdmision',[
        ]);
    }

    //Formato Aprobación de Directiva
    public function createAprobacionDirectiva() 
    {
        return Inertia::render('Admin/Formatos/Tipos/AprobacionDirectiva',[
        ]);
    }

    //Formato Aprobación de Expediente Técnico
    public function createAprobacionExpedienteTecnico() 
    {
        return Inertia::render('Admin/Formatos/Tipos/AprobacionExpedienteTecnico',[
        ]);
    }

    //Formato Aprobación de Bases
    public function createAprobacionBases() 
    {
        return Inertia::render('Admin/Formatos/Tipos/AprobacionBases',[
        ]);
    }

    //Formato Otorgación de buena pro
    public function createOtorgacionBuenaPro() 
    {
        return Inertia::render('Admin/Formatos/Tipos/OtorgacionBuenaPro',[
        ]);
    }

}
