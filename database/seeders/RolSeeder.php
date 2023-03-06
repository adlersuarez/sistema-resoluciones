<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder

{
    public function run()
    {

        $rol = Rol::create([
            'c_nomRol' => 'Administrador',
        ]);

        $rol = Rol::create([
            'c_nomRol' => 'Usuario',
        ]);
        
    }
}
