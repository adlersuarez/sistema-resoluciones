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
        Schema::create('pagos_na_oefcs', function (Blueprint $table) {
            $table->id('id_pagoOEF');
            //id pago
            $table->unsignedBigInteger('id_pago');
            $table->foreign('id_pago')->references('id_pago')->on('pagos_nas')->onUpdate('cascade')->onDelete('cascade');
            $table->float('f_montoPagoOEF')->default(0);
            $table->string('c_archivoOEF',200)->nullable();
            $table->dateTime('d_fechaSolicitudNA_Oef')->nullable();
            $table->boolean('b_estadoNotificacionNA_Oef')->default(0);
            $table->dateTime('d_fechaValidacionNA_Oef')->nullable();
            $table->boolean('b_estadoOEF')->default(0);
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
        Schema::dropIfExists('pagos_na_oefcs');
    }
};
