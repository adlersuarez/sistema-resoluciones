<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facultad extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomFacultad',
        'c_acroFacultad',
    ];

    public $timestamps = true;

    //Carrera Profesional
    public function CarreraProfesional()
    {
        return $this->belongsTo(CarreraProfesional::class); 
    }

}
