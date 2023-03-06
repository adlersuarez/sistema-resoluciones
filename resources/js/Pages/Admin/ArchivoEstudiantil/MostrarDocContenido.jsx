import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import TablaDocumentos from '@/Components/ArchivoEstudiantil/TablaDocumentos';
import BotonVolver from '@/Components/Botones/BotonVolver';


const MostrarDocContenido = ({auth,estado_adeudo,documentos}) => {
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
        archivo_AE: estado_adeudo.c_archivoAE,
        estado_AE: estado_adeudo.b_estadoAE,
        modalidad_ingreso: estado_adeudo.c_nomModalidadIngreso,
        id_modalidad_ingreso: estado_adeudo.id_modalidadIngreso,

        estadoArchivoEstudiantil: estado_adeudo.b_estadoAE,
        id_ArchivoEstudiantil: estado_adeudo.id_pagoAE,

        tramite: estado_adeudo.c_nomSolicitud,
        finalidad: estado_adeudo.c_nomFinalidadSolicitud,

        sede: estado_adeudo.c_nomSede,
        modalidad: estado_adeudo.c_nomModalidad,

    });

    //console.log(data.estado_AE)

    return (
        <Navbar auth={auth}>
            <Head title="Estado adeudo" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between">
                                {
                                    data.estado_AE == 0 ?
                                
                                    <BotonVolver ruta={'d.archivoEstudiantil'}/>
                                    :
                                    <BotonVolver ruta={'d.archivoEstudiantil.validado'}/>
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

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">MODALIDAD INGRESO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            value={data.modalidad_ingreso.toUpperCase()}
                                        /> 
                                    </div>

                                </div>
                            </form>
                                
                            <hr className="my-5"/>
                            
                            <TablaDocumentos
                                archivos = {documentos}
                                mod_ingreso = {data.id_modalidad_ingreso}
                                estado = {data.estadoArchivoEstudiantil}
                                id_AE = {data.id_ArchivoEstudiantil}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    ) 
} 

export default MostrarDocContenido