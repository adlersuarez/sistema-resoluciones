<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExternosResolucion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_resolucion',
        'id_tercero',
        'descripcionExterno',
    ];

    public $timestamps = true;

    //Resolucion
    public function Resolucion()
    {
        return $this->belongsTo(Resolucion::class,'id_resolucion','id_resolucion'); 
    }

    //Tercero
    public function Tercero()
    {
        return $this->belongsTo(Tercero::class,'id_tercero','id_tercero'); 
    }
}
