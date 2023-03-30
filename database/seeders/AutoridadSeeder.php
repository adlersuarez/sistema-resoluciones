<?php

namespace Database\Seeders;

use App\Models\Autoridad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AutoridadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Rector',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Director General de Administración',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Comité Electoral Universitario',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a los',
            'c_nombreAutoridad'=>'Jefes de las Oficinas de Asesoría Jurídica',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a la',
            'c_nombreAutoridad'=>'Asociación Promotora Los Andes',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a los',
            'c_nombreAutoridad'=>'Vicerrectores Académico y de Investigación',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Director General de Administración',
        ]);

        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a la',
            'c_nombreAutoridad'=>'Dirección General Académica',
        ]);
        
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a la',
            'c_nombreAutoridad'=>'Dirección General de Investigación',
        ]);
        
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Vicerrector Investigación',
        ]);
        
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Decano de la Facultad de Medicina Humana',
        ]);
        
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'al',
            'c_nombreAutoridad'=>'Director de la Unidad de Investigación de la Facultad de Medicina Humana',
        ]);
        
        $autoridad = Autoridad::create([
            'c_articuloAutoridad'=>'a los',
            'c_nombreAutoridad'=>'Jefes de las Oficinas de Proyectos, Desarrollo, Investigación y Transferencia Tecnológica, Recursos Humanos',
        ]);

    }
}
