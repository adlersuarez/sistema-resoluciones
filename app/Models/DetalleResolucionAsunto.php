<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleResolucionAsunto extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_resolucion',
        'id_tipoAsunto',
        'descripcion_asuntoResolucion',
        'imagen_asuntoResolucion',
    ];

    public $timestamps = true;

    //ListaEncargo
    public function ListaEncargo()
    {
        return $this->belongsTo(ListaEncargo::class);
    }

    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class,'id_resolucion','id_resolucion');
    }

    //TipoAsunto
    public function TipoAsunto()
    {
        return $this->belongsTo(TipoAsunto::class,'id_tipoAsunto','id_tipoAsunto');
    }
}
