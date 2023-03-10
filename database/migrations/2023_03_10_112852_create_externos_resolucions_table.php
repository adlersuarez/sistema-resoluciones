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
        Schema::create('externos_resolucions', function (Blueprint $table) {
            $table->id('id_externoResolucion');
            //id resolucion
            $table->unsignedBigInteger('id_resolucion');
            $table->foreign('id_resolucion')->references('id_resolucion')->on('resolucions')->onUpdate('cascade')->onDelete('cascade');
            //id persona
            $table->unsignedBigInteger('id_tercero');
            $table->foreign('id_tercero')->references('id_tercero')->on('terceros')->onUpdate('cascade')->onDelete('cascade');

            $table->string('descripcionExterno')->nullable();
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
        Schema::dropIfExists('externos_resolucions');
    }
};
