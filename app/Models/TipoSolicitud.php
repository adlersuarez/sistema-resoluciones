<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoSolicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_tipoSolicitud',
        'c_nomSolicitud',
        'c_guiaTramite',
        'c_acroTipoSolicitud'       
    ];

    public $timestamps = true;

    //Solicitud
    public function Solicitud()
    {
        return $this->belongsTo(Solicitud::class); 
    }
}
