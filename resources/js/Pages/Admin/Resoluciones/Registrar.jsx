import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faArrowDown, faArrowUp, faEdit, faFileWord, faMinus, faPencil, faPersonCirclePlus, faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

var listaMiembros = []
var listaAsuntos = []
var listaEncargo = []

localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));

const Registrar = ({ auth, persona, tipo_resolucion, tipo_sesion, tipo_asunto, autoridad }) => {

    const { data, setData, errors, put, progress } = useForm({
        id_persona: '',
        id_tipoSesion: '',
        id_tipoResolucion: '',
        //id_carreraProfesional: '',
        //id_sede: '',
        numeroResolucion: '',
        imagenResolucion: null,
        asuntoResolucion: '',
        fechaResolucion: '',
        alturaImagen: '80',
        id_asunto: '',
        miembros: [0],
        asuntos: [],
        encargo: [],
    });

    //console.log(data.alturaImagen)

    const [filterText, setFilterText] = useState('');
    const [filterAutoridad, setFilterAutoridad] = useState('');

    const filtroPersona = persona.filter(
        item => item.c_dni.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoP.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoM.toLowerCase().includes(filterText.toLowerCase())
            || item.c_nombres.toLowerCase().includes(filterText.toLowerCase())
    );

    const filtroAutoridad = autoridad.filter(
        item => item.c_nombreAutoridad.toLowerCase().includes(filterAutoridad.toLowerCase())
    );

    function handleSubmit(e) {
        e.preventDefault();

        listaMiembros.map(lis => {
            data.miembros.push(lis.id)
        })

        Inertia.post(route('r.resoluciones.store'), {
            _method: 'post',

            id_tipoSesion: data.id_tipoSesion,
            id_tipoResolucion: data.id_tipoResolucion,
            //id_carreraProfesional: data.id_carreraProfesional,
            //id_sede: data.id_sede,
            numeroResolucion: data.numeroResolucion,
            fechaResolucion: data.fechaResolucion,
            miembros: data.miembros,
            asuntos: listaAsuntos,
        })

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    //PARTICIPANTES
    function agregar_participantes(id) {
        if (id) {
            const busqueda = persona.find(element => element.id_persona == id);
            //console.log(busqueda)
            const repetido = listaMiembros.find(lista => lista.id == id);
            if (!repetido) {
                listaMiembros.push({
                    'id': busqueda.id_persona,
                    'codigo': busqueda.c_codMatricula,
                    'nombre': busqueda.c_nombres + ' ' + busqueda.c_apellidoP + ' ' + busqueda.c_apellidoM,
                    'facultad': busqueda.c_nomFacultad,
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
    function mover_arriba_participante(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        const aux_pos1 = listaMiembros[indiceItem]
        const aux_pos2 = listaMiembros[indiceItem - 1]

        listaMiembros.splice(indiceItem - 1, 1, aux_pos1)
        listaMiembros.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }
    function mover_abajo_participante(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        const aux_pos1 = listaMiembros[indiceItem]
        const aux_pos2 = listaMiembros[indiceItem + 1]

        listaMiembros.splice(indiceItem + 1, 1, aux_pos1)
        listaMiembros.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }
    function estado_lista_miembro_inicio(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_miembro_fin(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        if (indiceItem == (listaMiembros.length - 1)) {
            return true
        }
    }

    //ASUNTOS
    function agregar_asunto(cod) {

        var descripcion = data.asuntoResolucion
        var imagen = data.imagenResolucion
        var altura = data.alturaImagen

        if (cod) {
            const busqueda = tipo_asunto.find(element => element.id_tipoAsunto == cod);

            listaAsuntos.push({
                'cod': Date(),
                'id': busqueda.id_tipoAsunto,
                'nombre': busqueda.c_nombreTipoAsunto,
                'descripcion': descripcion,
                'imagen': imagen,
                'altura': altura,
            })

            localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
        }
    }
    function editar_asunto(cod) {
        var indiceEditar = listaAsuntos.findIndex(item => item.cod === cod)
        var aux = listaAsuntos[indiceEditar]
        //añadir formulario con sweet alert
    }
    function eliminar_asunto(cod) {
        var indiceBorrado = listaAsuntos.findIndex(item => item.cod === cod)
        listaAsuntos.splice(indiceBorrado, 1)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_arriba_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem - 1]

        listaAsuntos.splice(indiceItem - 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_abajo_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem + 1]

        listaAsuntos.splice(indiceItem + 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function estado_lista_asunto_inicio(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_asunto_fin(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == (listaAsuntos.length - 1)) {
            return true
        }
    }

    //ENCARGOS
    function agregar_encargo(id) {
        if (id) {
            const busqueda = autoridad.find(element => element.id_autoridad == id);
            //console.log(busqueda)
            const repetido = listaEncargo.find(lista => lista.id == id);
            if (!repetido) {
                listaEncargo.push({
                    'id': busqueda.id_autoridad,
                    'articulo': busqueda.c_articuloAutoridad,
                    'nombre': busqueda.c_nombreAutoridad,
                })
            }
            localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
        }
    }
    function eliminar_encargo(id) {
        var indiceBorrado = listaEncargo.findIndex(item => item.id === id)
        listaEncargo.splice(indiceBorrado, 1)
        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function mover_arriba_encargo(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        const aux_pos1 = listaEncargo[indiceItem]
        const aux_pos2 = listaEncargo[indiceItem - 1]

        listaEncargo.splice(indiceItem - 1, 1, aux_pos1)
        listaEncargo.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function mover_abajo_encargo(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        const aux_pos1 = listaEncargo[indiceItem]
        const aux_pos2 = listaEncargo[indiceItem + 1]

        listaEncargo.splice(indiceItem + 1, 1, aux_pos1)
        listaEncargo.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function estado_lista_encargo_inicio(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_encargo_fin(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        if (indiceItem == (listaEncargo.length - 1)) {
            return true
        }
    }

    //Descripción de ENCARGO
    var descripcion = ""
    listaEncargo.map(encargo => {
        descripcion += encargo.articulo + " " + encargo.nombre + ", "
    })
    descripcion += "y demás Instancias Académicas y Administrativas, el cumplimiento de la presente Resolución."

    //Agregar ASUNTO - ENCARGO
    function agregar_asunto_encargo() {

        var descripcion_asunto = descripcion

        listaAsuntos.push({
            'cod': Date(),
            'id': 3,
            'nombre': 'ENCARGAR',
            'descripcion': descripcion_asunto,
            'imagen': null,
            'altura': '',
        })

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

    }
    return (
        <Navbar auth={auth}>
            <Head title="Resoluciones" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Registrar Resolución'} icono={faFileWord} />
                <BotonVolver ruta={'r.resoluciones'} />
            </div>
            <div className="flex">
                <div className="w-7/12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-10 py-4 border-b border-gray-200">
                            <hr className='my-4' />

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="">
                                    {/* Miembros Resolucion */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Estudiante </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar por Nombre o DNI"
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

                                        <div className="flex flex-col my-auto col-span-1 text-slate-400">
                                            <Link onClick={() => agregar_participantes(data.id_persona)} className='flex m-auto hover:text-slate-600'>
                                                <FontAwesomeIcon className="h-6" icon={faUserPlus} />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaMiembros.length != 0 &&
                                        <div className='my-2'>
                                            <label className="my-auto text-lg text-slate-400"> <strong>Lista de Estudiantes Seleccionados</strong> </label>
                                            <div className="flex flex-col my-auto">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400 text-center'>
                                                            <th></th>
                                                            <th>Código</th>
                                                            <th>Facultad</th>
                                                            <th>Nombre Completo</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaMiembros.map((miembro) =>
                                                                <tr key={miembro.id} className="">
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto h-6 text-slate-400'>
                                                                            {!estado_lista_miembro_fin(miembro.id) ?
                                                                                <Link onClick={() => mover_abajo_participante(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowDown} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }
                                                                            {!estado_lista_miembro_inicio(miembro.id) ?
                                                                                <Link onClick={() => mover_arriba_participante(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowUp} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.codigo}</td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.facultad}</td>
                                                                    <td className='text-left pl-4 border-slate-400 border-[1px]'>{miembro.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto text-red-500'>
                                                                            <Link onClick={() => eliminar_participante(miembro.id)} className='flex m-auto w-7 h-6'>
                                                                                <FontAwesomeIcon className="m-auto h-4 hover:text-red-800" icon={faUserMinus} />
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

                                    <hr className="my-4" />

                                    {/* Tipo de Sesión - Resolución*/}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Tipo Sesión </label>
                                        <div className="flex flex-col my-auto col-span-4">
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

                                        <label className="col-span-2 my-auto">Tipo Resolución </label>
                                        <div className="flex flex-col my-auto col-span-4">
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

                                    {/* Número y Fecha de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">N° Resolución </label>
                                        <div className="flex flex-col my-auto col-span-4" id='fecha-input'>
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
                                        <label className="col-span-2 my-auto mx-auto">Fecha </label>
                                        <div className="flex flex-col my-auto col-span-4">
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

                                    <hr className="my-4" />

                                    {/* Asunto Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Se resuelve: </strong>
                                        {   
                                            (data.id_asunto != '') &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_asunto(data.id_asunto)} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </div>

                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <div className="flex flex-col col-span-3">
                                            <select
                                                id='id_asunto'
                                                name='id_asunto'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_asunto', e.target.value)
                                                }
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_asunto.map(tip => {
                                                        return (
                                                            <option key={tip.id_tipoAsunto} value={tip.id_tipoAsunto}>{tip.c_nombreTipoAsunto}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div className="flex flex-col col-span-9">
                                            <textarea
                                                type="text"
                                                className="p-2 text-gray-500"
                                                onChange={(e) =>
                                                    setData('asuntoResolucion', e.target.value)
                                                }

                                            ></textarea>
                                            {
                                                data.id_asunto == 1 &&
                                                <div className='grid grid-cols-12 gap-4 my-4'>
                                                    <label className="col-span-2 my-auto">Imagen </label>
                                                    <div className="flex flex-col col-span-6 border-[1px] border-current">
                                                        <input
                                                            type="file"
                                                            className="w-full px-4 py-2"
                                                            onChange={(e) =>
                                                                setData("imagenResolucion", e.target.files[0])
                                                            }
                                                        />
                                                    </div>
                                                    <label className="col-span-2 my-auto text-right">Altura(px) </label>
                                                    <div className="flex flex-col col-span-2">
                                                        <input
                                                            type="number"
                                                            className="w-full px-4 py-2"
                                                            defaultValue={80}
                                                            min={40}
                                                            onChange={(e) =>
                                                                setData("alturaImagen", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </div>




                                    </div>

                                    <hr className="my-4" />

                                    {/* Encargo Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Se Encarga: </strong>
                                        {
                                            listaEncargo.length != 0 &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_asunto_encargo()}

                                                    className='flex mx-auto bg-yellow-500 hover:bg-yellow-600 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }

                                    </div>

                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaEncargo.length != 0 &&
                                        <div className='my-2'>
                                            <label className="my-auto text-lg text-slate-400"> <strong>Lista de Autoridades Seleccionadas</strong> </label>
                                            <div className="flex flex-col my-auto">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400 text-center'>
                                                            <th></th>
                                                            <th>Descripción</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaEncargo.map((miembro) =>
                                                                <tr key={miembro.id} className="">
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto h-6 text-slate-400'>
                                                                            {!estado_lista_encargo_fin(miembro.id) ?
                                                                                <Link onClick={() => mover_abajo_encargo(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowDown} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }
                                                                            {!estado_lista_encargo_inicio(miembro.id) ?
                                                                                <Link onClick={() => mover_arriba_encargo(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-slate-600" icon={faArrowUp} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto text-red-500'>
                                                                            <Link onClick={() => eliminar_encargo(miembro.id)} className='flex m-auto w-7 h-6'>
                                                                                <FontAwesomeIcon className="m-auto h-4 hover:text-red-800" icon={faUserMinus} />
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

                                    <div className='grid grid-cols-12 gap-2 col-span-9 mt-5'>
                                        <label className="col-span-2 my-auto">Autoridad: </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar"
                                                onChange={(e) => setFilterAutoridad(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex flex-col my-auto col-span-5">
                                            <select
                                                id='id_autoridad'
                                                name='id_autoridad'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_autoridad', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    filtroAutoridad.map(aut => {
                                                        return (
                                                            <option key={aut.id_autoridad} value={aut.id_autoridad}>{aut.c_nombreAutoridad}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="flex flex-col my-auto col-span-1 text-slate-400">
                                            <Link onClick={() => agregar_encargo(data.id_autoridad)}
                                                className='flex m-auto hover:text-slate-600'>
                                                <FontAwesomeIcon className="h-8 w-10" icon={faPersonCirclePlus} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Archivo de Resolución 
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
                                    </div>*/}

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
                    </div>
                </div>
            </div >
        </Navbar >
    )
}

export default Registrar