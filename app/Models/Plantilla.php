<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plantilla extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_tipoResolucion',
        'c_archivoPlantilla',
        'c_nombrePlantilla',
        'c_descripcionPlantilla',
        'fecha_plantilla',
    ];

    //TipoResolucion
    public function TipoResolucion()
    {
        return $this->belongsTo(TipoResolucion::class,'id_tipoResolucion','id_tipoResolucion'); 
    }
}
