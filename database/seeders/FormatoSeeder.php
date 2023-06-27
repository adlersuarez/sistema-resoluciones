<?php

namespace Database\Seeders;

use App\Models\Formato;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormatoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $formato = Formato::create([
            'nombreFormato' => 'Auspicio académico',
            'linkFormato' => 'AuspicioAcademico',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Cambio de modalidad de ingreso',
            'linkFormato' => 'CambioModalidadIngreso',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'PIA - Presupuesto Institucional de Apertura',
            'linkFormato' => 'Pia',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'PIA (modificado)',
            'linkFormato' => 'PiaModificado',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Por navidad',
            'linkFormato' => 'PorNavidad',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Por uniforme',
            'linkFormato' => 'PorUniforme',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Propuesta Jefe Of.',
            'linkFormato' => 'PropuestaJefe',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Calendario académico a nivel general',
            'linkFormato' => 'CalendarioAcademicoGeneral',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Calendario académico específico internado médico',
            'linkFormato' => 'CalendarioAcademicoInternadoMedico',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Cronograma de pagos',
            'linkFormato' => 'CronogramaPagos',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Presupuesto Admisión',
            'linkFormato' => 'PresupuestoAdmision',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Aprobación de Directiva',
            'linkFormato' => 'AprobacionDirectiva',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Aprobación de Expediente Técnico',
            'linkFormato' => 'AprobacionExpedienteTecnico',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Aprobación de Bases',
            'linkFormato' => 'AprobacionBases',
        ]);

        $formato = Formato::create([
            'nombreFormato' => 'Otorgación de buena pro',
            'linkFormato' => 'OtorgacionBuenaPro',
        ]);

    }
}
