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
        Schema::create('plantillas', function (Blueprint $table) {
            $table->id('id_plantilla');
            //tipo resolucion
            $table->unsignedBigInteger('id_tipoResolucion');
            $table->foreign('id_tipoResolucion')->references('id_tipoResolucion')->on('tipo_resolucions')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_nombrePlantilla',50)->nullable();
            $table->string('c_descripcionPlantilla',500)->nullable();
            $table->string('c_archivoPlantilla',100)->nullable();
            $table->dateTime('fecha_plantilla')->nullable();
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
        Schema::dropIfExists('plantillas');
    }
};
