import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord, faPersonCirclePlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

var listaVisto = []
var listaConsiderando = []

localStorage.setItem("listaVisto", JSON.stringify(listaVisto));
localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));

const Registrar = ({ auth, tipo_resolucion, vistos, considerandos }) => {

    const { data, setData, errors, put, progress } = useForm({
        id_persona: '',
    });

    const [filterText, setFilterText] = useState('');
    const [filterAutoridad, setFilterAutoridad] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        Inertia.post(route('r.plantillas.store'), {
            _method: 'post',

        })

        Swal.fire({
            icon: 'success',
            title: 'Plantilla creada',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title="Plantillas" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Nueva Plantilla'} icono={faFileWord} />
                <BotonVolver ruta={'r.plantillas'} />
            </div>
            <div className="flex">
                <div className="w-7/12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-10 py-4 border-b border-gray-200">
                            <hr className='my-4' />

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="">

                                    {/* Tipo de Resolución*/}
                                    <div className='grid grid-cols-12 gap-4 my-4'>

                                        <label className="col-span-3 my-auto">Tipo Resolución </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <select
                                                id='id_tipoResolucion'
                                                name='id_tipoResolucion'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                // onChange={(e) => setData('id_tipoResolucion', e.target.value) }
                                                required>
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {/*
                                                    tipo_resolucion.map(res => {
                                                        return (
                                                            <option key={res.id_tipoResolucion} value={res.id_tipoResolucion}>{res.nombreTipoResolucion}</option>
                                                        )
                                                    })
                                                */}
                                            </select>
                                        </div>
                                    </div>

                                    <hr className='my-4' />

                                    {/* Visto Plantilla */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Visto: </strong>
                                        {/*
                                            (data.id_asunto != '') &&
                                            <div className="flex text-white ">
                                                <Link className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                            */}
                                    </div>

                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <div className="flex flex-col col-span-3">
                                            <select
                                                id='id_asunto'
                                                name='id_asunto'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                            //onChange={(e) => setData('id_asunto', e.target.value) }
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {/*
                                                    tipo_asunto.map(tip => {
                                                        return (
                                                            <option key={tip.id_tipoAsunto} value={tip.id_tipoAsunto}>{tip.c_nombreTipoAsunto}</option>
                                                        )
                                                    })
                                                */}
                                            </select>
                                        </div>

                                    </div>

                                    <hr className="my-4" />

                                    {/* Asunto Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Considerando: </strong>
                                        {/*
                                            (data.id_asunto != '') &&
                                            <div className="flex text-white ">
                                                <Link className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                            */}
                                    </div>

                                    {
                                        //aqui va lo de
                                    }

                                    <hr className="my-4" />

                                    <div className="flex mx-auto mt-4 justify-center">
                                        <button type="submit" className="px-6 py-2 font-bold w-40 text-white bg-[#007CBC] rounded hover:bg-[#0064bc]">
                                            Registrar
                                        </button>
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-sm sm:rounded-lg w-5/12 p-4 ml-4 overflow-hidden'>
                    <div className='mt-2 border-black border-[1px] p-2 overflow-x-hidden max-h-[655px] max-[650px]:overflow-scroll'>
                        {/*
                            SE RESUELVE:
                        {listaAsuntos.map((asunto, index) => {

                            return (
                                <div className='grid grid-cols-12 mt-2' key={asunto.cod}>
                                    <div className='col-span-2 flex flex-row'>
                                        <div className='flex w-8 mt-1 mr-2'>
                                            {!estado_lista_asunto_fin(asunto.cod) &&
                                                <Link onClick={() => mover_abajo_asunto(asunto.cod)}
                                                    className='flex mx-auto '>
                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowDown} />
                                                </Link>
                                            }
                                            {!estado_lista_asunto_inicio(asunto.cod) &&
                                                <Link onClick={() => mover_arriba_asunto(asunto.cod)}
                                                    className='flex mx-auto '>
                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowUp} />
                                                </Link>
                                            }
                                        </div>
                                        <div className=''>
                                            <strong>Art. {index + 1}°</strong>
                                        </div>

                                    </div>
                                    <div className='col-span-9 mx-2'>
                                        <strong>{asunto.nombre.toUpperCase()}</strong> {asunto.descripcion}
                                        {
                                            asunto.imagen &&
                                            <div className=''>
                                                <img src={`${URL.createObjectURL(asunto.imagen)}`} style={{ width: '100%', height: asunto.altura + "px" }} />
                                            </div>
                                        }

                                    </div>
                                    <div className='col-span-1 flex'>
                                        <Link
                                            className='flex mx-auto '>
                                            <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                                        </Link>

                                        <Link onClick={() => eliminar_asunto(asunto.cod)}
                                            className='flex mx-auto '>
                                            <FontAwesomeIcon className="h-5 mx-0.5 hover:text-red-700" icon={faTrash} />
                                        </Link>

                                    </div>
                                </div>
                            )
                        }

                        )

                        }

                        */}

                    </div>
                </div>
            </div >
        </Navbar >
    )
}

export default Registrar

