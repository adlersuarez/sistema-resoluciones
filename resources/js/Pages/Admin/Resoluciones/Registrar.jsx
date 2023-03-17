import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faCirclePlus, faCircleXmark, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

var listaMiembros = []

localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));

const Registrar = ({ auth, persona, tipo_resolucion, tipo_sesion }) => {
    const [preview, setPreview] = useState('');

    const { data, setData, errors, put, progress } = useForm({
        id_persona: '',
        id_tipoSesion: '',
        id_tipoResolucion: '',
        //id_carreraProfesional: '',
        //id_sede: '',
        numeroResolucion: '',
        archivoResolucion: null,
        asuntoResolucion: '',
        fechaResolucion: '',
        id_asunto: '',
        miembros: [0],
    });

    const [filterText, setFilterText] = useState('');
    const filtroPersona = persona.filter(
        item => item.c_dni.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoP.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoM.toLowerCase().includes(filterText.toLowerCase())
            || item.c_nombres.toLowerCase().includes(filterText.toLowerCase())
    );
    

    function handleSubmit(e) {
        e.preventDefault();

        listaMiembros.map(lis =>{
            data.miembros.push(lis.id)
        })

        //console.log(data)

        Inertia.post(route('r.resoluciones.store'), {
            _method: 'post',

            id_tipoSesion: data.id_tipoSesion,
            id_tipoResolucion: data.id_tipoResolucion,
            //id_carreraProfesional: data.id_carreraProfesional,
            //id_sede: data.id_sede,
            numeroResolucion: data.numeroResolucion,
            archivoResolucion: data.archivoResolucion,
            asuntoResolucion: data.asuntoResolucion,
            fechaResolucion: data.fechaResolucion,
            miembros: data.miembros,
        })

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
            timer: 1500,
        }) 
    }

    function agregar_participantes(id) {

        if (id) {
            const busqueda = persona.find(element => element.id_persona == id);
            const repetido = listaMiembros.find(lista => lista.id == id);
            if (!repetido) {
                listaMiembros.push({
                    'id': busqueda.id_persona,
                    'codigo': busqueda.c_dni,
                    'nombre': busqueda.c_nombres + ' ' + busqueda.c_apellidoP + ' ' + busqueda.c_apellidoM,
                })
            }
            localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
        }
    }

    function eliminar_participante(id) {

        var indiceBorrado = listaMiembros.findIndex(item => item.id === id)
        listaMiembros.splice(indiceBorrado, 1)
        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }

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

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="">
                                    {/* Miembros Resolucion */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Nombres y Apellidos </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Nombre o DNI"
                                                onChange={(e) => setFilterText(e.target.value)}
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
                                                {
                                                    filtroPersona.map(per => {
                                                        return (
                                                            <option key={per.id_persona} value={per.id_persona}>{per.c_apellidoP + " " + per.c_apellidoM + ", " + per.c_nombres + " - " + per.c_dni}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="flex flex-col my-auto col-span-1">
                                            <Link onClick={() => agregar_participantes(data.id_persona)} className='flex m-auto text-green-600'>
                                                <FontAwesomeIcon className="h-8 w-10" icon={faCirclePlus} />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaMiembros.length != 0 &&
                                        <div className='grid grid-cols-12 gap-4 my-2'>
                                            <label className="col-span-2 my-auto"></label>
                                            <div className="flex flex-col my-auto col-span-9">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400'>
                                                            <th className='text-center'>Código</th>
                                                            <th className='text-left pl-12'>Nombre Completo</th>
                                                            <th className='text-center'>Acción</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaMiembros.map((miembro) =>
                                                                <tr key={miembro.id} className="">
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.codigo}</td>
                                                                    <td className='text-left pl-12 border-slate-400 border-[1px]'>{miembro.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto'>
                                                                            <Link onClick={() => eliminar_participante(miembro.id)} className='flex m-auto text-red-600'>
                                                                                <FontAwesomeIcon className="h-4 w-5 mt-1" icon={faCircleXmark} />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>
                                    }

                                    {/* Asunto Resolucion */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Asunto </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) =>
                                                    setData('asuntoResolucion', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col my-auto col-span-6">
                                            <select
                                                id='id_asunto'
                                                name='id_asunto'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_asunto', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Tipo de Sesión */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Tipo Sesión </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <select
                                                id='id_tipoSesion'
                                                name='id_tipoSesion'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_tipoSesion', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_sesion.map(ses => {
                                                        return (
                                                            <option key={ses.id_tipoSesion} value={ses.id_tipoSesion}>{ses.nombreSesion}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {/* Tipo de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Tipo Resolución </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <select
                                                id='id_tipoResolucion'
                                                name='id_tipoResolucion'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_tipoResolucion', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_resolucion.map(res => {
                                                        return (
                                                            <option key={res.id_tipoResolucion} value={res.id_tipoResolucion}>{res.nombreTipoResolucion}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {/* Número de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Número Resolución </label>
                                        <div className="flex flex-col my-auto col-span-10" id='fecha-input'>
                                            <input
                                                type="number"
                                                min="1" max="99"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) =>
                                                    setData('numeroResolucion', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Fecha de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Fecha </label>
                                        <div className="flex flex-col my-auto col-span-10">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) =>
                                                    setData('fechaResolucion', e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Archivo de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Archivo </label>
                                        <div className="flex flex-col col-span-10 border-[1px] border-current">
                                            <input
                                                type="file"
                                                className="w-full px-4 py-2"
                                                onChange={(e) => 
                                                    setData("archivoResolucion", e.target.files[0])
                                                }
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-4" />

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