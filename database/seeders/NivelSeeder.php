<?php

namespace Database\Seeders;

use App\Models\Nivel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NivelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //nulo
        $nivel = Nivel::create([
            'c_nomNivel'=>'',
            'c_acroNivel'=>'',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Primero',
            'c_acroNivel'=>'01',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Segundo',
            'c_acroNivel'=>'02',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Tercero',
            'c_acroNivel'=>'03',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Cuarto',
            'c_acroNivel'=>'04',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Quinto',
            'c_acroNivel'=>'05',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Sexto',
            'c_acroNivel'=>'06',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Séptimo',
            'c_acroNivel'=>'07',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Octavo',
            'c_acroNivel'=>'08',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Noveno',
            'c_acroNivel'=>'09',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Décimo',
            'c_acroNivel'=>'10',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Décimo primero',
            'c_acroNivel'=>'11',
        ]);

        $nivel = Nivel::create([
            'c_nomNivel'=>'Décimo segundo',
            'c_acroNivel'=>'12',
        ]);
        
    }
}
