<?php

namespace App\Http\Controllers;

use App\Models\Resolucion;
use App\Models\Persona;

use App\Models\MiembrosResolucion;

use App\Models\TipoResolucion;
use App\Models\TipoSesion;
use App\Models\DetalleResolucionAsunto;

use App\Models\TipoAsunto;
use App\Models\Autoridad;

use Inertia\Inertia;
use PhpOffice\PhpWord\TemplateProcessor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

use Illuminate\Support\Facades\Auth;

class ResolucionController extends Controller
{
    public function index()
    {
        $resoluciones = Resolucion::query()
        //INER JOINS
        ->join('users','users.id','=','resolucions.id')
        ->join('tipo_sesions','tipo_sesions.id_tipoSesion','=','resolucions.id_tipoSesion')
        ->join('tipo_resolucions','tipo_resolucions.id_tipoResolucion','=','resolucions.id_tipoResolucion')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','resolucions.id_carreraProfesional')
        ->join('sedes','sedes.id_sede','=','resolucions.id_sede')
        ->get();

        $miembros = MiembrosResolucion::query()
        ->join('personas','personas.id_persona','=','miembros_resolucions.id_persona')
        ->get();

        $tipo_sesion = TipoSesion::all();
        $tipo_resolucion = TipoResolucion::all();
 
        return Inertia::render('Admin/Resoluciones/Index',[
            'resoluciones' => $resoluciones,
            'miembros' => $miembros,
            'tipo_sesion' => $tipo_sesion,
            'tipo_resolucion' => $tipo_resolucion,
        ]);
    }

    public function create() 
    {
        $persona = Persona::where('detalle_tipo_personas.id_estudiante','<>',1)
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('estudiantes','detalle_tipo_personas.id_estudiante','=','estudiantes.id_estudiante')
        ->join('especialidads','especialidads.id_especialidad','=','estudiantes.id_especialidad')
        ->join('carrera_profesionals','carrera_profesionals.id_carreraProfesional','=','especialidads.id_carreraProfesional')
        ->join('facultads','carrera_profesionals.id_facultad','=','facultads.id_facultad')
        ->get();

        $tipo_resolucion= TipoResolucion::all();
        $tipo_sesion= TipoSesion::all();

        $tipo_asunto = TipoAsunto::where('id_tipoAsunto','<>',3)->get();
        $autoridad = Autoridad::all();

        return Inertia::render('Admin/Resoluciones/Registrar',[
            'persona' => $persona,
            'tipo_resolucion' => $tipo_resolucion,
            'tipo_sesion' => $tipo_sesion,
            'tipo_asunto' => $tipo_asunto,
            'autoridad' => $autoridad,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            //'id' => 'required',
            'id_tipoSesion' => 'required',
            'id_tipoResolucion' => 'required',
            //'id_carreraProfesional' => 'required',
            //'id_sede' => 'required',
            'numeroResolucion' => 'required',
            'fechaResolucion' => 'required',
            'miembros' => 'required',
            'asuntos' => 'required',
        ]);

        $resolucion = $request->all();
       
        $tipoRes = TipoResolucion::where('id_tipoResolucion',$resolucion['id_tipoResolucion'])
        ->first();

        $year_fecha = date("Y",strtotime($resolucion['fechaResolucion']));

        $numRes = $resolucion['numeroResolucion'];
        $numRes = sprintf("%03d", $numRes);

        $acroTipo = $tipoRes -> acronimoTipoResolucion;

        $nombreRes= $numRes.'-'.$year_fecha.'-'.$acroTipo;

        //Crear resolucion
        Resolucion::create([
            'id' => auth::user()->id,
            'id_tipoSesion' => $resolucion['id_tipoSesion'],
            'id_tipoResolucion' => $resolucion['id_tipoResolucion'],
            'id_carreraProfesional' => 1,
            'id_sede' => 1,
            'nombreResolucion' => $nombreRes,
            'numeroResolucion' => $resolucion['numeroResolucion'],
            'archivoResolucion' => $nombreRes.".docx",
            'fechaResolucion' => $resolucion['fechaResolucion'],
        ]);

        //ID resolucion
        $idResolucion = Resolucion::query()
        ->orderBy('created_at','desc')
        ->first();

        $count = 0;
        // Lista Asuntos
        foreach ($resolucion['asuntos'] as $asunto){
            //dd($asunto);
            $count++;
            $imagenProducto = '';
            if($imagen = $asunto['imagen']) {
                $rutaGuardarImg = 'documentos/resoluciones/imagenes';
                $imagenProducto = date('YmdHis')."-".$count. "." . $imagen->getClientOriginalExtension();
                $imagen->move($rutaGuardarImg, $imagenProducto);
                //$soli['imagen'] = $imagenProducto;  
            }

            DetalleResolucionAsunto::create([
                'id_resolucion' => $idResolucion->id_resolucion,
                'id_tipoAsunto' => $asunto['id'],
                'descripcion_asuntoResolucion' => $asunto['descripcion'],
                'imagen_asuntoResolucion' => $imagenProducto,
            ]);
        }

        //Miembros de Resolución
        foreach ($resolucion['miembros'] as $codigoPersona) {
            if($codigoPersona != 0){
                MiembrosResolucion::create([
                    'id_resolucion' => $idResolucion->id_resolucion,
                    'id_persona' => $codigoPersona,
                    'descripcionMiembro' => 'Participante',
                ]);
            }
        }

        //CREAR DOCUMENTO
        $funciones = New ResolucionController();
        $funciones->generarResoluciónWord($resolucion,$nombreRes,$idResolucion->id_resolucion);

        return redirect()->route('r.resoluciones');
    }

