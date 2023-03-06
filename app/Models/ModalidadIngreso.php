<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModalidadIngreso extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomModalidadIngreso'
    ];

    public $timestamps = true;

    //Carrera Profesional
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class); 
    }
}
