import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, useForm } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Index({usuario,auth}) {

    console.log(usuario)

    const { data, setData, errors, put, progress } = useForm({
        username: usuario.username,
        email: usuario.email,
        c_numTelefono: usuario.c_numTelefono,
        //c_numCelular: usuario.c_numCelular,
        c_email: usuario.c_email,
    });

    return (
        <Navbar auth={auth}>
            <Head title='Cuenta Personal'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Datos Personales'} icono={faUser}/>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                {//<DataTableResolucion datos={resoluciones} miembros={miembros}/>
                }
            </div>
            
        </Navbar>
    ); 
}