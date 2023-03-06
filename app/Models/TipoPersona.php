<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoPersona extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomTipoPer',
    ];

    

    //Detalle Tipo Persona
    public function DetalleTipoPersona()
    {
        return $this->belongsTo(DetalleTipoPersona::class); 
    }
}
