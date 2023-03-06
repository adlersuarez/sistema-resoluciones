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
        Schema::create('detalle_solicituds', function (Blueprint $table) {
            $table->id('id_detalleSolicitudNA');
            //id solicitud
            $table->unsignedBigInteger('id_solicitud');
            $table->foreign('id_solicitud')->references('id_solicitud')->on('solicituds')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_constanciaNA',200)->nullable();
            $table->string('c_codigoBarras',50)->nullable();
            $table->dateTime('d_fechaCreacion')->nullable();
            $table->boolean('b_estadoDetalleNA')->default(0);
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
        Schema::dropIfExists('detalle_solicituds');
    }
};
