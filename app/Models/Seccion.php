<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomSeccion',
        'c_acroSeccion',
    ];

    public $timestamps = true;

    //User
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class); 
    }
}
