<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_area',
        'c_nomOficina',
    ];
    
    public $timestamps = true;

    //Area
    public function Area()
    {
        return $this->belongsTo(Area::class);
    }

    //Area
    public function Administrativo()
    {
        return $this->belongsTo(Administrativo::class);
    }
}
