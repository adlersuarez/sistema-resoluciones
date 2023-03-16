<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_codMatricula', 
        'id_tipoEstudiante',
        'id_especialidad',
        'id_modalidad',
        'id_modalidadIngreso',
        'id_sede',
        'id_seccion',
        'id_nivel',
    ];

    //DetalleTipoPersona
    public function DetalleTipoPersona()
    {
        return $this->belongsTo(DetalleTipoPersona::class);
    }

    //Tipo Estudiante
    public function TipoEstudiante()
    {
        return $this->belongsTo(TipoEstudiante::class,'id_tipoEstudiante','id_tipoEstudiante');
    }

    //Modalidad
    public function Modalidad()
    {
        return $this->belongsTo(Modalidad::class,'id_modalidad','id_modalidad');
    }

    //Modalidad
    public function ModalidadIngreso()
    {
        return $this->belongsTo(ModalidadIngreso::class,'id_modalidadIngreso','id_modalidadIngreso');
    }

    //Especialidad
    public function Especialidad()
    {
        return $this->belongsTo(Especialidad::class,'id_especialidad','id_especialidad');
    }

    //Sede
    public function Sede()
    {
        return $this->belongsTo(Sede::class,'id_sede','id_sede');
    }

    //Seccion
    public function Seccion()
    {
        return $this->belongsTo(Seccion::class,'id_seccion','id_seccion');
    }

    //Nivel
    public function Nivel()
    {
        return $this->belongsTo(Nivel::class,'id_nivel','id_nivel');
    }

}
