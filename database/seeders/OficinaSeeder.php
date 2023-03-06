<?php

namespace Database\Seeders;

use App\Models\Oficina;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OficinaSeeder extends Seeder
{
    
    public function run()
    {
        //nulo
        $oficina = Oficina::create([
            'id_area' => '1',
            'c_nomOficina' => '',
        ]);

        $oficina = Oficina::create([
            'id_area' => '4',
            'c_nomOficina' => 'Información y comunicaciones',
        ]);

        $oficina = Oficina::create([
            'id_area' => '4',
            'c_nomOficina' => 'Informática',
        ]);

        $oficina = Oficina::create([
            'id_area' => '3',
            'c_nomOficina' => 'Rectorado',
        ]);

        $oficina = Oficina::create([
            'id_area' => '2',
            'c_nomOficina' => 'Secretaria',
        ]);  
    }
}
