<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modalidad extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomModalidad'
    ];

    public $timestamps = true;

    //User
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class); 
    }
}
