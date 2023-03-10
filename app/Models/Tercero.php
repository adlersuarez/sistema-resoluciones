<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tercero extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_tipoTercero',
        't_dni',
        't_apellidoP',
        't_apellidoM',
        't_nombres',
        't_numTelefono',
        't_numCelular',
        't_email',
    ];

    
    //ExternosResolucion
    public function ExternosResolucion()
    {
        return $this->belongsTo(ExternosResolucion::class); 
    }

    //Tipo Tercero
    public function TipoTercero()
    {
        return $this->belongsTo(TipoTercero::class,'id_tipoTercero','id_tipoTercero');
    }
}
