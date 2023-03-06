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
        Schema::create('especialidads', function (Blueprint $table) {
            $table->id('id_especialidad');
            //id carrera prof
            $table->unsignedBigInteger('id_carreraProfesional');
            $table->foreign('id_carreraProfesional')->references('id_carreraProfesional')->on('carrera_profesionals')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_nomEspecialidad',100);
            $table->string('c_acroEspecialidad',10);
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
        Schema::dropIfExists('especialidads');
    }
};
