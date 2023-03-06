<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetalleTipoPersona extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_tipoPersona',
        'id_persona',
        'id_estudiante',
        'id_administrativo',
    ];

    //Estudiante
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class,'id_estudiante','id_estudiante');
    }

    //Administrativo
    public function Administrativo()
    {
        return $this->belongsTo(Administrativo::class,'id_administrativo','id_administrativo'); 
    }

    //Tipo Persona
    public function TipoPersona()
    {
        return $this->belongsTo(TipoPersona::class,'id_tipoPersona','id_tipoPersona'); 
    }

    //Persona
    public function Persona()
    {
        return $this->belongsTo(Persona::class,'id_persona','id_persona'); 
    }
}
