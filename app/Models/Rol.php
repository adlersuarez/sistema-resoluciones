<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_nomRol',
    ];

    //User
    public function User()
    {
        return $this->belongsTo(User::class);
    }

}
