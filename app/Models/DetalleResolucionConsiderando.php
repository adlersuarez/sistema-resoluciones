<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleResolucionConsiderando extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_resolucion',
        'descripcion_considerandoResolucion',
    ];

    public $timestamps = true;

    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class,'id_resolucion','id_resolucion');
    }
}
