<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MiembrosResolucion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_resolucion',
        'id_persona',
        'descripcionMiembro',
    ];

    public $timestamps = true;

    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class,'id_resolucion','id_resolucion'); 
    }

    //Persona
    public function Persona()
    {
        return $this->belongsTo(Tercero::class,'id_persona','id_persona'); 
    }
}
