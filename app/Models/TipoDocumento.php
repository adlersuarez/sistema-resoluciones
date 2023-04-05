<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombreDocumento',
        'descripcionDocumento',
    ];

    public $timestamps = true;

    //Documento
    public function Documento()
    {
        return $this->belongsTo(Documento::class); 
    }
}
