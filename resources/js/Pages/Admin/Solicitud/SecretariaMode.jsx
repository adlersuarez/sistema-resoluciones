import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import List_Solicitud_Secretaria from '@/Components/Solicitud/List_Solicitud_Secretaria';
import TitlePages from '@/Components/Titulo/TitlePages';
import SubtitlePagesCantidad from '@/Components/Titulo/SubtitlePagesCantidad';
import FooterTablaNotFound from '@/Components/Tablas/FooterTablaNotFound';
import SearchTable from '@/Components/Search/SearchTable';
import { faFileCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Index({solis,auth}) {

    return (
        <Navbar auth={auth}>
            <Head title='Secretaría ORyM'/>
            <div className='flex flex-col mt-10'>

                <TitlePages texto={'Secretaría | Solicitudes'} icono={faFileCircleExclamation}/>

                <div className='flex mt-2 items-center justify-between '>
                    <SubtitlePagesCantidad cantidad={auth.cantidad_secretaria}/>
                    <SearchTable/>
                </div>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
                <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-center text-white uppercase bg-[#0064bc]">
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
                                    Fecha
                            </th>

                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Tiempo
                            </th>
                            
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                <div className="flex justify-center items-center">
                                    Validar FUT
                                </div>
                            </th>
                            
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Estado Solicitud
                            </th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {   solis.data.length != 0 ?

                            solis.data.map(soli => {
                                return(    
                                    <List_Solicitud_Secretaria soli={soli} key={soli.id_solicitud}/>
                                )
                            })
                            :
                                <FooterTablaNotFound/>
                        }
                          
                    </tbody>
                </table>
            </div>
            
            <Pagination className="mt-2" links={solis.links} />
        </Navbar>
    ); 
}