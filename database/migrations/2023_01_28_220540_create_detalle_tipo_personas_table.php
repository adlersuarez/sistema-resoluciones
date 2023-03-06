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
        Schema::create('detalle_tipo_personas', function (Blueprint $table) {
            $table->id('id_detalleTipoPersona');
            //id tipo persona
            $table->unsignedBigInteger('id_tipoPersona');
            $table->foreign('id_tipoPersona')->references('id_tipoPersona')->on('tipo_personas')->onUpdate('cascade')->onDelete('cascade');
            //id persona
            $table->unsignedBigInteger('id_persona');
            $table->foreign('id_persona')->references('id_persona')->on('personas')->onUpdate('cascade')->onDelete('cascade');
            //id detalle tipo Estudiante
            $table->unsignedBigInteger('id_estudiante');
            $table->foreign('id_estudiante')->references('id_estudiante')->on('estudiantes')->onUpdate('cascade')->onDelete('cascade');
            //id detalle tipo Administrativo
            $table->unsignedBigInteger('id_administrativo');
            $table->foreign('id_administrativo')->references('id_administrativo')->on('administrativos')->onUpdate('cascade')->onDelete('cascade');

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
        Schema::dropIfExists('detalle_tipo_personas');
    }
};
