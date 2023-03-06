<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleSolicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_solicitud',
        'c_constanciaNA',
        'c_codigoBarras',
        'd_fechaCreacion',
        'b_estadoDetalleNA',
    ];

    public $timestamps = true;

    //Solicitud
    public function Solicitud()
    {
        return $this->belongsTo(Solicitud::class); 
    }
    
}
