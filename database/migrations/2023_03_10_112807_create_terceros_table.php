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
        Schema::create('terceros', function (Blueprint $table) {
            $table->id('id_tercero');
            //tipo terceros
            $table->unsignedBigInteger('id_tipoTercero');
            $table->foreign('id_tipoTercero')->references('id_tipoTercero')->on('tipo_terceros')->onUpdate('cascade')->onDelete('cascade');
            $table->string('t_dni')->unique();
            $table->string('t_apellidoP');
            $table->string('t_apellidoM');
            $table->string('t_nombres');
            $table->string('t_numTelefono')->nullable();
            $table->string('t_numCelular')->nullable();
            $table->string('t_email')->nullable();
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
        Schema::dropIfExists('terceros');
    }
};
