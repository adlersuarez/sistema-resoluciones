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
        Schema::create('administrativos', function (Blueprint $table) {
            $table->id('id_administrativo');
            //id oficina
            $table->unsignedBigInteger('id_oficina');
            $table->foreign('id_oficina')->references('id_oficina')->on('oficinas')->onUpdate('cascade')->onDelete('cascade');
            $table->string('c_cargo',100);
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
        Schema::dropIfExists('administrativos');
    }
};
