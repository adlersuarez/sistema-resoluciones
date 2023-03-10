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
        Schema::create('miembros_resolucions', function (Blueprint $table) {
            $table->id('id_miembroResolucion');
            //id resolucion
            $table->unsignedBigInteger('id_resolucion');
            $table->foreign('id_resolucion')->references('id_resolucion')->on('resolucions')->onUpdate('cascade')->onDelete('cascade');
            //id persona
            $table->unsignedBigInteger('id_persona');
            $table->foreign('id_persona')->references('id_persona')->on('personas')->onUpdate('cascade')->onDelete('cascade');

            $table->string('descripcionMiembro')->nullable();

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
        Schema::dropIfExists('miembros_resolucions');
    }
};
