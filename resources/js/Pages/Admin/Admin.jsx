import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function Admin({auth}) {


    const descargar_reporte = (e) => {

        Swal.fire({
            icon: 'success',
            title: '¡Su reporte ha sido generado exitosamente!',
            showConfirmButton: false,
            timer: 2000
        })
    }

    return (
        <Navbar auth={auth} >
            <Head title='Admin'/>

            <div className='flex flex-col mt-10 mb-5 text-center gap-4 text-[#73879C]'>
                <h1 className='font-montserrat text-4xl'>
                    SISTEMA DE RESOLUCIÓN
                </h1>
                <h2 className='text-4xl'>UPLA-2022</h2>   
            </div>
            <div className='font-play text-4xl text-[#07158F] '>
                RECTORADO
            </div>
            <hr className='my-4'/>
            <div className='flex bg-white p-4 h-[590px]'>
                <img src="images/fondoPantalla/universidad.jpg" alt="" className='w-full object-cover' />
            </div>
            
        </Navbar>
    );
}