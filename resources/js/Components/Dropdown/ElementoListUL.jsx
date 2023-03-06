import React from 'react'
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

export default function ElementoListUL({lista}) {
    
    return (
        <>
        {
            lista.map(elemento_lista => {
                
                var ruta

                if(elemento_lista.subruta == undefined){
                    ruta = route(elemento_lista.ruta)
                }else{
                    ruta = route(elemento_lista.ruta,elemento_lista.subruta)
                }

                return( 
                    <li key={elemento_lista.id}>
                        <Link
                            href={ruta}
                            className="flex items-center p-2 pl-5 w-full text-sm font-normal rounded-lg hover:text-blue-800 hover:bg-blue-100 transition duration-300 ease-in-out text-slate-500">
                                <FontAwesomeIcon className="pr-3" icon={faTag} />
                                <strong>{elemento_lista.nombre}</strong>
                        </Link>
                    </li>
                )
            })
        }
        </>
        
    );
}