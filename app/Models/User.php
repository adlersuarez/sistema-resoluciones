<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'id_persona',
        'id_rol',
        'username',
        'email',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Persona
    public function Persona()
    {
        return $this->belongsTo(Persona::class,'id_persona','id_persona');
    }

    //Rol
    public function Rol()
    {
        return $this->belongsTo(Rol::class,'id_rol','id_rol');
    }

    //Solicitud
    public function Solicitud()
    {
        return $this->belongsTo(Solicitud::class);
    }


}
