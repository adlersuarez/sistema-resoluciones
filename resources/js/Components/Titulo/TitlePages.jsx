import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function TitlePages({texto,icono}) {

    return (
        <div className='flex items-center justify-left text-slate-500'>
            <span className=' text-3xl font-bold font-play'>{texto.toUpperCase()}</span>
            <FontAwesomeIcon className="h-8 ml-4" icon={icono} />
        </div>
    );
}