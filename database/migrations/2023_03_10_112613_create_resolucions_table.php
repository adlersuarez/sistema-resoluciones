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
        Schema::create('resolucions', function (Blueprint $table) {
            $table->id('id_resolucion');
            //usuario
            $table->unsignedBigInteger('id');
            $table->foreign('id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            //tipo sesion
            $table->unsignedBigInteger('id_tipoSesion');
            $table->foreign('id_tipoSesion')->references('id_tipoSesion')->on('tipo_sesions')->onUpdate('cascade')->onDelete('cascade');
            //tipo resolucion
            $table->unsignedBigInteger('id_tipoResolucion');
            $table->foreign('id_tipoResolucion')->references('id_tipoResolucion')->on('tipo_resolucions')->onUpdate('cascade')->onDelete('cascade');
            //id carrera prof
            $table->unsignedBigInteger('id_carreraProfesional');
            $table->foreign('id_carreraProfesional')->references('id_carreraProfesional')->on('carrera_profesionals')->onUpdate('cascade')->onDelete('cascade');
            //id sede
            $table->unsignedBigInteger('id_sede');
            $table->foreign('id_sede')->references('id_sede')->on('sedes')->onUpdate('cascade')->onDelete('cascade');

            $table->string('nombreResolucion',100)->nullable();
            $table->string('numeroResolucion',40)->nullable();
            $table->string('archivoResolucion',50)->nullable();
            $table->string('asuntoResolucion',200)->nullable();

            $table->dateTime('fechaResolucion')->nullable();

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
        Schema::dropIfExists('resolucions');
    }
};
