import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';

import FormatoTiempo from '../Formato/FormatoTiempo';
import SpanEstadoDeudaTabla from '../Span/SpanEstadoDeudaTabla';

const List_FacultadesValidados = ({estado}) => {

    return (
    
        <tr className="bg-white border-b">
            <td className="text-center py-4 px-4 md:px-6">
                <div className='flex flex-col text-center'>
                    <strong>{estado.c_codMatricula}</strong>
                </div>
            </td>

            <td className="py-4 px-4 md:px-6 ">
                {estado.c_nombres+" "+estado.c_apellidoP+" "+estado.c_apellidoM}
            </td>

            <td className="py-4 px-1 md:px-6 ">
                {estado.c_nomFacultad}
            </td>

            <td className="py-4 px-1 md:px-6 ">
                {estado.c_nomCarreraProf}
            </td>
            
            <td className="py-4 px-2 md:px-4 text-center">
                <FormatoTiempo
                    fecha={estado.d_fechaValidacionNA_Fac}
                />
            </td>

            <td className="py-4 px-2 md:px-4 text-center">

                <div className='font-medium text-blue-500 pt-2'>
                    <Link
                        tabIndex="1"
                        className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2.5 rounded-md hover:bg-blue-700 hover:text-white"
                        href={route("d.facultades.mostrar",`${estado.id_pagoFac}`)}>
                        <FontAwesomeIcon className="h-4 w-5 mx-3" icon={faSearch} />
                    </Link>
                </div>   
            
            </td>
            
            <td className="py-4 px-3 md:px-4 text-center">
                <div className='flex flex-col text-center'> 
                    <SpanEstadoDeudaTabla
                        estado={estado.b_estadoFac}
                    />
                </div>
            </td>

        </tr>
    ) 
}

export default List_FacultadesValidados