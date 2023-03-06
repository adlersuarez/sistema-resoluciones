<?php

namespace App\Http\Controllers;

use App\Models\Tipo_Equipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserTipoEquipoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $tipos = Tipo_Equipo::query()->when($search, fn($query) => 
        $query->where('Nombre_Tipo_Equipo','LIKE',"%{$search}%")->orWhere('ID_Tipo_Equipo', 'LIKE', "%{$search}%")
         )->where('Editor_Equipo','=','ADMIN')->paginate(6);
        return Inertia::render('User/Equipo/Index',[
            'tipos' => $tipos
        ]);
    }

    public function create() 
    {
        return Inertia::render('User/Equipo/Create');
    }

    public function store(Request $request)
    {
        $request ->validate([
            'Nombre_Tipo_Equipo' => 'required',
            'Imagen' => 'required|image|mimes:jpeg,png,svg|max:1024',
            'Editor_Equipo' => 'required',
        ]);

        $tipo_equip = $request->all();

        if($imagen = $request->file('Imagen')) {
            $rutaGuardarImg = 'images/equipos';
            $imagenProducto = date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenProducto);
            $tipo_equip['Imagen'] = "$imagenProducto";         
        }
      
        Tipo_Equipo::create($tipo_equip);
        return redirect()->route('d.tipoequipos.index');
    }

    public function edit($id)
    {
        $equipos = Tipo_Equipo::where('ID_Tipo_Equipo',$id)->first();
        return Inertia::render('User/Equipo/Edit',[
            'equipo' => $equipos,
        ]);
    }

    public function update(Request $request, $id)
    {
         $request ->validate([
             'Nombre_Tipo_Equipo' => 'required',
             'Editor_Equipo' => 'required',
          ]);
         
        $tipo_equip = $request->all();
        if($imagen = $request->file('Imagen')){
            
            $rutaGuardarImg = 'images/equipos';
            $imagenProducto = date('YmdHis') . "." . $imagen->getClientOriginalExtension(); 
            $imagen->move($rutaGuardarImg, $imagenProducto);
            $tipo_equip['Imagen'] = "$imagenProducto";
         }
        
        Tipo_Equipo::where('ID_Tipo_Equipo',$id)->update([
            'Nombre_Tipo_Equipo' => $tipo_equip['Nombre_Tipo_Equipo'],
            'Imagen' => $tipo_equip['Imagen']
        ]);
        return redirect()->route('d.tipoequipos.index');
    }

    public function destroy($id)
    {
        Tipo_Equipo::where('ID_Tipo_Equipo',$id)->delete();
        return redirect()->route('d.tipoequipos.index');
    }
}
