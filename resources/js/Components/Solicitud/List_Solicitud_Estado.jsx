import React from 'react';
import SpanTiempoSolicitud from '../Span/SpanTiempoSolicitud';
import SpanEstadoSolicitud from '../Span/SpanEstadoSolicitud';
import FormatoTiempo from '../Formato/FormatoTiempo';
import { Link } from '@inertiajs/inertia-react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import SpanEstadoDocumento from '../Span/SpanEstadoDocumento';
import DiferenciaTiempo from '../Formato/DiferenciaTiempo';
import SpanTiempoPendiente from '../Span/SpanTiempoPendiente';

const List_Solicitud_Estado = ({soli,estado}) => {

    const mostrar_pdf = (e) => {
        Swal.fire({
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/constancia/no-adeudo/${soli.c_constanciaNA}' className='max-w-xs' alt='Boucher' width='542px' height='700px' /></div>`,
        })    
    }

    return (
    <>
        <tr className="bg-white border-b">
            <td className="py-4 px-4 md:px-6">
                <div className='flex flex-col text-center'>
                    <strong>{soli.c_codMatricula}</strong>
                </div>
            </td>
            <td className="py-4 px-4 md:px-6 ">
                <div className='flex flex-col'>
                    {soli.c_nombres+" "+soli.c_apellidoP+" "+soli.c_apellidoM}
                </div>
            </td>

            <td className="py-4 px-1 md:px-6 ">
                <div className='flex flex-col text-center'>     
                    {soli.c_nomFacultad}
                </div>
            </td>

            <td className="py-4 px-1 md:px-6 ">
                <div className='flex flex-col text-center'>     
                    {soli.c_nomCarreraProf}
                </div>
            </td>
            
            <td className="py-4 px-2 md:px-4 text-center">
                <div className='flex flex-col text-center'>
                    <FormatoTiempo  
                        fecha={soli.d_fechaSolicitud}
                    />
                </div>
            </td>
            {/*
            <td className="py-4 px-1 md:px-4 ">
                <div className='flex flex-col text-center'>     
                    <SpanTiempoSolicitud
                        fechaSolicitud = {soli.d_fechaSolicitud}
                    />
                        
                </div>
            </td>
            */}

            {   estado == 1 ?
                <td className="py-4 px-2 md:px-4 text-center">
                    <div className='flex flex-col text-center'>     
                        <SpanTiempoPendiente
                            fecha = {soli.d_fechaSolicitud}
                        />  
                    </div>
                </td>
                :
                <>
                { estado == 2 ?
                    <>
                        <td className="py-4 px-2 md:px-4 text-center">
                            <div className='flex flex-col text-center'>    
                                <FormatoTiempo  
                                    fecha={soli.d_fechaCreacion}
                                />
                            </div>
                        </td>
                        <td className="py-4 px-2 md:px-4 text-center">
                            <div className='flex flex-col text-center'>    
                                <DiferenciaTiempo
                                    fechaSolicitud = {soli.d_fechaSolicitud}
                                    fechaAprobacion = {soli.d_fechaCreacion}
                                />
                            </div>
                        </td>
                    </>
                    :
                    <>
                        { estado == 4 &&
                        <>
                            <td className="py-4 px-2 md:px-4 text-center">
                                <div className='flex flex-col text-center'>     
                                    <SpanTiempoSolicitud
                                        fechaSolicitud = {soli.d_fechaSolicitud}
                                    />  
                                </div>
                            </td>
                        </>
                        }
                    </>
                    }
                </>
            }
            

            <td className="py-4 px-1 md:px-4 ">
                <div className='flex flex-col text-center'>     
                    <SpanEstadoSolicitud 
                        estado={soli.id_estadoSolicitud}
                    />
                </div>
            </td>

            { 
                (estado == 1 || estado == 2) ?
                <>
                    {
                        (estado == 2 && soli.c_constanciaNA != null)?
                        <td className="py-4 px-3 md:px-4 text-center">
                            <Link onClick={mostrar_pdf}>
                                <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                    <embed src={`/documentos/constancia/no-adeudo/${soli.c_constanciaNA}`} className="max-w-xs" alt="Boucher" style={{width:'110px', height:'140px'}} />
                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-[110px] h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                        <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                                    </div>
                                </div>
                            </Link>
                        </td>

                        :
                        <>
                        {   
                            estado != 1 &&
                            
                            <td className="py-4 px-3 md:px-4 text-center">
                                <SpanEstadoDocumento 
                                    texto={"Pendiente"}
                                />
                            </td>
                        }
                        </>

                    }
                </>
                :
                <td className="py-4 px-3 md:px-4 text-center">
                    <div className='font-medium pt-2'>
                        {soli.c_comentarioSolicitud}
                    </div>
                </td>
            }
            
        </tr>
    </>
      
    ) 
}

export default List_Solicitud_Estado