<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_tipoDocumento', 
        'num_documento',
        'subNum_documento',
        'fecha_documento',
        'considerando_documento',
    ];

    //Tipo Estudiante
    public function TipoDocumento()
    {
        return $this->belongsTo(TipoDocumento::class,'id_tipoDocumento','id_tipoDocumento');
    }
}
