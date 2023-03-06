<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomArea'
    ];

    public $timestamps = true;

    //Oficina
    public function Oficina()
    {
        return $this->belongsTo(Oficina::class); 
    }
}
