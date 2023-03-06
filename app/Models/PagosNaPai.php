<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagosNaPai extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_pago',
        'f_montoPagoPAI',
        'c_archivoPAI',
        'd_fechaSolicitudNA_Pai',
        'd_fechaValidacionNA_Pai',
        'b_estadoPAI',
    ];

    public $timestamps = true;

    //Pago No Adeudo
    public function PagosNa()
    {
        return $this->belongsTo(PagosNa::class,'id_pago','id_pago'); 
    }
}
