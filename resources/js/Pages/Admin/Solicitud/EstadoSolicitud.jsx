import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import List_Solicitud_Estado from '@/Components/Solicitud/List_Solicitud_Estado';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import FooterTablaNotFound from '@/Components/Tablas/FooterTablaNotFound';
import SubtitlePagesCantidad from '@/Components/Titulo/SubtitlePagesCantidad';
import SearchTable from '@/Components/Search/SearchTable';

export default function Index({solis,auth, nombres,num,path}) {

    return (
        <Navbar auth={auth}>
            <Head title='Solicitudes'/>
            <div className='flex flex-col mt-10'>

                <TitlePages texto={`Solicitudes - ${nombres[num]}`} icono={faFileAlt}/>

                <div className='flex mt-2  items-center justify-between'>
                    <SubtitlePagesCantidad cantidad={auth.cantidad_secretaria} tipo={num} valores = {auth.cantidad_estado}/>
                    <SearchTable path={path[num]}/>
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
                                    Fecha Solicitud
                            </th>
                            
                            {   num == 1 ?
                                    <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                        Tiempo pendiente
                                    </th>
                                :
                                <>
                                    { num == 2 ?
                                        <>
                                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                                Fecha Aprobación
                                            </th>
                                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                                tiempo Requerido
                                            </th>
                                        </>
                                    :
                                    <>
                                        { num == 4 &&
                                        <>
                                        <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                            Tiempo en proceso
                                        </th>
                                        </>
                                        }
                                    </>
                                    }
                                </>
                            }
                            
                            <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Estado Solicitud
                            </th>
                            
                            { 
                                (num == 1 || num == 2) ?
                                <>
                                    {
                                        num == 2 &&
                                        <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                            <div className="flex justify-center items-center">
                                            Constancia No Adeudo
                                            </div>
                                        </th>
                                    }
                                </>
                                :
                                <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    <div className="flex justify-center items-center">
                                    Comentarios
                                    </div>
                                </th>
                            }
                            
                        </tr>
                    </thead>

                    <tbody>
                        {   solis.data.length != 0 ?
                        
                            solis.data.map(soli => {
                                return(    
                                    <List_Solicitud_Estado soli={soli} key={soli.id_solicitud} estado={num}/>
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