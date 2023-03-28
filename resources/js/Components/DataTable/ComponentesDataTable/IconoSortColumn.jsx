import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function IconoSortColumn() {

    return (
        <div className='h-4 w-4 flex mx-2 text-slate-400'>
            <FontAwesomeIcon className='!h-3' icon={faArrowDown} />
        </div>
    );
}