<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especialidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_carreraProfesional',
        'c_nomEspecialidad',
        'c_acroEspecialidad',
    ];

    //CarreraProfesional
    public function CarreraProfesional()
    {
        return $this->belongsTo(CarreraProfesional::class,'id_carreraProfesional','id_carreraProfesional');
    }
}
