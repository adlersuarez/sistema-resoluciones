import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';

export default function UserTarjetaLink({ ruta, icono, tramite }) {

    return (
        <Link href={route(ruta)}>
            <div className='w-72 p-2 bg-[#007CBC] transform transition-all hover:scale-105 duration-300 rounded-lg border-2 text-center text-white text-xl font-bold border-[#0064bc]'>

                <FontAwesomeIcon className='py-4 text-white' icon={icono} fontSize="60px" /><br />
                {tramite}

            </div>
        </Link>
    );
}
