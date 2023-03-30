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
        Schema::create('lista_encargos', function (Blueprint $table) {
            $table->id('id_listaEncargo');
            //id detalle resolucion
            $table->unsignedBigInteger('id_detalleResolucionAsunto');
            $table->foreign('id_detalleResolucionAsunto')->references('id_detalleResolucionAsunto')->on('detalle_resolucion_asuntos')->onUpdate('cascade')->onDelete('cascade');
            //id detalle resolucion
            $table->unsignedBigInteger('id_autoridad');
            $table->foreign('id_autoridad')->references('id_autoridad')->on('autoridads')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('lista_encargos');
    }
};
