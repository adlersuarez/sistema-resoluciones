import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2'
import { Inertia } from '@inertiajs/inertia'
import BotonVolver from '@/Components/Botones/BotonVolver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const MostrarAdeudoFac = ({auth,estado_adeudo}) => {
    const [preview, setPreview] = useState('');

    //console.log(estado_adeudo)

    const {data, setData, errors, put, progress} = useForm({
        id_solicitud: estado_adeudo.id_solicitud,
        id: estado_adeudo.id,
        codigo_estudiante: estado_adeudo.c_codMatricula,
        nombre_completo: estado_adeudo.c_nombres+" "+estado_adeudo.c_apellidoP+" "+estado_adeudo.c_apellidoM,

        tipo: estado_adeudo.c_nomSolicitud,
        facultad: estado_adeudo.c_nomFacultad,
        carrera: estado_adeudo.c_nomCarreraProf,
        tipo_alumno: estado_adeudo.c_nomTipoEstud,
        //archivo_AE: estado_adeudo.c_archivoAE,
        //estado_AE: estado_adeudo.b_estadoAE,
        modalidad_ingreso: estado_adeudo.c_nomModalidadIngreso,
        id_modalidad_ingreso: estado_adeudo.id_modalidadIngreso,
        //estadoArchivoEstudiantil: estado_adeudo.b_estadoAE,
        //id_ArchivoEstudiantil: estado_adeudo.id_pagoAE,

        tramite: estado_adeudo.c_nomSolicitud,
        finalidad: estado_adeudo.c_nomFinalidadSolicitud,

        sede: estado_adeudo.c_nomSede,
        modalidad: estado_adeudo.c_nomModalidad,

        estado: estado_adeudo.b_estadoFac,

    });

    const validar_fac = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted validará que el estudiante no adeuda en su Facultad",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => { 
                if (result.isConfirmed) {
              
                    Inertia.post(route('d.facultades.validarFac',`${estado_adeudo.id_pagoFac}`),{
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

    const notificar_fac = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted notificara al estudiante que adeuda",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => { 
                if (result.isConfirmed) {
              
                    Inertia.post(route('d.facultades.notificarFac',`${estado_adeudo.id_pagoFac}`),{
                        _method: 'put',
                        //comentario: result.value,
                    })

                    Swal.fire(
                        'Notificación enviada correctamente!',
                        '',
                        'success'
                    )
                }
          })
    }

    const error_validar = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'No puede validar el estado',
            text: 'El alumno aún adeuda ',
            //footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    //console.log(estado_adeudo)

    return (
        <Navbar auth={auth}>
            <Head title="Estado adeudo" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between">
                                {
                                    data.estado == 0 ?
                                
                                    <BotonVolver ruta={'d.facultades'}/>
                                    :
                                    <BotonVolver ruta={'d.facultades.validado'}/>
                                }
                                
                            </div>

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
                                        
                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FACULTAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.facultad.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">CARRERA PROFESIONAL</label>
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
                                        <label className="">TRÁMITE</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.tramite.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FINALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.finalidad.toUpperCase()}
                                        /> 
                                    </div>

                                </div>
                            </form>
                            
                            {
                                data.estado == 0 &&
                                <>
                                    <hr className="my-5"/>

                                    <div className='grid grid-cols-7'>
                                        <div className="flex w-full col-start-4 col-end-5 m-auto">
                                            <Link 
                                            onClick={validar_fac}
                                            className="w-full text-center px-3 py-2 text-white bg-green-600 rounded-md focus:outline-none"
                                            >
                                                <FontAwesomeIcon className="h-5 w-5 pr-3" icon={faCheckCircle} />
                                                <strong>Validar</strong>
                                            </Link>
                                        </div>
                                        {/*
                                        <div className="flex w-full col-start-4 col-end-5 mx-auto">
                                            <Link onClick={notificar_documentos_faltantes}
                                            className="w-full text-center px-6 py-2 text-white bg-red-500 rounded-md focus:outline-none"
                                            >
                                                Notificar
                                            </Link>
                                        </div>
                                        */}
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

export default MostrarAdeudoFac