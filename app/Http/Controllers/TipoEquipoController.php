<?php

namespace App\Http\Controllers;

use App\Models\Especificacion_Equipo;
use App\Models\Solicitud;
use App\Models\Tipo_Equipo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class TipoEquipoController extends Controller
{
    
    public function index()
    {
        return Inertia::render('User/Index',[
           // 'equipos' => Tipo_Equipo::all()->where('Editor_Equipo','=','ADMIN'),
        ]);
    }
        /*
    
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $request ->validate([
            'Nombre_Tipo_Equipo' => 'required',
            'Documento' => 'required|image|mimes:jpeg,png,svg|max:1024'
        ]);

        $tipo_equip = $request->all();

        if($imagen = $request->file('Documento')) {
            $rutaGuardarImg = 'images/documentos';
            $imagenProducto = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenProducto);
            $tipo_equip['Documento'] = "$imagenProducto";         
        }
      
        Solicitud::create($tipo_equip);
        return redirect()->route('d.solicituds');
    }

    */
    
    public function show($id)
    {
        return Inertia::render('User/Lista',[
          //  'equipos' =>Tipo_Equipo::where('ID_Tipo_Equipo',$id)->first(),
           // 'especificacion' =>Especificacion_Equipo::where('ID_Tipo_Equipo',$id)->get()
        ]);
    }
    

    /*
    public function reportesdos($tipo)
    {
        $user = User::with('Oficina')->where(['id'=>auth()->user()->id])->first();
        $equipos = Tipo_Equipo::where('ID_Tipo_Equipo',$tipo)->first();
        $especificacion = Especificacion_Equipo::where('ID_Tipo_Equipo',$tipo)->get();
        $pdf = Pdf::loadView('pdf',compact(['equipos','especificacion','user']));
        return $pdf->stream('pdf_file.pdf');
    }

    
    public function edit(Tipo_Equipo $tipo_Equipo)
    {
        //
    }

    
    public function update(Request $request, Tipo_Equipo $tipo_Equipo)
    {
        //
    }

    
    public function destroy(Tipo_Equipo $tipo_Equipo)
    {
        //
    }
    
    
    public function viewEspecificacion($tipo,$uso){
        return Inertia::render('User/Especificacion',[
            'equipos' => Tipo_Equipo::where('ID_Tipo_Equipo',$tipo)->first(),
            'especificacion' =>Especificacion_Equipo::where('ID_Tipo_Equipo',$tipo)
                            ->where('ID_Uso_Equipo',$uso)->get(),]);
    } */
}
