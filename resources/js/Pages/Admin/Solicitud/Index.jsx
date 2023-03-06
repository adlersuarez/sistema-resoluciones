import React, { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import List_Solicitud from '@/Components/Solicitud/List_Solicitud';
import { Inertia } from '@inertiajs/inertia';

export default function Index({solis,auth}) {
    const [query,setQuery]= useState('');
    const search = (e) => {
        Inertia.get(route(route().current()),
            {search : query},
            {
                preserveState: true,
                replace: true,
            })     
    }
    //console.log(solis.data);
    return (
        <Navbar auth={auth}>
            <Head title='Admin'/>
            <div className='flex flex-col my-3'>
                <div className='flex items-center gap-8 '>
                <span className='text-slate-500 text-3xl'>Solicitudes - Vista General</span>
                <div className='inline my-2'>
                    
                </div>
                </div>
                <div className='flex mt-2  items-center justify-between'>
                    <div className='hidden md:block items-center text-slate-500'>
                        Registros
                    </div>
                    <div className='flex items-center gap-4'>
                        <label className='hidden md:block text-slate-500'>Buscar: </label>
                        <input 
                        className='flex mt-2 rounded-md py-1 text-slate-500 placeholder:text-gray-300 ' 
                        type="text"
                        id='search'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={search}
                        placeholder='Search'
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
                <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-[#0064bc]">
                        <tr>
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Código Matricula
                            </th>
                            <th scope="col" className="py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Nombre
                            </th>
                            <th scope="col" className="py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Facultad
                            </th>
                            <th scope="col" className="py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Carrera Profesional
                            </th>
                            <th scope="col" className="py-3 px-1 md:px-4" style={{borderRight: '1px solid white'}}>
                                <div className="flex items-center">
                                    Fecha
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                                </div>
                              
                            </th>
                            
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                <div className="flex justify-center items-center">
                                FUT
                                </div>
                            </th>
                            
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                Estado Solicitud
                            </th>

                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                Validar Solicitud
                            </th>

                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                Revisar Deudas
                            </th>

                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                Validar Constancia
                            </th>
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                Constancia
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            solis.data.map(soli => {
                                return( 
                                    
                                    <List_Solicitud soli={soli} key={soli.id_solicitud}/>
                                )
                            })

                            
                        }
                          
                    </tbody>
                </table>
            </div>
            
            <Pagination className="mt-2" links={solis.links} />
        </Navbar>
    ); 
}