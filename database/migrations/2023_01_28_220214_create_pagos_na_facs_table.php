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
        Schema::create('pagos_na_facs', function (Blueprint $table) {
            $table->id('id_pagoFac');
            //id pago
            $table->unsignedBigInteger('id_pago');
            $table->foreign('id_pago')->references('id_pago')->on('pagos_nas')->onUpdate('cascade')->onDelete('cascade');
            $table->float('f_montoPagoFac')->default(0);
            $table->string('c_archivoFac',200)->nullable();
            $table->dateTime('d_fechaSolicitudNA_Fac')->nullable();
            $table->boolean('b_estadoNotificacionNA_Fac')->default(0);
            $table->dateTime('d_fechaValidacionNA_Fac')->nullable();
            $table->boolean('b_estadoFac')->default(0);
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
        Schema::dropIfExists('pagos_na_facs');
    }
};
