<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTercero extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreTercero',
        'descripcionTercero',
    ];

    
    //Tercero
    public function Tercero()
    {
        return $this->belongsTo(Tercero::class); 
    }
}
