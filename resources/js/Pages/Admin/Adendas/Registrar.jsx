import React from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm } from '@inertiajs/inertia-react';
import BotonVolver from '@/Components/Botones/BotonVolver';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

const Registrar = ({ auth }) => {

    const { data, setData, errors, put, progress } = useForm({
        codigo_adenda: '',
        empresa: '',
        id_empresa: '',
        direccion_empresa: '',
        correo_empresa: '',
        representante_empresa: '',
        telefono_empresa: '',
        inicio_contrato: '',
        fin_contrato: '',
        precio_contrato: '',
        archivo_contrato: null,
        observacion_contrato: '',
    });

    //console.log(data.codigo_contrato)
    //console.log(data)

    function handleSubmit(e) {
        e.preventDefault();

        Inertia.post(route('r.resoluciones.store'), {
            _method: 'post',

            //codigo_contrato: data.codigo_contrato,
        })

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title="Adendas" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Registrar Contrato'} icono={faToggleOn} />
                <BotonVolver ruta={'r.adendas'} />
            </div>
            <div className="w-8/12">
                <div className="mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-10 py-4">

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className=''>
                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Contrata</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar"
                                                //onChange={(e) => setData('codigo_adenda', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col my-auto col-span-3">
                                            <select
                                                id='id_contrata'
                                                name='id_contrata'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                //onChange={(e) => setData('id_contrata', e.target.value)}
                                                //required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {/*
                                                    filtroPersona.map(per => {
                                                        return (
                                                            <option key={per.id_persona} value={per.id_persona}>{per.c_apellidoP + " " + per.c_apellidoM + ", " + per.c_nombres + " - " + per.c_dni}</option>
                                                        )
                                                    })
                                                */}
                                            </select>
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Convenio</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar"
                                                //onChange={(e) => setData('codigo_adenda', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col my-auto col-span-3">
                                            <select
                                                id='id_convenio'
                                                name='id_convenio'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                //onChange={(e) => setData('id_convenio', e.target.value)}
                                                //required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {/*
                                                    filtroPersona.map(per => {
                                                        return (
                                                            <option key={per.id_persona} value={per.id_persona}>{per.c_apellidoP + " " + per.c_apellidoM + ", " + per.c_nombres + " - " + per.c_dni}</option>
                                                        )
                                                    })
                                                */}
                                            </select>
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Adenda</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Código Contrata"
                                                onChange={(e) => setData('codigo_adenda', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-1 m-auto">Empresa</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Empresa"
                                                onChange={(e) => setData('empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Dirección</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Dirección"
                                                onChange={(e) => setData('direccion_empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-1 m-auto">Correo</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="email"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Correo"
                                                onChange={(e) => setData('correo_empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Representante</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Representante"
                                                onChange={(e) => setData('representante_empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-1 m-auto">Teléfono</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Teléfono"
                                                onChange={(e) => setData('telefono_empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Inicia</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) => setData('inicio_contrato', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-1 m-auto">Finaliza</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) => setData('fin_contrato', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Precio (S/.)</label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Precio"
                                                onChange={(e) => setData('precio_contrato', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-1 m-auto">Archivo </label>
                                        <div className="flex flex-col my-auto col-span-2">
                                            <input
                                                type="file"
                                                className="w-full px-4 py-2 text-gray-500 border-black border-[1px]"
                                                onChange={(e) => setData('telefono_empresa', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* */}
                                    <div className='grid grid-cols-6 gap-6 my-5'>
                                        <label className="col-span-1 m-auto">Observación</label>
                                        <div className="flex flex-col my-auto col-span-5">
                                            <textarea
                                                type="number"
                                                className="w-full px-4 py-2 text-gray-500"
                                                onChange={(e) => setData('observacion_contrato', e.target.value)}

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