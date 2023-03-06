import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import Card_Solicitud from '@/Components/Usuario/Card_Solicitud';
import BotonVolver from '@/Components/Botones/BotonVolver';
import NavbarUser from '@/Layouts/NavbarUser';

export default function Mostrar({solicitudes,auth}) {//Index
    
    return (
        <NavbarUser auth={auth}>
            <Head title='Solicitud'/>
            <div className="bg-slate-100 flex items-center justify-between py-2 mt-10">
                <BotonVolver ruta={'user'}/>
                <Pagination className="mt-2" links={solicitudes.links} />
            </div>

            <div className="bg-slate-100 flex-wrap w-full flex justify-center item-center mt-6" >
                {
                    solicitudes.data.map((solicitud,soli_key)=>
                        <Card_Solicitud key={soli_key} solicitud={solicitud}></Card_Solicitud>
                        )
                }
            </div>

            <div className='py-5 w-full'> </div>

        </NavbarUser>
    );
}
