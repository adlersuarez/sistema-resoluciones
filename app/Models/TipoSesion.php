<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoSesion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreSesion',
        'descripcionSesion',
    ];

    
    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class); 
    }
}
