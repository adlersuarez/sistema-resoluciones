import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa8, faAdd, faCheck, faCircleCheck, faCircleXmark, faEye, faEyedropper, faEyeSlash, faFile, faFileArchive, faFileCircleCheck, faFileCircleXmark, faFileDownload, faFileEdit, faFilePdf, faFilePrescription, faFileUpload, faFileWord, faLaptopFile, faLock, faMarker, faPencilRuler, faUnlockKeyhole, faXmark} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { Link } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import SpanEstadoSolicitud from '../Span/SpanEstadoSolicitud';


//import { Popup } from 'unc-react-creator';

const List_Solicitud = ({soli}) => {
    const aceptar_solicitud = (e) => {
        
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Aceptará la solicitud",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => { 
            if (result.isConfirmed) {
              Swal.fire(
                'Cambios realizados correctamente!',
                '',
                'success'
              )
              Inertia.post(route('d.solicituds.aceptar_solicitud',soli.id_solicitud))
            }
          })
          
    }
    const rechazar_solicitud = (e) => {
        
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Rechazará la solicitud",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => { 
            if (result.isConfirmed) {
              Swal.fire(
                'Cambios realizados correctamente!',
                '',
                'success'
              )
              Inertia.get(route('d.solicituds.rechazar_solicitud',soli.id_solicitud))
            }
        })
    }

    const generar_constancia = (e) => {
    }

    const validar_constancia = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Validará la constancia",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => { 
            if (result.isConfirmed) {
              Swal.fire(
                'Cambios realizados correctamente!',
                '',
                'success'
              )
              Inertia.post(route('d.solicituds.validar_constancia',soli.id_solicitud))
            }
          })
    }
    
    const rechazar_constancia = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted Rechazará la constancia",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
          }).then((result) => { 
            if (result.isConfirmed) {
              Swal.fire(
                'Cambios realizados correctamente!',
                '',
                'success'
              )
              Inertia.get(route('d.solicituds.rechazar_constancia',soli.id_solicitud))
            }
        })
    }

    //var link_documento = "javascript:window.open('/tramite-documentario/inicio/"+soli.id_solicitud+"','mywindowtitle','width=500, height=750')";

    //console.log(soli.id_detalleSolicitudNA)

    const mostrar_pdf = (e) => {
        Swal.fire({
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/constancia/no-adeudo/${soli.c_constanciaNA}' className='max-w-xs' alt='Boucher' width='542px' height='700px' /></div>`,
        })    
    }
    
    return (
    
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
                    {dayjs(soli.d_fechaSolicitud).format('DD-MM-YYYY')}
                </div>
            </td>
            
            <td className="py-4 px-3 md:px-4 text-center">
            
                {
                    soli.c_archivoFut != "" ?
                    <>
                    {/* <a href={link_documento}> <b>Visualizar</b> </a> */}
                    <a
                    href={route('d.solicituds.ver',soli.id_solicitud)}
                    className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white mx-3"
                    target="_blank"
                    >
                    <FontAwesomeIcon className="h-5 w-8 mx-auto"  icon={faFilePdf}/> 
                    </a>
                    </>
                    
                    :
                    
                    <div className="justify-center w-8/12 bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                    <FontAwesomeIcon className="h-5 w-8"  icon={faXmark}/> 
                    </div>
                }
                
            </td>

            <td className="py-4 px-1 md:px-6 ">
                <div className='flex flex-col text-center'>     
                    <SpanEstadoSolicitud 
                        estado = {soli.id_estadoSolicitud}
                    />
                </div>
            </td>

            <td className="py-4 px-3 md:px-4 text-center">
                {
                    soli.id_estadoSolicitud != '2' &&

                    <Link onClick={aceptar_solicitud} className="font-medium text-green-500">           
                        <div className='justify-center bg-green-100 px-2 py-2 rounded-md hover:bg-green-700 hover:text-white  mx-3'>
                        <FontAwesomeIcon className="h-5 w-8"  icon={faCircleCheck}  /> 
                        </div>
                    </Link>  
                }

                {
                    soli.id_estadoSolicitud != '3' &&
                
                    <Link onClick={rechazar_solicitud}  className="font-medium text-red-500">             
                        <div className='justify-center bg-red-100 px-2 py-2 rounded-md hover:bg-red-700 hover:text-white mx-3'>
                        <FontAwesomeIcon className="h-5 w-8 "  icon={faCircleXmark}/> 
                        </div>
                    </Link>
                } 

            
            </td>

            <td className="py-4 px-2 md:px-4 text-center">

                <div className='font-medium text-blue-500 pt-2'>
                    <Link
                        tabIndex="1"
                        className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2.5 rounded-md hover:bg-blue-700 hover:text-white"
                        href={route("d.solicituds.show",`${soli.id_solicitud}`)}
                        ><FontAwesomeIcon className="h-4 w-5 mx-3"  icon={faEye} />
                    </Link>
                </div>   
                
                
            </td>

            <td className="py-4 px-2 md:px-4 text-center">

            {   //soli.id_estadoSolicitud =='4' ?
                    (soli.b_estadoDetalleNA == '0' && soli.id_estadoSolicitud =='4') ?
                    
                    <Link onClick={validar_constancia} className="font-medium text-green-500">           
                        <div className='justify-center bg-green-100 px-2 py-2 rounded-md hover:bg-green-700 hover:text-white mx-3'>
                        <FontAwesomeIcon className="h-5 w-8"  icon={faFileCircleCheck}  /> 
                        </div>
                    </Link>
                   
                    :
                    
                    <>  { 
                            (soli.b_estadoDetalleNA =='1' && soli.id_estadoSolicitud =='2') ?
                            
                            
                            <div className='bg-[#d3f2ea] rounded-md'>
                                <span className='text-[#33d1ab] font-bold '> Constancia Validada </span>
                            </div> 
                            
                            :
                            
                            <div className="justify-center w-8/12 bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                                <FontAwesomeIcon className="h-5 w-8 mx-auto"  icon={faLock}/> 
                            </div>
                            
                    }   </>
                    
            }

            </td>
            <td className="py-4 px-2 md:px-4 text-center">
                
            {/*
                 (soli.b_estadoDetalleNA =='1' && soli.id_estadoSolicitud =='2') ?
                        <a
                            className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2.5 rounded-md hover:bg-blue-700 hover:text-white"
                            href={route("d.solicituds.wordExport",`${soli.id_solicitud}`)}
                            target="_blank">
                            <FontAwesomeIcon className="h-5 w-8 mx-2"icon={faFileDownload}/> 
                        </a>

                        :
                        
                            <div className="justify-center w-8/12 bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                            <FontAwesomeIcon className="h-5 w-8 mx-auto"  icon={faLock}/> 
                            </div>       
            */}

            
            {
                 (soli.b_estadoDetalleNA =='1' && soli.id_estadoSolicitud =='2') ?
                        
                        <>
                            {   soli.c_constanciaNA == "" ?
                                <Link href={route("d.solicituds.generarConstanciaPDF",`${soli.id_detalleSolicitudNA}`)} className="font-medium text-blue-500">           
                                    <div className='justify-center bg-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white mx-3'>
                                        <FontAwesomeIcon className="h-5 w-8"  icon={faFileDownload}  />
                                        <b>Generar</b>
                                    </div>
                                </Link>
                                
                                :
                                <Link onClick={mostrar_pdf}>
                                    <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                        <embed src={`/documentos/constancia/no-adeudo/${soli.c_constanciaNA}`} className="max-w-xs" alt="Boucher" style={{width:'110px', height:'140px'}} />
                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                            <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                                        </div>
                                    </div>
                                </Link>
                            }
                            
                        </>

                        :
                        
                        <div className="justify-center w-8/12 bg-red-100 mx-auto px-2 py-2 rounded-md font-medium text-red-500" target="_blank">
                            <FontAwesomeIcon className="h-5 w-8 mx-auto" icon={faLock}/> 
                        </div>       
            }
                
            </td>
        </tr>
    ) 
}

export default List_Solicitud