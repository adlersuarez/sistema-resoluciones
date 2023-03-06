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
        Schema::create('solicituds', function (Blueprint $table) {
            $table->id('id_solicitud');
            //id user
            $table->unsignedBigInteger('id');
            $table->foreign('id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->dateTime('d_fechaSolicitud');
            $table->dateTime('d_fechaFut')->nullable();
            $table->string('c_archivoFut')->nullable();
            $table->string('c_codigoFut',50)->nullable();
            $table->string('c_archivoBoucher')->nullable();
            $table->string('c_codigoBoucher',50)->nullable();
            //fecha aceptacion
            $table->dateTime('d_fechaAceptacion')->nullable();
            //id tipo solicitud
            $table->unsignedBigInteger('id_tipoSolicitud');
            $table->foreign('id_tipoSolicitud')->references('id_tipoSolicitud')->on('tipo_solicituds')->onUpdate('cascade')->onDelete('cascade');
            //estado solicitud
            $table->unsignedBigInteger('id_estadoSolicitud');
            $table->foreign('id_estadoSolicitud')->references('id_estadoSolicitud')->on('estado_solicituds')->onUpdate('cascade')->onDelete('cascade');
            //finalidad solicitud
            $table->unsignedBigInteger('id_finalidadSolicitud');
            $table->foreign('id_finalidadSolicitud')->references('id_finalidadSolicitud')->on('finalidad_solicituds')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_comentarioSolicitud',1200)->nullable();
            $table->string('c_codSolicitud',50);
            
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
        Schema::dropIfExists('solicituds');
    }
};
