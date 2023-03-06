<?php

namespace Database\Seeders;

use App\Models\Administrativo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdministrativoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $admin = Administrativo::create([
            'id_oficina' => '1',
            'c_cargo' => '',
        ]);

        $admin = Administrativo::create([
            'id_oficina' => '2',
            'c_cargo' => 'Jefe de Informacion y Comunicaciones',
        ]);

        $admin = Administrativo::create([
            'id_oficina' => '3',
            'c_cargo' => 'Jefe de proyectos informáticos',
        ]);

        $admin = Administrativo::create([
            'id_oficina' => '4',
            'c_cargo' => 'Rector',
        ]);

        $admin = Administrativo::create([
            'id_oficina' => '5',
            'c_cargo' => 'Secretaria',
        ]);

        
        /*$admin = Administrativo::create([
            'id_oficina' => '3',
            'c_cargo' => 'Vicerector',
        ]);*/
        
    }
}
