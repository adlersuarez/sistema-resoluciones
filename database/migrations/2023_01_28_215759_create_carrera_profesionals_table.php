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
        Schema::create('carrera_profesionals', function (Blueprint $table) {
            $table->id('id_carreraProfesional');
            //id facultad
            $table->unsignedBigInteger('id_facultad');
            $table->foreign('id_facultad')->references('id_facultad')->on('facultads')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_nomCarreraProf',100);
            $table->string('c_acroCarreraProf',10);
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
        Schema::dropIfExists('carrera_profesionals');
    }
};
