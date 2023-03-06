import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileCircleQuestion, faFilterCircleXmark, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import SpanTiempoSolicitud from '../Span/SpanTiempoSolicitud';
import SpanEstadoSolicitud from '../Span/SpanEstadoSolicitud';
import FormatoTiempo from '../Formato/FormatoTiempo';
import SpanTiempoPendiente from '../Span/SpanTiempoPendiente';

const List_Solicitud_Secretaria = ({soli}) => {

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
                <div className='flex flex-col'>     
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

            <td className="py-4 px-1 md:px-4 ">
                <div className='flex flex-col text-center'>     
                    <SpanTiempoPendiente
                        fecha = {soli.d_fechaSolicitud}
                    /> 
                </div>
            </td>
            
            <td className="py-4 px-3 md:px-4 text-center">
                <div className='font-medium text-blue-500 pt-2'>
                    <Link
                        tabIndex="1"
                        className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2.5 rounded-md hover:bg-blue-700 hover:text-white"
                        href={route("d.solicituds.secretaria.show",`${soli.id_solicitud}`)}
                        ><FontAwesomeIcon className="h-4 w-5 mx-3"  icon={faFileCircleQuestion} />
                    </Link>
                </div>
            </td>

            <td className="py-4 px-1 md:px-4 ">
                <div className='flex flex-col text-center'>     
                    <SpanEstadoSolicitud 
                        estado = {soli.id_estadoSolicitud}
                    />
                </div>
            </td>
        </tr>
    </>  
    ) 
}

export default List_Solicitud_Secretaria