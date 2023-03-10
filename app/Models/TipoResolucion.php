<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoResolucion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreTipoResolucion',
        'acronimoTipoResolucion',
        'descripcionTipoResolucion',
    ];

    
    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class); 
    }

}
