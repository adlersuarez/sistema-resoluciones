<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resolucion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'id_tipoSesion',
        'id_tipoResolucion',
        'id_carreraProfesional',
        'id_sede',
        'nombreResolucion',
        'numeroResolucion',
        'archivoResolucion',
        'asuntoResolucion',
        'descripcion_vistoResolucion',
        'c_codigoBarras',
        'c_codigoQr',
        
        'fechaResolucion',
    ];

    
    //User
    public function User()
    {
        return $this->belongsTo(User::class,'id','id'); 
    }

    //TipoSesion
    public function TipoSesion()
    {
        return $this->belongsTo(TipoSesion::class,'id_tipoSesion','id_tipoSesion'); 
    }

    //TipoResolucion
    public function TipoResolucion()
    {
        return $this->belongsTo(TipoResolucion::class,'id_tipoResolucion','id_tipoResolucion'); 
    }

    //CarreraProfesional
    public function CarreraProfesional()
    {
        return $this->belongsTo(CarreraProfesional::class,'id_carreraProfesional','id_carreraProfesional');
    }

    //Sede
    public function Sede()
    {
        return $this->belongsTo(Sede::class,'id_sede','id_sede');
    }

    //MiembrosResolucion
    public function MiembrosResolucion()
    {
        return $this->belongsTo(Sede::class);
    }

    //ExternosResolucion
    public function ExternosResolucion()
    {
        return $this->belongsTo(Sede::class);
    }
}
