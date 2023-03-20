<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Rol;
use App\Models\Persona;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CuentaUsuarioController extends Controller
{
    //Usuarios
    public function indexUser()
    {
        $usuarios = User::query()
        ->join('rols','rols.id_rol','=','users.id_rol')
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('tipo_personas','tipo_personas.id_tipoPersona','=','detalle_tipo_personas.id_tipoPersona')
        ->get();

        $roles = Rol::all();

        $userAcount = User::query()
        ->join('personas','users.id_persona','=','personas.id_persona')
        ->get();
        foreach ($userAcount as $user) {
                    $data[] = $user->id_persona;
                }

        $persona = Persona::whereNotIn('personas.id_persona', $data)
        ->join('detalle_tipo_personas','detalle_tipo_personas.id_persona','=','personas.id_persona')
        ->join('tipo_personas','tipo_personas.id_tipoPersona','=','detalle_tipo_personas.id_tipoPersona')
        ->get();
        //$persona = Persona::all();

        return Inertia::render('Admin/Personal/Usuario',[
            'usuarios' => $usuarios,
            'roles' => $roles,
            'persona' => $persona,
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'id_rol' => 'required',
            'username' => 'required',
            'email' => 'required',
        ]);

        $usuario = $request->all();

        User::where('id', $id)->update([
            'id_rol' => $usuario['id_rol'],
            'username' => $usuario['username'],
            'email' => $usuario['email'],
        ]);
        
        return redirect()->route('u.usuarioCuenta');
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'id_persona' => 'required',
            'id_rol' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $usuario = $request->all();

        User::create([
            'id_persona' => $usuario['id_persona'],
            'id_rol' => $usuario['id_rol'],
            'username' => $usuario['username'],
            'email' => $usuario['email'],
            'password' => Hash::make($usuario['password']),
        ]);

        return redirect()->route('u.usuarioCuenta');
    }

    public function deleteUser($id)
    {
        User::where('id', $id)->delete();

        return redirect()->route('u.usuarioCuenta');
    }

    //User personal
    public function indexUserPersonal()
    {
        $usuario = User::where('users.id', auth::user()->id)
        ->join('personas','personas.id_persona','=','users.id_persona')
        ->first();

        return Inertia::render('Admin/Cuenta/Index',[
            'usuario' => $usuario,
        ]);
    }

    public function updateUserPersonal(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'nullable',
            'c_numTelefono' => 'required',
            'c_email' => 'required',
            'imagen_perfil' => 'nullable',
        ]);

        $usuario = $request->all();

        User::where('id', auth::user()->id)->update([
            'username' => $usuario['username'],
        ]);
        
        if(isset($usuario['password'])){
            User::where('id', auth::user()->id)->update([
                'password' => Hash::make($usuario['password']),
            ]);
        }

        if($imagen = $request->file('imagen_perfil')) {
            $rutaGuardarImg = 'images/perfil';
            $imagenPerfil = (auth::user()->username)."-".date('YmdHis'). "." . $imagen->getClientOriginalExtension();
            $imagen->move($rutaGuardarImg, $imagenPerfil);
            $usuario['imagen_perfil'] = $imagenPerfil; 
                
            User::where('id', auth::user()->id)->update([
                'imagen_perfil' => $imagenPerfil,
            ]);
        }

        
        $persona = User::where('id', auth::user()->id)->first();

        Persona::where('id_persona',$persona->id_persona)->update([
            'c_numTelefono' => $usuario['c_numTelefono'],
            'c_email' => $usuario['c_email'],
        ]);
        
        return redirect()->route('u.usuarioPersonal');
    }
}
