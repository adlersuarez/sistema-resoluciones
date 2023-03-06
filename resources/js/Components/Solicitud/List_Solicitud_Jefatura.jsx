import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faEye, faFileCircleQuestion, faFileDownload, faLock, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import FormatoTiempo from '../Formato/FormatoTiempo';

import { router } from '@inertiajs/react';

const List_Solicitud_Jefatura = ({soli}) => {

    const generar_barcode = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Generara un Barcode",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => { 
            if (result.isConfirmed) {
              
                Inertia.post(route('d.solicitud.jefatura.generar_barcode',soli.id_detalleSolicitudNA))
              
                Swal.fire({
                    title: 'Código de Barras generado exitosamente!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                })

            }
        })
    }

    var codigoletras;

    if(soli.c_codigoBarras != null){
        codigoletras = soli.c_codigoBarras.slice(0,-4);
        //console.log(codigoletras)
    }
    
    const mostrar_pdf = (e) => {
        Swal.fire({
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/constancia/no-adeudo/${soli.c_constanciaNA}' className='max-w-xs' alt='Boucher' width='542px' height='700px' /></div>`,
        })    
    }

    const generar_constancia = (e) => {
        
        localStorage.setItem("gConst","generarConstancia")

        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Generara la constancia de No adeudo del estudiante",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => { 
            if (result.isConfirmed) {
              
                Inertia.get(route("d.solicituds.jefatura.generarConstanciaPDF",`${soli.id_detalleSolicitudNA}`))

                router.on('start', () => {
                        
                })
                    
                Swal.fire({
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    html: "<b><p style='color:#152d95; font-size: 25px'>Generando constancia de No Adeudo y enviando mensaje con el archivo al estudiante<p></b>",
                    showConfirmButton: false,
                    backdrop: `
                        rgba(0, 133, 255, 0.24)
                        `,
                    didOpen: () => {
                        Swal.showLoading()
                        },
                    })
                    
                router.on('finish', () => {
                    if("generarConstancia"==localStorage.getItem("gConst")){
                        Swal.fire({
                            title: 'Constancia de No Adeudo Generada exitosamente!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                    }
                    localStorage.removeItem('gConst');
                })
            }
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

            <td className="py-4 px-2 md:px-4 text-center">
                <div className='font-medium text-blue-500 pt-2'>
                    <Link
                        tabIndex="1"
                        className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2.5 rounded-md hover:bg-blue-700 hover:text-white"
                        href={route("d.solicituds.show",`${soli.id_solicitud}`)} >
                        <FontAwesomeIcon className="h-5 w-6 mx-3"  icon={faFileCircleQuestion} />
                    </Link>
                </div>   
            </td>

            <td className="py-4 px-2 md:px-4 text-center">
                
                {
                    soli.b_estadoPagos != 0 ?
                    <>
                    {   
                        soli.c_codigoBarras != null ?
                        
                        <div className='flex flex-col mx-auto justify-center'>
                            <img src={`/documentos/constancia/code-barras/${soli.c_codigoBarras}`} className="max-w-xs" alt="Boucher" style={{width:'100%', height:'50px'}} />
                            <p className='font-bold'>{codigoletras}</p>
                        </div>

                        :
                        
                        <Link onClick={generar_barcode} className="font-medium text-blue-500">           
                            <div className='justify-center bg-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white mx-3'>
                                <FontAwesomeIcon className="h-5 w-8"  icon={faBarcode}  />
                                <b>Generar</b>
                            </div>
                        </Link>
                    }
                    </>
                    :
                    <div className="flex flex-col w-[150px] bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                            <FontAwesomeIcon className="h-5 w-8 mx-auto" icon={faLock}/>
                            <strong>Requiere validación</strong>  
                    </div>  
                }
                    
            </td>
            
            <td className="py-4 px-2 md:px-4 text-center">
                <div className='flex m-auto justify-center'>
                {
                    (soli.b_estadoDetalleNA =='1' && soli.id_estadoSolicitud =='2') ?
                        
                        <>
                            {   soli.c_constanciaNA == null ?
                                <>
                                    {
                                        soli.c_codigoBarras != null ?
                                            <Link onClick={generar_constancia} className="font-medium text-blue-500">           
                                                <div className='justify-center bg-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white mx-3'>
                                                    <FontAwesomeIcon className="h-5 w-8" icon={faFileDownload}  />
                                                    <b>Generar</b>
                                                </div>
                                            </Link>
                                        :

                                        <div className="flex flex-col w-[150px] bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                                            <FontAwesomeIcon className="h-5 w-8 mx-auto" icon={faLock}/>
                                            <strong>Requiere Código de Barras</strong> 
                                        </div>        
                                    }
                                    
                                </>
                                
                                :
                                <Link onClick={mostrar_pdf}>
                                    <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                        <embed src={`/documentos/constancia/no-adeudo/${soli.c_constanciaNA}`} className="max-w-xs" alt="Boucher" style={{width:'110px', height:'140px'}} />
                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-[110px] h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                            <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                                        </div>
                                    </div>
                                </Link>
                            }
                            
                        </>

                        :
                        
                        <div className="flex flex-col w-[150px] bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                            <FontAwesomeIcon className="h-5 w-8 mx-auto" icon={faLock}/>
                            <strong>Requiere validación</strong> 
                        </div>       
                }
                </div> 
            </td>
        </tr>
        </>
    ) 
}

export default List_Solicitud_Jefatura