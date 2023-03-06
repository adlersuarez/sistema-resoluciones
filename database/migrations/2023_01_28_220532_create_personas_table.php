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
        Schema::create('personas', function (Blueprint $table) {
            $table->id('id_persona');
            $table->string('c_dni')->unique();
            $table->string('c_apellidoP');
            $table->string('c_apellidoM');
            $table->string('c_nombres');
            $table->string('c_numTelefono')->nullable();
            $table->string('c_numCelular')->nullable();
            //$table->string('c_email')->unique();
            $table->string('c_email')->nullable();
            
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
        Schema::dropIfExists('personas');
    }
};
