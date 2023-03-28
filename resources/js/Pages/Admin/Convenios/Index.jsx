import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import DataTableConvenio from '@/Components/DataTable/DataTableConvenio';

export default function Index({auth,convenios}) {

    return (
        <Navbar auth={auth}>
            <Head title='Convenios'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Convenios'} icono={faBinoculars}/>
                <Link
                    href="#"
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registrar
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTableConvenio datos={convenios}/>
            </div>
            
        </Navbar>
    ); 
}