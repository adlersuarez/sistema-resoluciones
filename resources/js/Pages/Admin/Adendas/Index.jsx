import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

export default function Index({auth}) {

    return (
        <Navbar auth={auth}>
            <Head title='Adendas'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Adendas'} icono={faToggleOn}/>
                <Link
                    href="#"
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registrar
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                {//<DataTableResolucion datos={resoluciones} miembros={miembros}/>
                }
            </div>
            
        </Navbar>
    ); 
}