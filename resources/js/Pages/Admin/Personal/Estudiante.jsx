import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import DataTablePersonalEstudiante from '@/Components/DataTable/Personal/DataTablePersonalEstudiante';

export default function Docente({ tipoEstudiante, carrera, nivel, seccion, sede,id_carrera, auth }) {

    return (
        <Navbar auth={auth}>
            <Head title='Estudiantes' />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Estudiantes del Sistema'} icono={faUserEdit} />
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTablePersonalEstudiante
                    datos={tipoEstudiante}
                    carrera={carrera}
                    nivel={nivel}
                    seccion={seccion}
                    sede={sede}
                />
            </div>

        </Navbar>
    );
}