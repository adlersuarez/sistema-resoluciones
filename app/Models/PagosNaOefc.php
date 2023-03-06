<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagosNaOefc extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pago',
        'f_montoPagoOEF',
        'c_archivoOEF',
        'd_fechaSolicitudNA_Oef',
        'd_fechaValidacionNA_Oef',
        'b_estadoOEF',
    ];

    public $timestamps = true;

    //Pago No Adeudo
    public function PagosNa()
    {
        return $this->belongsTo(PagosNa::class,'id_pago','id_pago'); 
    }
}
