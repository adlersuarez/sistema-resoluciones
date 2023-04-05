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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id('id_documento');
            //tipo terceros
            $table->unsignedBigInteger('id_tipoDocumento');
            $table->foreign('id_tipoDocumento')->references('id_tipoDocumento')->on('tipo_documentos')->onUpdate('cascade')->onDelete('cascade');
            $table->string('num_documento');
            $table->string('subNum_documento');
            $table->dateTime('fecha_documento')->nullable();
            $table->string('considerando_documento',2000)->nullable();
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
        Schema::dropIfExists('documentos');
    }
};
