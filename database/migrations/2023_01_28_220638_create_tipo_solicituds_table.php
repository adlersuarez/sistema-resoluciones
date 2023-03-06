<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_solicituds', function (Blueprint $table) {
            $table->id('id_tipoSolicitud');
            $table->string('c_nomSolicitud',100)->unique();
            $table->string('c_guiaTramite',200)->unique();
            $table->string('c_acroTipoSolicitud',20)->unique();
            $table->float('f_montoPagoTipo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_solicituds');
    }
};
