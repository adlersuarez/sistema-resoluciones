<?php

namespace App\Http\Controllers;

use App\Models\Oficina;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OficinaController extends Controller
{
    
    public function index(Request $request)
    {
        $search = $request->query('search');
        $ofis = Oficina::query()->when($search, fn($query) => 
        $query->where('c_nomOficina','LIKE',"%{$search}%")->orWhere('id_oficina', 'LIKE', "%{$search}%")
         )->paginate(5);
        return Inertia::render('Admin/Usuarios/Oficina/Index',[
            'ofis' => $ofis
        ]);
    }

    public function create() 
    {
        return Inertia::render('Admin/Usuarios/Oficina/Create');
    }

    public function store(Request $request)
    {
        $request ->validate([
            'c_nomOficina' => 'required'
        ]);

        $ofis = $request->all();

        Oficina::create($ofis);
        return redirect()->route('d.oficinas.index');
    }

    public function edit($id)
    {
        $ofis = Oficina::where('id_oficina',$id)->first();
        return Inertia::render('Admin/Usuarios/Oficina/Edit',[
            'ofis' => $ofis,
        ]);
    }

    public function update(Request $request, $id)
    {
         $request ->validate([
             'c_nomOficina' => 'required'
          ]);
         
        $ofis = $request->all();
        
        Oficina::where('id_oficina',$id)->update([
            'c_nomOficina' => $ofis['c_nomOficina']
        ]);
        return redirect()->route('d.oficinas.index');
    }

    public function destroy($id)
    {
        Oficina::where('id_oficina',$id)->delete();
        return redirect()->route('d.oficinas.index');
    }
}
