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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id('id_documento');
            //id Estudiante
            $table->unsignedBigInteger('id_estudiante');
            $table->foreign('id_estudiante')->references('id_estudiante')->on('estudiantes')->onUpdate('cascade')->onDelete('cascade');
            //archivo_documentos
            $table->string('a_partidaNacimiento')->nullable();
            $table->string('a_copiaDNI')->nullable();
            //
            $table->string('a_certificadoEstudioSecReg')->nullable();
            $table->string('a_certificadoEstudioSecRegAlt')->nullable();
            //
            $table->string('a_certificadoEstudioUni')->nullable();
            //
            $table->string('a_copiaLegalTituloBach')->nullable();
            //
            $table->string('a_certificadoEstudioExterno')->nullable();
            $table->string('a_constanciaConductaExterno')->nullable();
            //
            $table->string('a_certificadoEstudioInterno')->nullable();
            $table->string('a_constanciaConductaInterno')->nullable();
            //
            $table->string('a_constanciaPrimerosPuestos')->nullable();
            //
            $table->string('a_curriculoDeportivo')->nullable();
            $table->string('a_constanciaDeportistaDestacado')->nullable();
            $table->string('a_informeOriginalFPD')->nullable();
            //
            $table->string('a_carnetRegistroCONADIS')->nullable();
            //
            $table->string('a_certificadoEstudioInst')->nullable();
            $table->string('a_copiaLegalTituloEgreInst')->nullable();
            //
            $table->string('a_curriculoVitaeDescriptivo')->nullable();
            //
            $table->string('a_certificadoEstudioEscuelaOficiales')->nullable();
            $table->string('a_certificadoAcreditacionGradoOficial')->nullable();
            //
            $table->string('a_certificadoEstudioEscuelaSuboficiales')->nullable();
            $table->string('a_constanciaLegalizadaTituloEgreEscSub')->nullable();

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
        Schema::dropIfExists('documentos');
    }
};
