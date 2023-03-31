import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import DataTableResolucion from '@/Components/DataTable/DataTableResolucion';
import DataTablePlantilla from '@/Components/DataTable/DataTablePlantilla';

export default function Index({auth,plantillas, tipo_resolucion}) {

    //console.log(plantillas)

    return (
        <Navbar auth={auth}>
            <Head title='Plantilla Resolución'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Plantillas'} icono={faFileCirclePlus}/>
                <Link
                    href={route('r.plantillas.registrar')}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Nuevo
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTablePlantilla datos={plantillas} resolucion={tipo_resolucion}/>
            </div>
            
        </Navbar>
    ); 
}