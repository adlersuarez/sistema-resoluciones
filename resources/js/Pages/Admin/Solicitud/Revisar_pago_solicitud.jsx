import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faCheckCircle, faCircleXmark, faEye, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

import { Inertia } from '@inertiajs/inertia';

import { router } from '@inertiajs/react';
import BotonVolver from '@/Components/Botones/BotonVolver';

const Revisar_pago_solicitud = ({auth,solicitud,cantidad_rep}) => {

    const {data, setData, errors, put, progress} = useForm({
        id_solicitud: solicitud.id_solicitud,
        id: solicitud.id,
        codigo_estudiante: solicitud.c_codMatricula,
        nombre_completo: solicitud.c_nombres+" "+solicitud.c_apellidoP+" "+solicitud.c_apellidoM,
        tipo_solicitud: solicitud.c_nomSolicitud,
        finalidad_solicitud: solicitud.c_nomFinalidadSolicitud,
        //
        archivo_pago: solicitud.c_archivoBoucher,
        fut: solicitud.c_archivoFut,
        //
        facultad: solicitud.c_nomFacultad,
        carrera: solicitud.c_nomCarreraProf,
        tipo_alumno: solicitud.c_nomTipoEstud,

        fecha: solicitud.d_fechaSolicitud,

        celular: solicitud.c_numCelular,
        sede: solicitud.c_nomSede,
        modalidad: solicitud.c_nomModalidad,

        codigo_fut: solicitud.c_codigoFut,
        codigo_pago: solicitud.c_codigoBoucher,
        cantidad_pago: solicitud.f_montoPagoTipo,

    });

    const mostrar_boucher = (e) => {
        Swal.fire({
            title: `Código Boucher: &nbsp&nbsp<b>${data.codigo_pago}</b> \n Monto trámite:&nbsp&nbsp <b> S/. ${data.cantidad_pago}</b>`,
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/pagos/${data.archivo_pago}' className='max-w-xs' alt='Boucher' width='100%' height='520px' /></div>`,
        })    
    }

    const mostrar_fut = (e) => {
        Swal.fire({
            title: `Código: &nbsp&nbsp<b>${data.codigo_fut}</b>`,
            text: ``,
            width: '600px',
            heightAuto: false,
            customClass: 'swal-height',
            html: `<div><embed src='/documentos/constancia/fut/${data.fut}' className='max-w-xs' alt='Boucher' width='100%' height='650px' /></div>`,
            
        })    
    }

    const aceptar_solicitud = (e) => {
        
        localStorage.setItem("aSoli","aceptarSolicitud")
        
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

                Inertia.post(route('d.solicitud.secretaria.aceptar_solicitud',`${solicitud.id_solicitud}`),{
                    _method: 'put',
                    codigo: data.codigo_pago,
                })
    
                router.on('start', () => {
                        
                })
                    
                Swal.fire({
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    html: "<div><img src='/images/gif/send-message.gif' style=' width: 100%; height: 100%;'/></div><b><p style='color:#152d95; font-size: 25px'>Validando solicitud y enviando mensaje de confirmación al estudiante<p></b>",
                    showConfirmButton: false,
                    backdrop: `
                        rgba(0, 133, 255, 0.24)
                        `,
                    didOpen: () => {
                        Swal.showLoading()
                        },
                    })
                    
                router.on('finish', () => {
                    if("aceptarSolicitud"==localStorage.getItem("aSoli")){
                        Swal.fire({
                            title: 'Solicitud validada correctamente!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                        })
                    }
                    localStorage.removeItem('aSoli');
                })
              
            }
        }) 
    }
    
    const rechazar_solicitud = (e) => {
        
        localStorage.setItem("rSoli","rechazarSolicitud")

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

                Swal.fire({
                    title: '<b>Motivo por el cuál no se admite la solicitud</b>',
                    input: 'textarea',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    showLoaderOnConfirm: true,
                    //preConfirm:
                    allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {
                    if (result.isConfirmed) {
        
                        if (!result.value) {
                            return Swal.fire(
                                'Debe escribir un comentario',
                                '',
                                'error'
                            )
                          }
        
                        Inertia.post(route('d.solicitud.secretaria.rechazar_solicitud',`${solicitud.id_solicitud}`),{
                            _method: 'put',
                            comentario: result.value,
                        })

                        router.on('start', () => {
                        
                        })
                            
                        Swal.fire({
                            width: 600,
                            padding: '3em',
                            color: '#c02d63',
                            html: "<b><p style='color:#d63065; font-size: 25px'>Solicitud rechazada, enviando mensaje con el motivo al estudiante<p></b>",
                            showConfirmButton: false,
                            backdrop: `
                              rgba(243, 18, 119, 0.14)
                                `,
                            didOpen: () => {
                                Swal.showLoading()
                                },
                            })
                            
                        router.on('finish', () => {
                            if("rechazarSolicitud"==localStorage.getItem("rSoli")){
                                Swal.fire({
                                    title: 'Solicitud Rechazada!',
                                    icon: 'warning',
                                    showConfirmButton: false,
                                    timer: 1000,
                                })
                            }
                            localStorage.removeItem('rSoli');
                        })
        
                    }
                  })
            }
        })
    }

    const error_aceptar = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'No puede aceptar la solicitud',
            text: 'El código de pago ya esta en uso',
            //footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    var extension_boucher="";
    
    if(data.archivo_pago != null){
        extension_boucher = data.archivo_pago.split(".").pop();
    }

    const prueba_swal = (e) => {
        Swal.fire({
            text: 'enviando mensaje...',
            width: 600,
            padding: '3em',
            color: '#716add',
            html: "<div><img src='./images/gif/send-message.gif' style=' width: 100%; height: 100%;'/></div><b><p style='color:#152d95; font-size: 25px'>Validando solicitud y enviando mensaje de confirmación al estudiante<p></b>",
            showConfirmButton: false,
            backdrop: `
              rgba(0, 133, 255, 0.24)
            `,
            didOpen: () => {
                Swal.showLoading()
                },
        })
    }
    
    return (
        <Navbar auth={auth}>
            <Head title='Admin'/>

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <BotonVolver ruta={'d.solicitud.secretaria'}/>
                            
                            <form name="createForm">

                                <h1 className="font-bold text-2xl mb-2">DATOS PERSONALES</h1>

                                <div className="grid grid-cols-12 gap-4">
                                    <div className="flex flex-col mb-2 col-span-8">
                                        <label className="">ESTUDIANTE </label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.nombre_completo.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-4">
                                        <label className="">CÓDIGO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.codigo_estudiante.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FACULTAD </label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.facultad.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">CARRERA </label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.carrera.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">SEDE</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.sede.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">MODALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.modalidad.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FECHA SOLICITUD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.fecha.slice(0, -9)}
                                        />
                                    </div>
                                </div>
                            </form>

                            <hr className="my-5"/>
                            
                            <form name="createForm">

                                <h1 className="font-bold text-2xl mb-2">TRÁMITE</h1>

                                <div className="grid grid-cols-12 gap-4">
                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">TIPO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.tipo_solicitud.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FINALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.finalidad_solicitud.toUpperCase()}
                                        />
                                    </div>

                                    
                                </div>
                            </form>
                            
                            <hr className="my-5"/>
                            
                            <form name="createForm">

                                <h1 className="font-bold text-2xl mb-2">PAGO</h1>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="grid grid-row-2 gap-4 col-span-1">
                                        <div className="flex flex-col mb-2">
                                            <label className="">MONTO DE SOLICITUD </label>
                                            <input
                                                type="text"
                                                disabled
                                                className="w-full px-4 py-2 text-gray-500"
                                                value={"S/. "+data.cantidad_pago.toFixed(2)}
                                            />
                                        </div>

                                        <div className="flex flex-col mb-2">
                                            <label className="">CÓDIGO - RECIBO DE PAGO </label>
                                            <input
                                                type="text"
                                                disabled
                                                className="w-full px-4 py-2 text-gray-500"
                                                value={data.codigo_pago}
                                            />
                                            { cantidad_rep >0 &&
                                                <span className='bg-[#f5dbe7] text-[#952741] text-center font-bold rounded-md pt-0.5'>
                                                    El código de pago ya esta en uso
                                                </span>
                                            }
                                            
                                        </div>
                                    </div>

                                    <div className="grid grid-cols gap-4 col-span-1">
                                        <div className="items-center flex flex-col mb-2 col-span-4 ">
                                       
                                            <label className="font-bold text-1xl">FUT</label>
                                                <Link onClick={mostrar_fut}>
                                                    <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                                        <embed src={`/documentos/constancia/fut/${data.fut}`} className="max-w-xs" alt="Boucher" style={{width:'110px', height:'140px'}} />
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                                            <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                                                        </div>
                                                    </div>
                                                </Link>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols gap-4 col-span-1">
                                        <div className="items-center flex flex-col mb-2 col-span-4 ">
                                       
                                            <label className="font-bold text-1xl">Constancia de Pago</label>
                                            {
                                                <Link onClick={mostrar_boucher}>
                                                    <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                                        <embed src={`/documentos/pagos/${data.archivo_pago}`} className="max-w-xs" alt="Boucher" style={{width:'110px', height:'140px'}} />
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                                                <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye} />
                                                        </div>
                                                    </div>
                                                </Link>

                                                
                                            }

                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </form>

                            <hr className="my-5"/>

                                <div className='grid grid-cols-8 py-5'>
                                    <div className="flex w-full col-start-3 col-end-4 m-auto">
                                        
                                        <Link onClick={
                                                        cantidad_rep == 0 ?
                                                        aceptar_solicitud
                                                        :
                                                        error_aceptar
                                                      }
                                            className="w-full text-center px-3 py-2 text-white bg-green-600 rounded-md focus:outline-none"
                                        >
                                            <FontAwesomeIcon className="h-5 w-5 pr-3" icon={faCheckCircle} />
                                            <strong>Validar</strong>
                                        </Link>
                                        

                                        {/*
                                        <Link onClick={
                                                        prueba_swal
                                                      }
                                            className="w-full text-center px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                        >
                                            Validar
                                        </Link>
                                        */}
                                        
                                    </div>
                                    
                                    <div className="flex w-full col-start-6 col-end-7 m-auto">
                                        <Link onClick={rechazar_solicitud}
                                            className="w-full text-center px-3 py-2 text-white bg-red-600 rounded-md focus:outline-none"
                                        >
                                            <FontAwesomeIcon className="h-5 w-5 pr-2" icon={faCircleXmark} />
                                            <strong>Rechazar</strong>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                    </div>
                </div>
            </div>
        </Navbar>
    ); 
}

export default Revisar_pago_solicitud