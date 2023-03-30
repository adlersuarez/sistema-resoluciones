<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAsunto extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nombreTipoAsunto',
    ];

    public $timestamps = true;

    //DetalleResolucionAsunto
    public function DetalleResolucionAsunto()
    {
        return $this->belongsTo(DetalleResolucionAsunto::class);
    }
}
