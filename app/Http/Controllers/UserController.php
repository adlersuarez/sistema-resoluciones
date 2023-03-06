<?php

namespace App\Http\Controllers;

use App\Models\Oficina;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('soloadmin', ['only' => ['index']]);
    }

    public function index(Request $request)
    {
        $search = $request->query('search');
        $usua = User::query()->when(
            $search,
            fn ($query) =>
            $query->where('username', 'LIKE', "%{$search}%")->orWhere('id_persona', 'LIKE', "%{$search}%")
        )->with('Rol', 'Oficina')
            ->join('rols', 'users.id_rol', '=', 'rols.id_rol')
            ->join('oficina', 'users.id_oficina', '=', 'oficinas.id_oficina')->paginate(5);

        return Inertia::render('Admin/Usuarios/Usuario/Index', [
            'usua' => $usua,
        ]);
    }

    public function create()
    {
        $ofis = Oficina::all();
        $rols = Rol::all();
        return Inertia::render('Admin/Usuarios/Usuario/Create', [
            'ofis' => $ofis,
            'rols' => $rols
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'id_rol' => 'required',
            'id_oficina' => 'required',
            'id_persona' => 'required',
            'username' => 'required|string|username|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $usua = $request->all();

        User::create([
            'id_rol' => $usua['id_rol'],
            'id_oficina' => $usua['id_oficina'],
            'id_persona' => $usua['id_persona'],
            'username' => $usua['username'],
            'email' => $usua['email'],
            'password' => Hash::make($usua['password']),
        ]);
        // event(new Registered($user));
        return redirect()->route('d.usuarios.index');
    }


    public function show(User $user)
    {
        return view('users.profile', [
            'users' => User::findOrFail($user)
        ]);
    }


    public function edit($id_user)
    {
        $usua = User::with('Rol', 'Oficina')
            ->join('rols', 'users.id_rol', '=', 'rols.id_rol')
            ->join('oficinas', 'users.id_oficina', '=', 'oficinas.id_oficina')->where('id_user', $id_user)->first()
            ->makeVisible('password');

        $ofis = Oficina::all();
        $rols = Rol::all();

        return Inertia::render('Admin/Usuarios/Usuario/Edit', [
            'usua' => $usua,
            'ofis' => $ofis,
            'rols' => $rols
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_rol' => 'required',
            'id_oficina' => 'required',
            'id_persona' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $usua = $request->all();

        User::where('id', $id)->update([
            'id_rol' => $usua['id_rol'],
            'id_oficina' => $usua['id_oficina'],
            'id_persona' => $usua['id_persona'],
            'username' => $usua['username'],
            'email' => $usua['email'],
            'password' => Hash::make($usua['password']),
        ]);
        return redirect()->route('d.usuarios.index');    
    }

    public function destroy($id)
    {
        User::where('id', $id)->delete();
        return redirect()->route('d.usuarios.index');
    }

    public function getRol()
    {
        $usua = Rol::select('id_rol', 'c_nomRol')->get();
        return $usua;
    }

    public function exportExcel()
    {
        $user = User::all();
        return Excel::download($user, 'users.xlsx');
    }
    
}

