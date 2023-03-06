<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEstudiante extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomTipoEstud'
    ];

    public $timestamps = true;

    //Carrera Profesional
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class); 
    }
}
