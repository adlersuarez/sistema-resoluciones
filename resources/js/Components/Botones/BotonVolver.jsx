import React from 'react'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';

export default function BotonVolver({ruta}) {

    return (
        <div className="flex items-center justify-between mb-6">
            <Link className="pr-5 pl-3 py-2 text-white bg-[#007CBC] rounded-md focus:outline-none hover:bg-[#0064bc]"
                href={route(ruta)}>
                <FontAwesomeIcon className="h-4 w-5 mr-3" icon={faArrowAltCircleLeft} />
                <strong>Volver</strong>
            </Link>
        </div>
    );
}