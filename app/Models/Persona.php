<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_dni',
        'c_apellidoP',
        'c_apellidoM',
        'c_nombres',
        'c_numTelefono',
        'c_numCelular',
        'c_email',
    ];

    
    //User
    public function User()
    {
        return $this->belongsTo(User::class); 
    }

    //ExternosResolucion
    public function ExternosResolucion()
    {
        return $this->belongsTo(ExternosResolucion::class); 
    }

    //DetalleTipoPersona
    public function DetalleTipoPersona()
    {
        return $this->belongsTo(DetalleTipoPersona::class);
    }

}
