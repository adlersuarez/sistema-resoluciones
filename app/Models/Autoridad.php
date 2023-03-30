<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autoridad extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_articuloAutoridad',
        'c_nombreAutoridad',
    ];

    public $timestamps = true;

    //ListaEncargo
    public function ListaEncargo()
    {
        return $this->belongsTo(ListaEncargo::class);
    }
}
