<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoSolicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomEstadoSol',  
    ];

    public $timestamps = true;

    //Solicitud
    public function Solicitud()
    {
        return $this->belongsTo(Solicitud::class); 
    }
}
