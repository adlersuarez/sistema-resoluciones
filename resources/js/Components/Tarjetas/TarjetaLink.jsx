import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';

export default function TarjetaLink({ ruta, icono, formato }) {

    return (
        <Link href={route(ruta)}>
            <div className='w-72 h-40 p-4 bg-[#007CBC] transform transition-all hover:scale-105 duration-300 rounded-lg border-2 text-center text-white text-xl font-bold flex'>
                {//<FontAwesomeIcon className='py-4' icon={icono} fontSize="60px" />
                }
                <h1 className='m-auto'>{formato}</h1>

            </div>
        </Link>
    );
}
