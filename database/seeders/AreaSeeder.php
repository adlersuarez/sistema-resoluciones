<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        //nulo
        $area = Area::create([
            'c_nomArea'=>'',
        ]);

        $area = Area::create([
            'c_nomArea'=>'Administracion',
        ]);

        $area = Area::create([
            'c_nomArea'=>'Rectorado',
        ]);

        $area = Area::create([
            'c_nomArea'=>'Informatica y Sistemas',
        ]);
    }
}
