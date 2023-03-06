import React, { useState } from 'react'
import { Inertia } from '@inertiajs/inertia';

export default function SearchTable({path}) {
    
    const [query,setQuery]= useState('');

    const search = (e) => {
        Inertia.get(route(route().current()),
            {search : query},
            {
                preserveState: true,
                replace: true,
            })
    }

    const searchPath = (e) => {
        Inertia.get(route(route().current(),path),
            {search : query},
            {
                preserveState: true,
                replace: true,
            })
    }

    return (
        <div className='flex items-center gap-4'>
            <label className='hidden md:block text-slate-500'>Buscar: </label>
            <input 
                className='flex rounded-md py-1 text-slate-500 placeholder:text-gray-300 ' 
                type="text"
                id='search'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={ path == undefined ? search : searchPath}
                placeholder='Código Estudiante'
            />
        </div>
    );
}