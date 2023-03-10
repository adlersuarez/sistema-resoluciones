import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';


const Registrar = ({ auth, estado_adeudo }) => {
    const [preview, setPreview] = useState('');

    //console.log(estado_adeudo)

    const { data, setData, errors, put, progress } = useForm({

    });

    //console.log(data.estado_AE)
    function handleSubmit(e) {
        e.preventDefault();

        //post(route(''))

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
        })
    }

    var listaMiembros = [
        {
            'id': 1,
            'codigo': '2018200462k',
            'nombre': 'John Suarez Orihuela',
        },
        {
            'id': 2,
            'codigo': '2018214526L',
            'nombre': 'Joham Jurado Baldeon',
        },
    ]

    /*listaMiembros.push({
        'id': 3,
        'codigo': '2018214123L',
        'nombre': 'Terry Jurado Baldeon',
    }) */
    //console.log(listaMiembros.length)

    return (
        <Navbar auth={auth}>
            <Head title="Estado adeudo" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Registrar'} icono={faFileWord} />
                <BotonVolver ruta={'r.resoluciones'} />
            </div>
            <div className="">
                <div className="mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 border-b border-gray-200">
                            <hr className='my-4' />
                            <form name="createForm">
                                <div className="">
                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Nombres y Apellidos </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                            //value={data.nombre_completo.toUpperCase()}
                                            />
                                        </div>
                                        <div className="flex flex-col my-auto col-span-5">
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_persona', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col my-auto col-span-1">
                                            <button className='border-2 '>Agregar</button>
                                        </div>
                                    </div>
                                    {
                                        listaMiembros.length != 0 &&
                                        <div className='grid grid-cols-12 gap-4 my-2'>
                                            <label className="col-span-2 my-auto"></label>
                                            <div className="flex flex-col my-auto col-span-10">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead>
                                                        <tr className='font-bold'>
                                                            <th className='text-center'>Código</th>
                                                            <th className='text-left'>Nombre Completo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaMiembros.map((miembro) =>
                                                                <tr key={miembro.id}>
                                                                    <td className='text-center'>{miembro.codigo}</td>
                                                                    <td className='text-left'>{miembro.nombre}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>
                                    }

                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Asunto </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                            //value={data.nombre_completo.toUpperCase()}
                                            />
                                        </div>
                                        <div className="flex flex-col my-auto col-span-6">
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_persona', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Tipo Sesión </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_persona', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Tipo Resolución </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_persona', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Número Resolución </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                            //value={data.nombre_completo.toUpperCase()}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Fecha </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 text-gray-500"
                                            //value={data.nombre_completo.toUpperCase()}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 gap-4 my-2'>
                                        <label className="col-span-2 my-auto">Archivo </label>
                                        <div className="flex flex-col col-span-10 border-[1px] border-current">
                                            <input
                                                type="file"
                                                className="w-full px-4 py-2"
                                            //value={data.nombre_completo.toUpperCase()}
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-5" />

                                    <div className="flex mx-auto mt-4 justify-center">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 font-bold w-40 text-white bg-[#007CBC] rounded hover:bg-[#0064bc]"
                                        >
                                            Registrar
                                        </button>
                                    </div>

                                </div>
                            </form>

                            


                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default Registrar