<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagosNaAe extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pago',
        'f_montoPagoAE',
        'c_archivoAE',
        'd_fechaSolicitudNA_Ae',
        'd_fechaValidacionNA_Ae',
        'b_estadoAE',
    ];

    public $timestamps = true;

    //Pago No Adeudo
    public function PagosNa()
    {
        return $this->belongsTo(PagosNa::class,'id_pago','id_pago'); 
    }
}
