<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    public function run()
    {
        $user = User::create([
            'id_persona'=>'1',
            'id_rol'=>'1',
            'username'=>'Amaya',
            'email'=>'a_Amaya@upla.edu.pe',
            'password'=>Hash::make('admin'),
        ]);

        $user = User::create([
            'id_persona'=>'2',
            'id_rol'=>'2',
            'username'=>'Juan',
            'email'=>'e_2021453255J@upla.edu.pe',
            'password'=>Hash::make('user1'),
        ]);

        $user = User::create([
            'id_persona'=>'3',
            'id_rol'=>'2',
            'username'=>'Jose',
            'email'=>'e_2020495283D@upla.edu.pe',
            'password'=>Hash::make('user2'),
        ]);

        $user = User::create([
            'id_persona'=>'4',
            'id_rol'=>'2',
            'username'=>'Clara',
            'email'=>'e_2018401365F@upla.edu.pe',
            'password'=>Hash::make('user3'),
        ]);

        $user = User::create([
            'id_persona'=>'5',
            'id_rol'=>'2',
            'username'=>'Grecia',
            'email'=>'e_2021741245B@upla.edu.pe',
            'password'=>Hash::make('user4'),
        ]);
        $user = User::create([
            'id_persona'=>'6',
            'id_rol'=>'2',
            'username'=>'Judas',
            'email'=>'e_2021756135G@upla.edu.pe',
            'password'=>Hash::make('user5'),
        ]);

        $user = User::create([
            'id_persona'=>'7',
            'id_rol'=>'2',
            'username'=>'Carlos',
            'email'=>'e_2021740786H@upla.edu.pe',
            'password'=>Hash::make('user6'),
        ]);

        $user = User::create([
            'id_persona'=>'8',
            'id_rol'=>'2',
            'username'=>'Lucia',
            'email'=>'e_2016740886C@upla.edu.pe',
            'password'=>Hash::make('user7'),
        ]);
        $user = User::create([
            'id_persona'=>'9',
            'id_rol'=>'2',
            'username'=>'Juans',
            'email'=>'e_2019250886F@upla.edu.pe',
            'password'=>Hash::make('user8'),
        ]);

        $user = User::create([
            'id_persona'=>'10',
            'id_rol'=>'1',
            'username'=>'Pedro',
            'email'=>'a_Pedro@upla.edu.pe',
            'password'=>Hash::make('admin'),
        ]);
    }
}
