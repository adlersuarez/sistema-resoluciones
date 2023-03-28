import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import DataTableContrato from '@/Components/DataTable/DataTableContrato';

export default function Index({auth,contratos}) {

    return (
        <Navbar auth={auth}>
            <Head title='Contratos'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Contratos'} icono={faSuitcase}/>
                <Link
                    href={route('r.contratos.registrar')}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registrar
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTableContrato datos={contratos}/>
            </div>
            
        </Navbar>
    ); 
}