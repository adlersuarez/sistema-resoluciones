<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodigoPago extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_codigoPago',
        'd_fechaCodigoPago',
    ];

    public $timestamps = true;
}
