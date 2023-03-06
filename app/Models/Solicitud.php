<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'd_fechaSolicitud',
        'd_fechaFut',
        'id_tipoSolicitud',
        'id_estadoSolicitud',
        'id_finalidadSolicitud',
        'c_archivoFut',
        'c_codigoFut',
        'c_archivoBoucher',
        'c_codigoBoucher',//c_codigoPagoFut
        'd_fechaAceptacion',
        'c_comentarioSolicitud',
        'c_codSolicitud',
    ];

    public $timestamps = true;

    //Tipo solicitud
    public function TipoSolicitud()
    {
        return $this->belongsTo(TipoSolicitud::class);
    }

    //Estado solicitud
    public function EstadoSolicitud()
    {
        return $this->belongsTo(EstadoSolicitud::class,'id_estadoSolicitud','id_estadoSolicitud');
    }

    //Finalidad solicitud
    public function FinalidadSolicitud()
    {
        return $this->belongsTo(FinalidadSolicitud::class,'id_finalidadSolicitud','id_finalidadSolicitud');
    }

    //User
    public function users()
    {
        return $this->belongsTo(User::class,'id','id');
    }

    //DETALLE solicitud
    public function DetalleSolicitud()
    {
        return $this->belongsTo(DetalleSolicitud::class,'id_detalleSolicitud','id_detalleSolicitud');
    }

}
