<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_estudiante',
        'a_partidaNacimiento',
        'a_copiaDNI',
        'a_certificadoEstudioSecReg',
        'a_certificadoEstudioSecRegAlt',
        'a_certificadoEstudioUni',
        'a_copiaLegalTituloBach',
        'a_certificadoEstudioExterno',
        'a_constanciaConductaExterno',
        'a_certificadoEstudioInterno',
        'a_constanciaConductaInterno',
        'a_constanciaPrimerosPuestos',
        'a_curriculoDeportivo',
        'a_constanciaDeportistaDestacado',
        'a_informeOriginalFPD',
        'a_carnetRegistroCONADIS',
        'a_certificadoEstudioInst',
        'a_copiaLegalTituloEgreInst',
        'a_curriculoVitaeDescriptivo',
        'a_certificadoEstudioEscuelaOficiales',
        'a_certificadoAcreditacionGradoOficial',
        'a_certificadoEstudioEscuelaSuboficiales',
        'a_constanciaLegalizadaTituloEgreEscSub',
    ];

    public $timestamps = true;

    //Estudiante
    public function Estudiante()
    {
        return $this->belongsTo(Estudiante::class,'id_estudiante','id_estudiante');
    }
}
