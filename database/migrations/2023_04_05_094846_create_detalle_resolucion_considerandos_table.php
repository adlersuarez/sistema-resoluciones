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
        Schema::create('detalle_resolucion_considerandos', function (Blueprint $table) {
            $table->id('id_detalleResolucionConsiderando');
            //resolucion
            $table->unsignedBigInteger('id_resolucion');
            $table->foreign('id_resolucion')->references('id_resolucion')->on('resolucions')->onUpdate('cascade')->onDelete('cascade');
            $table->string('descripcion_considerandoResolucion',2000)->nullable();
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
        Schema::dropIfExists('detalle_resolucion_considerandos');
    }
};
