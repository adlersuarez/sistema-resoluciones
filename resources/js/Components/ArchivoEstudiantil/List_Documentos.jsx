import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import Swal from 'sweetalert2';
import SpanEstadoDeuda from '../Span/SpanEstadoDeuda';

const List_Documentos = ({documento,archivo}) => {

    var link = documento.doc;

    var archivoMostrado = '';

    switch (link) {
        case 'a_partidaNacimiento'://3
            archivoMostrado = archivo.a_partidaNacimiento;
            break;

        case 'a_copiaDNI'://4
            archivoMostrado = archivo.a_copiaDNI;
            break;

        case 'a_certificadoEstudioSecReg'://5
            archivoMostrado = archivo.a_certificadoEstudioSecReg;
            break;

        case 'a_certificadoEstudioSecRegAlt'://6
            archivoMostrado = archivo.a_certificadoEstudioSecRegAlt;
            break;

        case 'a_certificadoEstudioUni'://7
            archivoMostrado = archivo.a_certificadoEstudioUni;
            break;

        case 'a_copiaLegalTituloBach'://8
            archivoMostrado = archivo.a_copiaLegalTituloBach;
            break;

        case 'a_certificadoEstudioExterno'://9
            archivoMostrado = archivo.a_certificadoEstudioExterno;
            break;

        case 'a_constanciaConductaExterno'://10
            archivoMostrado = archivo.a_constanciaConductaExterno;
            break;

        case 'a_certificadoEstudioInterno'://11
            archivoMostrado = archivo.a_certificadoEstudioInterno;
            break;

        case 'a_constanciaConductaInterno'://12
            archivoMostrado = archivo.a_constanciaConductaInterno;
            break;
    
        case 'a_constanciaPrimerosPuestos'://13
            archivoMostrado = archivo.a_constanciaPrimerosPuestos;
            break;

        case 'a_curriculoDeportivo'://14
            archivoMostrado = archivo.a_curriculoDeportivo;
            break;

        case 'a_constanciaDeportistaDestacado'://15
            archivoMostrado = archivo.a_constanciaDeportistaDestacado;
            break;

        case 'a_informeOriginalFPD'://16
            archivoMostrado = archivo.a_informeOriginalFPD;
            break;

        case 'a_carnetRegistroCONADIS'://17
            archivoMostrado = archivo.a_carnetRegistroCONADIS;
            break;

        case 'a_certificadoEstudioInst'://18
            archivoMostrado = archivo.a_certificadoEstudioInst;
            break;

        case 'a_copiaLegalTituloEgreInst'://19
            archivoMostrado = archivo.a_copiaLegalTituloEgreInst;
            break;

        case 'a_curriculoVitaeDescriptivo'://20
            archivoMostrado = archivo.a_curriculoVitaeDescriptivo;
            break;

        case 'a_certificadoEstudioEscuelaOficiales'://21
            archivoMostrado = archivo.a_certificadoEstudioEscuelaOficiales;
            break;

        case 'a_certificadoAcreditacionGradoOficial'://22
            archivoMostrado = archivo.a_certificadoAcreditacionGradoOficial;
            break;

        case 'a_certificadoEstudioEscuelaSuboficiales'://23
            archivoMostrado = archivo.a_certificadoEstudioEscuelaSuboficiales;
            break;
        
        case 'a_constanciaLegalizadaTituloEgreEscSub'://24
            archivoMostrado = archivo.a_constanciaLegalizadaTituloEgreEscSub;
            break;
    
        default:
            break;
    }

    const mostrar_imagen = (e) => {
        Swal.fire({
            title: `${documento.descripcion}`,
            text: ``,
            imageUrl: `/documentos/estudiante/${archivoMostrado}`,
            imageWidth: 500,
            imageHeight: 600,
            imageAlt: 'Boucher',
        })    
    }

    const mostrar_pdf = (e) => {
        Swal.fire({
            title: `${documento.descripcion}`,
            text: ``,
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/estudiante/${archivoMostrado}' className='max-w-xs' alt='Boucher' width='542px' height='700px' /></div>`,

        })    
    }

    return (
    
        <tr className="bg-white border-b">
            <td className="text-left py-4 px-4 md:px-6 text-lg ">
                <strong>{documento.descripcion}</strong>
            </td>

            <td className="py-4 px-20 md:px-6 mx-auto justify-center ">
                <div className='flex m-auto justify-center'>
                {/*archivoMostrado*/}
                {   archivoMostrado != null ?

                    <Link onClick={mostrar_pdf}>
                        <div className="relative overflow-hidden bg-no-repeat bg-cover w-[80px]">
                            <embed src={`/documentos/estudiante/${archivoMostrado}`} className="" alt="Boucher" style={{width:'100%', height:'100px'}} />

                            <div className="absolute top-0 right-0 bottom-0 left-0 w-[80px] h-[100px] overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                            </div>
                        </div>
                    </Link>
                    
                    :
                    <div className='flex flex-col text-center p-10'>
                        <SpanEstadoDeuda
                            estado = {0}
                        />
                    </div>    
                }
                </div>
            </td>
            {/*
            <td className="py-4 px-1 md:px-6 ">
                <form>

                </form>
            </td>

            <td className="py-4 px-1 md:px-6 ">
                boton
            </td>
            */}
            
        </tr>
    ) 
}

export default List_Documentos