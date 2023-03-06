<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrativo extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_oficina',
        'c_cargo',
    ];

    //DetalleTipoPersona
    public function DetalleTipoPersona()
    {
        return $this->belongsTo(DetalleTipoPersona::class);
    }

    //Oficina
    public function Oficina()
    {
        return $this->belongsTo(Oficina::class); 
    }
}
