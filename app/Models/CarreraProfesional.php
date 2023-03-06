<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarreraProfesional extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_facultad',
        'c_nomCarreraProf',
        'c_acroCarreraProf',
    ];

    public $timestamps = true;

    //Facultad
    public function Facultad()
    {
        return $this->belongsTo(Facultad::class,'id_facultad','id_facultad');
    }

    //User
    public function Especialidad()
    {
        return $this->belongsTo(Especialidad::class); 
    }

}
