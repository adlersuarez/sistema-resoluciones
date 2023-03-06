<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagosNa extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_estudiante',
        'b_estadoPagos',
        'd_fechaSolicitudNA',
        'd_fechaValidacionNA',
    ];

    public $timestamps = true;

    //Estudiante
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class,'id_estudiante','id_estudiante');
    }

    //Pago PAI
    public function PagosNaPai()
    {
        return $this->belongsTo(PagosNaPai::class); 
    }
    //Pago AE
    public function PagosNaAe()
    {
        return $this->belongsTo(PagosNaAe::class); 
    }
    //Pago FAC
    public function PagosNaFac()
    {
        return $this->belongsTo(PagosNaFac::class); 
    }
    //Pago OEFC
    public function PagosNaOefc()
    {
        return $this->belongsTo(PagosNaOefc::class); 
    }

}
