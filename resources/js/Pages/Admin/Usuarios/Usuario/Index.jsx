import React, { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import List_Usuario from '@/Components/Usuario/List_Usuario';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel,faPlusCircle} from '@fortawesome/free-solid-svg-icons';

export default function Index({usua,auth}) {
    const [query,setQuery]= useState('');
    const search = (e) => {
        Inertia.get(route(route().current()),
            {search : query},
            {
                preserveState: true,
                replace: true,
            })     
    }

    return (
        <Navbar auth={auth}>
            <Head title='Usuarios'/>
            <div className='flex flex-col my-3'>
                <div className='flex items-center gap-2 md:gap-8'>
                    <span className='text-slate-500 text-3xl'>Usuarios</span>
                    <div className='inline-flex my-2 place-items-center'>
                    <Link
                        className="flex px-6 py-2 text-green-500 bg-transparent md:bg-green-500 md:text-white rounded-md focus:outline-none gap-4 "
                        href={route("d.usuarios.create")}
                        ><FontAwesomeIcon className={'h-5 w-5'} icon={faPlusCircle}></FontAwesomeIcon> 
                            <label className='hidden md:block'>Nuevo</label>
                    </Link>
                    <Link
                        className="justify-center "
                        href={route("excel")}>
                        <FontAwesomeIcon icon={faFileExcel} className='flex h-5 w-5 text-green-500 hover:scale-110 md:hidden'></FontAwesomeIcon>
                    </Link>
                    </div>
                </div>
                <div className='flex mt-2  items-center justify-between'>
                    <div className='items-center text-slate-500 hidden md:block'>
                        Registros
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className=''>
                            <FontAwesomeIcon icon={faFileExcel} className='h-6 w-9 text-green-500 hover:scale-110 hidden md:block'></FontAwesomeIcon>
                        </button>
                        <label className='text-slate-500 hidden md:block'>Buscar: </label>
                        <input 
                        className='rounded-md py-1 text-slate-500 placeholder:text-gray-300' 
                        type="text"
                        id='search'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={search}
                        placeholder='Digitar Equipo'
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto  relative shadow-md rounded-lg mt-5">
                <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-[#0064bc]">
                        <tr>
                            <th scope="col" className="py-3 px-2 md:px-6" style={{borderRight: '1px solid white'}}>
                                ID
                            </th>
                            <th scope="col" className="py-3 px-2 md:px-6" style={{borderRight: '1px solid white'}}>
                                Nombre
                            </th>
                            <th scope="col" className="py-3 px-2 md:px-6" style={{borderRight: '1px solid white'}}>
                                Rol
                            </th>
                            <th scope="col" className="py-3 px-2 md:px-6" style={{borderRight: '1px solid white'}}>
                                OFicina
                            </th>
                            
                            <th scope="col" className="py-3 px-2 md:px-6" style={{borderRight: '1px solid white'}}>
                                <div className="flex items-center">
                                    Email
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-1 md:px-2">
                                <div className="flex justify-center items-center">
                                Accion
                                </div>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            usua.data.map(usuaa => {
                                return(
                                    <List_Usuario usua={usuaa} key={usuaa.id}/>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
            <Pagination class="mt-2" links={usua.links} />
        </Navbar>
    );
}