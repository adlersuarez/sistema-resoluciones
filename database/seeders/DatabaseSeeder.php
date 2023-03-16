<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
//use App\Models\Especificacion_Software;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
        $this->call(FacultadSeeder::class);
        $this->call(CarreraProfesionalSeeder::class);
        $this->call(EspecialidadSeeder::class);

        $this->call(ModalidadSeeder::class);
        $this->call(ModalidadIngresoSeeder::class);
        $this->call(SedeSeeder::class);
        $this->call(SeccionSeeder::class);
        $this->call(NivelSeeder::class);
        $this->call(TipoEstudianteSeeder::class);

        $this->call(AreaSeeder::class);
        $this->call(OficinaSeeder::class);
        $this->call(AdministrativoSeeder::class);

        $this->call(EstudianteSeeder::class);
       
        $this->call(PersonaSeeder::class);
        $this->call(TipoPersonaSeeder::class);
        $this->call(DetalleTipoPersonaSeeder::class);
        
        $this->call(RolSeeder::class);
        $this->call(UserSeeder::class);

        $this->call(TipoTerceroSeeder::class);
        $this->call(TerceroSeeder::class);

        $this->call(TipoSesionSeeder::class);
        $this->call(TipoResolucionSeeder::class);

        $this->call(ResolucionSeeder::class);

        $this->call(MiembrosResolucionSeeder::class);
        $this->call(ExternosResolucionSeeder::class);
        
    }
}
