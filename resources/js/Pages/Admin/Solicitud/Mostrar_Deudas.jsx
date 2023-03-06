import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import SpanEstadoDeuda from '@/Components/Span/SpanEstadoDeuda';
import Swal from 'sweetalert2';
import BotonVolver from '@/Components/Botones/BotonVolver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const Mostrar_Deudas = ({auth,solicitud}) => {
    const [preview, setPreview] = useState('');
    const {data, setData, errors, put, progress} = useForm({
        id_solicitud: solicitud.id_solicitud,
        id: solicitud.id,
        codigo_estudiante: solicitud.c_codMatricula,
        nombre_completo: solicitud.c_nombres+" "+solicitud.c_apellidoP+" "+solicitud.c_apellidoM,
        tipo: solicitud.c_nomSolicitud,
        facultad: solicitud.c_nomFacultad,
        carrera: solicitud.c_nomCarreraProf,
        tipo_alumno: solicitud.c_nomTipoEstud,
        pago_FAC: solicitud.f_montoPagoFac,
        pago_PAI: solicitud.f_montoPagoPAI,
        pago_AE: solicitud.f_montoPagoAE,
        pago_OEFC: solicitud.f_montoPagoOEF,
        archivo_FAC: solicitud.c_archivoFac,
        archivo_PAI: solicitud.c_archivoPAI,
        archivo_AE: solicitud.c_archivoAE,
        archivo_OEF: solicitud.c_archivoOEF,
        estado_FAC: solicitud.b_estadoFac,//facultades
        estado_PAI: solicitud.b_estadoPAI,//proyeccion social
        estado_AE: solicitud.b_estadoAE,//archivo estudiantil
        estado_OEF: solicitud.b_estadoOEF,//caja
    });

    var total = data.pago_AE + data.pago_FAC + data.pago_OEFC + data.pago_PAI;

    const fecha = new Date();
    var year = fecha.getFullYear();
    var month = fecha.getMonth();
    //var month = 0;
    var day = fecha.getDate();

    var tipo_y_facultad=data.tipo+" en "+data.facultad;

    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
    "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    var fecha_actual = day + " de " + meses[month] + " de " + year;

    if(month>=6) {
        year=year+1;
    }
    var fecha_valida = day + " de " + meses[month+6] + " de " + year;

    //remover tildes
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      } 
    
    //console.log(solicitud)

    const validar_constancia = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted validará la constancia de No Adeudo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => { 
                if (result.isConfirmed) {
              
                    Inertia.post(route('d.solicitud.jefatura.validar_constancia',`${solicitud.id_solicitud}`),{
                        _method: 'put',
                        //comentario: result.value,
                    })

                    Swal.fire({
                        title: 'No Adeudo validado exitosamente!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
          })
    }

    const error_validar = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'No puede validar la constancia',
            text: 'El estudiante aún adeuda',
            //footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    var valido = false;

    var completo = solicitud.b_estadoPAI*solicitud.b_estadoFac*solicitud.b_estadoAE*solicitud.b_estadoOEF;
   
    if(completo==1){
        valido = true;
    }

    //console.log(solicitud.b_estadoPagos)

    return (
    <Navbar auth={auth}>
        <Head title="Estado adeudo" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <BotonVolver ruta={'d.solicitud.jefatura'}/>

                            <form name="createForm">
                                <h1 className="font-bold text-2xl mb-5">DATOS PERSONALES</h1>
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
                                    
                                    <div className="flex flex-col mb-2 col-span-12">
                                        <label className="">TIPO / FACULTAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={tipo_y_facultad.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">ESPECIALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.carrera.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">TIPO ALUMNO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.tipo_alumno.toUpperCase()}
                                        />
                                    </div>

                                </div>
                                
                            </form>
                            
                            <hr className="my-5"/>

                            <h1 className="font-bold text-2xl mb-5">ESTADO ADEUDO</h1>

                            <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-white uppercase bg-[#0064bc] text-center">
                                    <tr>
                                        <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                                Dependencia
                                        </th>
                                        <th scope="col" className="py-3 px-3 md:px-4" style={{borderRight: '1px solid white'}}>
                                                Detalle
                                        </th>
                                        {/*
                                        <th scope="col" className="py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                                Archivo
                                        </th>
                                        */}
                                        
                                        <th scope="col" className="py-3 px-3 md:px-4 " style={{borderRight: '1px solid white'}}>
                                                Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    <tr className="bg-white border-b ">
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-center text-xl'>
                                                <strong>ORyM</strong>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-lg'>
                                                <strong>Archivo Estudiantil</strong>
                                            </div>
                                        </td>
                                        {/*
                                        <td className="py-4 px-4 md:px-6">
                                            <IconoDownloadPDF
                                                ruta={'d.solicituds.requisito.revisarAE'}
                                                id={data.id_solicitud}
                                                estado={data.estado_AE}
                                            />
                                        </td>
                                        */}
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex text-center w-5/6 mx-auto justify-center text-lg'>
                                                {/* S/. {data.pago_AE.toFixed(2)} */}
                                                <SpanEstadoDeuda
                                                    estado={data.estado_AE}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    {/* */}
                                    <tr className="bg-white border-b">
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-center text-xl'>
                                                <strong>OEyF</strong>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-lg'>
                                                <strong>Caja (Pensiones de enseñanza y otros)</strong>
                                            </div>
                                        </td>
                                        {/*
                                        <td className="py-4 px-4 md:px-6">
                                            <IconoDownloadPDF
                                                ruta={'d.solicituds.requisito.revisarOEF'}
                                                id={data.id_solicitud}
                                                estado={data.estado_PAI}
                                            />
                                        </td>
                                        */}
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex text-center w-5/6 mx-auto justify-center text-lg'>
                                                {/* S/. {data.pago_PAI.toFixed(2)} */}
                                                <SpanEstadoDeuda
                                                    estado={data.estado_PAI}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    {/* */}
                                    <tr className="bg-white border-b">
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-center text-xl'>
                                                <strong>DURS</strong>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-lg'>
                                                <strong>Proyección Social y otros</strong>
                                            </div>
                                        </td>
                                        {/*
                                        <td className="py-4 px-4 md:px-6">
                                            <IconoDownloadPDF
                                                ruta={'d.solicituds.requisito.revisarPAI'}
                                                id={data.id_solicitud}
                                                estado={data.estado_OEF}
                                            />
                                        </td>
                                        */}
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex text-center w-5/6 mx-auto justify-center text-lg'>
                                                {/* S/. {data.pago_OEFC.toFixed(2) } */}
                                                <SpanEstadoDeuda
                                                    estado={data.estado_OEF}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    {/* */}
                                    <tr className="bg-white border-b">
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-center text-xl'>
                                                <strong>Facultades</strong>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex flex-col text-lg'>
                                                <strong>Laboratorios - Biblioteca</strong>
                                            </div>
                                        </td>
                                        {/*
                                        <td className="py-4 px-4 md:px-6">
                                            <IconoDownloadPDF
                                                ruta={'d.solicituds.requisito.revisarFac'}
                                                id={data.id_solicitud}
                                                estado={data.estado_FAC}
                                            />
                                        </td>
                                        */}
                                        <td className="py-4 px-4 md:px-6">
                                            <div className='flex text-center w-5/6 mx-auto justify-center text-lg'>
                                                {/* S/. {data.pago_FAC.toFixed(2)} */}
                                                <SpanEstadoDeuda
                                                    estado={data.estado_FAC}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>

                            {   solicitud.b_estadoPagos != 1 &&

                                <>
                                <hr className="my-5"/>
                                <div className='grid grid-cols-7'>
                                    <div className="flex w-full col-start-4 col-end-5 m-auto">
                                        <Link onClick={
                                            
                                            valido ? 

                                            validar_constancia
                                            :
                                            error_validar
                                        }
                                            className="w-full text-center px-3 py-2 text-white bg-green-600 rounded-md focus:outline-none"
                                        >
                                            <FontAwesomeIcon className="h-5 w-5 pr-3" icon={faCheckCircle} />
                                            <strong>Validar</strong>
                                        </Link>
                                    </div>
                                    
                                </div>
                                </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
    </Navbar>
    ) 
} 

export default Mostrar_Deudas