<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagosNaFac extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pago',
        'f_montoPagoFac',
        'c_archivoFac',
        'd_fechaSolicitudNA_Fac',
        'd_fechaValidacionNA_Fac',
        'b_estadoFac',
    ];

    public $timestamps = true;

    //Pago No Adeudo
    public function PagosNa()
    {
        return $this->belongsTo(PagosNa::class,'id_pago','id_pago'); 
    }
}
