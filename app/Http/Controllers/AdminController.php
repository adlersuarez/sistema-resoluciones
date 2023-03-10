<?php

namespace App\Http\Controllers;

//use App\Models\Solicitud;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//php excel
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use PhpOffice\PhpSpreadsheet\Reader\Xlsx as ReaderXlsx;

use PhpOffice\PhpSpreadsheet\IOFactory;
//use PhpOffice\PhpSpreadsheet\Reader\Xlsx();

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('soloadmin',['only'=> ['index']]);
    }

    public function index()
    {
        $user = User::where('id_rol',2)->get();
        return Inertia::render('Admin/Admin',[
            'user' => $user,
        ]);
    }

    public function generarReporte()
    {   
        
    }
    
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

  
    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

  
    public function destroy($id)
    {
        //
    }
}
