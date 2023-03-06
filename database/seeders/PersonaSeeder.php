<?php

namespace Database\Seeders;

use App\Models\Persona;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persona = Persona::create([
            'c_dni'=>'96872456',
            'c_apellidoP'=>'Astete',
            'c_apellidoM'=>'Montalvo',
            'c_nombres'=>'Milagros',
            'c_numTelefono'=>'475132',
            'c_numCelular'=>'965004343',
            'c_email'=>'a_Milagros@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'45261325',
            'c_apellidoP'=>'Vargas',
            'c_apellidoM'=>'Cruz',
            'c_nombres'=>'Juan',
            'c_numTelefono'=>'763512',
            'c_numCelular'=>'946542036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2021453255J@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'48265913',
            'c_apellidoP'=>'Julcarima',
            'c_apellidoM'=>'Gomez',
            'c_nombres'=>'Jose',
            'c_numTelefono'=>'344512',
            'c_numCelular'=>'941278036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2020495283D@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'56124326',
            'c_apellidoP'=>'Torres',
            'c_apellidoM'=>'Saenz',
            'c_nombres'=>'Clara',
            'c_numTelefono'=>'778132',
            'c_numCelular'=>'978912036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2018401365F@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'95842631',
            'c_apellidoP'=>'Garcia',
            'c_apellidoM'=>'Truman',
            'c_nombres'=>'Grecia',
            'c_numTelefono'=>'456512',
            'c_numCelular'=>'903145036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2021741245B@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'97842631',
            'c_apellidoP'=>'De la Torre',
            'c_apellidoM'=>'Alzada',
            'c_nombres'=>'Judas',
            'c_numTelefono'=>'456482',
            'c_numCelular'=>'900485036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2021756135G@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'95842456',
            'c_apellidoP'=>'Valerio',
            'c_apellidoM'=>'Quijada',
            'c_nombres'=>'Carlos',
            'c_numTelefono'=>'566132',
            'c_numCelular'=>'945145036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'e_2018200449H@uncp.edu.pe',
            //'c_email'=>'e_2018200462K@uncp.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'95842457',
            'c_apellidoP'=>'Condori',
            'c_apellidoM'=>'Morales',
            'c_nombres'=>'Lucia',
            'c_numTelefono'=>'645132',
            'c_numCelular'=>'923445036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2016740886C@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'93512456',
            'c_apellidoP'=>'Peralta',
            'c_apellidoM'=>'Paredes',
            'c_nombres'=>'Juan',
            'c_numTelefono'=>'456132',
            'c_numCelular'=>'998145036',
            'c_email'=>'johamjurado@gmail.com',
            //'c_email'=>'2019250886F@upla.edu.pe',
        ]);

        $persona = Persona::create([
            'c_dni'=>'96873456',
            'c_apellidoP'=>'Gutiérrez',
            'c_apellidoM'=>'Reyes',
            'c_nombres'=>'Pedro',
            'c_numTelefono'=>'763512',
            'c_numCelular'=>'935445036',
            'c_email'=>'Pedro_GR@upla.edu.pe',
        ]);

    }
}
