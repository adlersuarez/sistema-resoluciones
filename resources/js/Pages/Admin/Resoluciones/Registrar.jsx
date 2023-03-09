import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';


const Registrar = ({auth,estado_adeudo}) => {
    const [preview, setPreview] = useState('');

    //console.log(estado_adeudo)

    const {data, setData, errors, put, progress} = useForm({

    });

    //console.log(data.estado_AE)

    return (
        <Navbar auth={auth}>
            <Head title="Estado adeudo" />
            <TitlePages texto={'Registrar'} icono={faFileWord}/>
            <div className="flex items-center justify-between"> 
                <BotonVolver ruta={'r.resoluciones'}/>  
            </div>
            <div className="py-12">
                <div className=" mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            

                            <form name="createForm">
                                <h1 className="font-bold text-2xl mb-5">DATOS PERSONALES</h1>
                                <div className="grid grid-cols-12 gap-4">
                                <div className="flex flex-col mb-2 col-span-8">
                                        <label className="">ESTUDIANTE </label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.nombre_completo.toUpperCase()}
                                        />
                                    </div>
                                        
                                    <div className="flex flex-col mb-2 col-span-4">
                                        <label className="">CÓDIGO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.codigo_estudiante.toUpperCase()}
                                        />
                                        
                                    </div>
                                        
                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FACULTAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.facultad.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">CARRERA PROFESIONAL</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.carrera.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">SEDE</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.sede.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">MODALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.modalidad.toUpperCase()}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">TRÁMITE</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.tramite.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">FINALIDAD</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.finalidad.toUpperCase()}
                                        /> 
                                    </div>

                                    <div className="flex flex-col mb-2 col-span-6">
                                        <label className="">MODALIDAD INGRESO</label>
                                        <input
                                            type="text"
                                            disabled
                                            className="w-full px-4 py-2 text-gray-500"
                                            //value={data.modalidad_ingreso.toUpperCase()}
                                        /> 
                                    </div>

                                </div>
                            </form>
                                
                            <hr className="my-5"/>
                            
                        

                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    ) 
} 

export default Registrar