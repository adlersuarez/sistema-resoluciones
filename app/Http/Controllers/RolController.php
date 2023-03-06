<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolController extends Controller
{
    
    public function index(Request $request)
    {
        $search = $request->query('search');
        $roles = Rol::query()->when($search, fn($query) => 
        $query->where('Nombre_Rol','LIKE',"%{$search}%")->orWhere('id_rol', 'LIKE', "%{$search}%")
         )->paginate(5);
        return Inertia::render('Admin/Usuarios/Rol/Index',[
            'roles' => $roles
        ]);
    }

    public function create() 
    {
        return Inertia::render('Admin/Usuarios/Rol/Create');
    }

    public function store(Request $request)
    {
        $request ->validate([
            'c_nomRol' => 'required'
        ]);

        $roles = $request->all();

        Rol::create($roles);
        return redirect()->route('d.roles.index');
    }

    public function edit($id)
    {
        $roles = Rol::where('id_rol',$id)->first();
        return Inertia::render('Admin/Usuarios/Rol/Edit',[
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, $id)
    {
         $request ->validate([
             'c_nomRol' => 'required'
          ]);
         
        $roles = $request->all();
        
        Rol::where('id_rol',$id)->update([
            'c_nomRol' => $roles['c_nomRol']
        ]);
        return redirect()->route('d.roles.index');
    }

    public function destroy($id)
    {
        Rol::where('id_rol',$id)->delete();
        return redirect()->route('d.roles.index');
    }
}
