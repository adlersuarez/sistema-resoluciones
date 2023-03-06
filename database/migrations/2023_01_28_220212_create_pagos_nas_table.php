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
        Schema::create('pagos_nas', function (Blueprint $table) {
            $table->id('id_pago');
            //id estudiante
            $table->unsignedBigInteger('id_estudiante');
            $table->foreign('id_estudiante')->references('id_estudiante')->on('estudiantes')->onUpdate('cascade')->onDelete('cascade');
            $table->dateTime('d_fechaSolicitudNA')->nullable();
            $table->dateTime('d_fechaValidacionNA')->nullable();
            $table->boolean('b_estadoPagos')->default(0);
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
        Schema::dropIfExists('pagos_nas');
    }
};
