<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nivel extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomNivel',
        'c_acroNivel',
    ];

    public $timestamps = true;

    //User
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class); 
    }
}
