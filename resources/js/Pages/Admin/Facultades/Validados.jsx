import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Pagination from '@/Components/Pagination';
import List_FacultadesValidados from '@/Components/Facultades/List_FacultadesValidados';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import SubtitlePagesCantidad from '@/Components/Titulo/SubtitlePagesCantidad';
import SearchTable from '@/Components/Search/SearchTable';
import FooterTablaNotFound from '@/Components/Tablas/FooterTablaNotFound';

export default function Index({auth,estado_adeudo}) {
    
    return (
        <Navbar auth={auth}>
            <Head title='Facultades'/>
            <div className='flex flex-col mt-10'>

                <TitlePages texto={'Facultades | Validados'} icono={faFileCircleCheck}/>

                <div className='flex mt-2 items-center justify-between'>
                    <SubtitlePagesCantidad cantidad={estado_adeudo.data.length} estado={true}/>
                    <SearchTable />
                </div>

            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
                <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-[#0064bc]">
                        <tr>
                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Código Matricula
                            </th>

                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Estudiante
                            </th>

                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Facultad
                            </th>

                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                    Carrera Profesional
                            </th>

                            <th scope="col" className="text-center py-3 px-1 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Fecha Validación
                            </th>
                            
                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Revisar
                            </th>

                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Estado adeudo
                            </th>
                            {/*
                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                    Constancia
                            </th>
                            */}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {   estado_adeudo.data.length != 0  ?

                            estado_adeudo.data.map(estado => {
                                return( 
                                    <List_FacultadesValidados estado={estado} key={estado.id_pago}/>
                                )
                            })
                            :
                                <FooterTablaNotFound/>
                        }
                          
                    </tbody>
                </table>
            </div>
            
            <Pagination className="mt-2" links={estado_adeudo.links} />
            
        </Navbar>
    ); 
}