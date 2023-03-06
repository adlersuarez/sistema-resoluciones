<?php

namespace Database\Seeders;

use App\Models\TipoSolicitud;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoSolicitudSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoSol = TipoSolicitud::create([
            'c_nomSolicitud' => 'Constancia No Adeudo',
            'c_guiaTramite'=>'2022122923284.pdf',
            'c_acroTipoSolicitud'=>'NA',
            'f_montoPagoTipo'=>'30.00',
        ]);

        $tipoSol = TipoSolicitud::create([
            'c_nomSolicitud' => '---',
            'c_guiaTramite'=>'202212292328418.pdf',
            'c_acroTipoSolicitud'=>'Nin1',
            'f_montoPagoTipo'=>'40.00',
        ]);

        $tipoSol = TipoSolicitud::create([
            'c_nomSolicitud' => '----',
            'c_guiaTramite'=>'20221229232818.pdf',
            'c_acroTipoSolicitud'=>'Nin2',
            'f_montoPagoTipo'=>'50.00',
        ]);

    }
}
