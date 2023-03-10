import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import DataTableResolucion from '@/Components/DataTable/DataTableResolucion';

export default function Index({resoluciones,auth}) {

    //console.log(resoluciones)

    return (
        <Navbar auth={auth}>
            <Head title='Resoluciones'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Resoluciones'} icono={faFileWord}/>
                <Link
                    href={route('r.resoluciones.registrar')}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registrar
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTableResolucion datos={resoluciones}/>
            </div>
            
        </Navbar>
    ); 
}