    public function descargarResolucion($id)
    {
        $pdf = Resolucion::where('id_resolucion',$id)->first();

        $filename = $pdf->archivoResolucion;
        $pathToFile = public_path('documentos/resoluciones/'.$filename);
        
        return response()->download($pathToFile,$filename);
    }

    public function generarResoluciónWord($resolucion,$nombre,$id)
    {
        $resuelves = $resolucion['asuntos'];

        $tipoResolucion = TipoResolucion::select('nombreTipoResolucion')
        ->where('id_tipoResolucion',$resolucion['id_tipoResolucion'])
        ->first();

        $tipoSesion = TipoSesion::select('nombreSesion')
        ->where('id_tipoSesion',$resolucion['id_tipoSesion'])
        ->first();

        $tipo_resolucion = $tipoResolucion->nombreTipoResolucion;
        $nombre_resolucion = $nombre;
        $tipo_resolucion_sesion = "Sesión ".$tipoSesion->nombreSesion." de ".$tipoResolucion->nombreTipoResolucion;

        $day_fecha = substr($resolucion['fechaResolucion'], 8, 2);
        $mes_fecha = substr($resolucion['fechaResolucion'], 5, 2);
        $year_fecha = substr($resolucion['fechaResolucion'], 0, 4);
        
        $fecha_puntos = $day_fecha.".".$mes_fecha.".".$year_fecha;

        $templateProcessor = new TemplateProcessor('plantillas/resoluciones/plantilla-resolucion.docx');
        //
        
        $templateProcessor->setValue('tipo_resolucion', strtoupper($tipo_resolucion));
        $templateProcessor->setValue('nombre_resolucion', strtoupper($nombre_resolucion));
        $templateProcessor->setValue('fecha', $fecha_puntos);
        $templateProcessor->setValue('tipo_resolucion_sesion', $tipo_resolucion_sesion);

        $asuntos = DetalleResolucionAsunto::where('id_resolucion',$id)
        ->join('tipo_asuntos','tipo_asuntos.id_tipoAsunto','=','detalle_resolucion_asuntos.id_tipoAsunto')
        ->get();

        //$templateProcessor->cloneBlock('block_name', count($resuelves), true, true );
        $templateProcessor->cloneBlock('block_name', count($asuntos), true, true );
        
        foreach ($asuntos as $key => $value) {
            //dd($value->imagen_asuntoResolucion);
            $templateProcessor->setValue('asunto#'.($key+1), strtoupper($value->c_nombreTipoAsunto));
            $templateProcessor->setValue('descripcion_asunto#'.($key+1), $value->descripcion_asuntoResolucion);
            if($value->imagen_asuntoResolucion!=""){
                $templateProcessor->setImageValue('imagen-asunto#'.($key+1), array('path' => 'documentos/resoluciones/imagenes/'.$value->imagen_asuntoResolucion, 'width' => '14cm', 'height' => '60px', 'ratio' => true));
            }else{
                $templateProcessor->setValue('imagen-asunto#'.($key+1),"");
            }
        }

        
        //
        //$templateProcessor->setImageValue('codigoQR', array('path' => 'images/personal/jefaturaORyM/codigoQR.png', 'width' => 165, 'height' => 165, 'ratio' => true));
        //$templateProcessor->setImageValue('firma', array('path' => 'images/personal/jefaturaORyM/firma.png', 'width' => 100, 'height' => 100, 'ratio' => true));
        //

        $direccion = 'documentos/resoluciones/';
        $fileName = $nombre;
        //$fileName = $nombre." A-".date('YmdHis');

        $templateProcessor->saveAs($direccion.$fileName . '.docx');
        
        return response()->download($direccion.$fileName . '.docx');
        //return response()->download($fileName . '.docx');
    }

    public function verDocumento($id)
    {
        $resolucion = Resolucion::where('id_resolucion',$id)->first();

        return Inertia::render('Admin/Resoluciones/VerDocumento',[
            'resolucion' => $resolucion,
        ]);
    }

}
