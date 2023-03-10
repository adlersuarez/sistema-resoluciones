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
        'id_pago',
    ];

    //DetalleTipoPersona
    public function DetalleTipoPersona()
    {
        return $this->belongsTo(DetalleTipoPersona::class);
    }

    //Modalidad
    public function Modalidad()
    {
        return $this->belongsTo(Modalidad::class);
    }

    //Modalidad
    public function ModalidadIngreso()
    {
        return $this->belongsTo(ModalidadIngreso::class);
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

}
