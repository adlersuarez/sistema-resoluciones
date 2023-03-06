<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalidadSolicitud extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomFinalidadSolicitud',
        'c_acroFinalSolicitud'  
    ];

    public $timestamps = true;

    //Solicitud
    public function Solicitud()
    {
        return $this->belongsTo(Solicitud::class); 
    }
}
