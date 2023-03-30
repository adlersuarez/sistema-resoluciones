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
        Schema::create('detalle_resolucion_asuntos', function (Blueprint $table) {
            $table->id('id_detalleResolucionAsunto');
            //resolucion
            $table->unsignedBigInteger('id_resolucion');
            $table->foreign('id_resolucion')->references('id_resolucion')->on('resolucions')->onUpdate('cascade')->onDelete('cascade');
            //tipo asuntos
            $table->unsignedBigInteger('id_tipoAsunto');
            $table->foreign('id_tipoAsunto')->references('id_tipoAsunto')->on('tipo_asuntos')->onUpdate('cascade')->onDelete('cascade');
            $table->string('descripcion_asuntoResolucion',500)->nullable();
            $table->string('imagen_asuntoResolucion',100)->nullable();
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
        Schema::dropIfExists('detalle_resolucion_asuntos');
    }
};
