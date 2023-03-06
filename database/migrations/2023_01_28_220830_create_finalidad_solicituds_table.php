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
        Schema::create('finalidad_solicituds', function (Blueprint $table) {
            $table->id('id_finalidadSolicitud');
            $table->string('c_nomFinalidadSolicitud',100)->unique();
            $table->string('c_acroFinalSolicitud',20)->unique();
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
        Schema::dropIfExists('finalidad_solicituds');
    }
};
