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
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id('id_estudiante');
            $table->string('c_codMatricula')->unique();
            //id tipo_estudiante
            $table->unsignedBigInteger('id_tipoEstudiante');
            $table->foreign('id_tipoEstudiante')->references('id_tipoEstudiante')->on('tipo_estudiantes')->onUpdate('cascade')->onDelete('cascade');
            //id carrera prof
            $table->unsignedBigInteger('id_especialidad');
            $table->foreign('id_especialidad')->references('id_especialidad')->on('especialidads')->onUpdate('cascade')->onDelete('cascade');
            //id modalidad
            $table->unsignedBigInteger('id_modalidad');
            $table->foreign('id_modalidad')->references('id_modalidad')->on('modalidads')->onUpdate('cascade')->onDelete('cascade');
            //id modalidad ingreso
            $table->unsignedBigInteger('id_modalidadIngreso');
            $table->foreign('id_modalidadIngreso')->references('id_modalidadIngreso')->on('modalidad_ingresos')->onUpdate('cascade')->onDelete('cascade');
            //id sede
            $table->unsignedBigInteger('id_sede');
            $table->foreign('id_sede')->references('id_sede')->on('sedes')->onUpdate('cascade')->onDelete('cascade');
            
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
        Schema::dropIfExists('estudiantes');
    }
};
