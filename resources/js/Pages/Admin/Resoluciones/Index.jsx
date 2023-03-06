import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import DataTableResolucion from '@/Components/DataTable/DataTableResolucion';

export default function Index({resoluciones,auth}) {

    return (
        <Navbar auth={auth}>
            <Head title='Admin'/>
            <div className='flex flex-col mt-10'>

                <TitlePages texto={'Resoluciones'} icono={faFileWord}/>

            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
                <DataTableResolucion />
            </div>
            
        </Navbar>
    ); 
}