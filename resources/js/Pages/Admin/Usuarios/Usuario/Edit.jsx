import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

const Edit = ({ auth, usua, ofis, rols }) => {

    const [preview, setPreview] = useState('');
    const { data, setData, errors, put, progress } = useForm({
        ID_Rol: usua.ID_Rol,
        ID_Oficina: usua.ID_Oficina,
        name: usua.name,
        email: usua.email,
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        
        Inertia.post(route('d.usuarios.update', `${usua.id}`), {
            _method: 'put',
            ID_Rol: data.ID_Rol,
            ID_Oficina: data.ID_Oficina,
            name: data.name,
            email: data.email,
            password: data.password,
        })
        console.log(data)
        /* put(route("d.tipoequipos.update", `${equipo.ID_Tipo_Equipo}`)); */
    }
    return (
        <Navbar auth={auth}>
            <Head title='Editar Usuario' />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("d.usuarios.index")}
                                >
                                    Regresar
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Nombre</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Oficina</label>

                                        <select
                                            id='ID_Oficina'
                                            label='ID_Oficina'
                                            name='ID_Oficina'
                                            forInput='ID_Oficina'
                                            className='block w-full bg-white border   h-10  py'
                                            onChange={(e) =>
                                                setData("ID_Oficina", e.target.value)
                                            }
                                        >

                                            {/* <option value={data.ID_Oficina}>{data.Nombre_Oficina}</option> */}

                                            <option value="" disabled selected='true'>seleccione una oficina</option>
                                            {
                                                ofis.map(ofi => {

                                                    return (
                                                        ofi.ID_Oficina == usua.ID_Oficina ?
                                                            <option key={ofi.ID_Oficina} ofi={ofi.Nombre_Oficina} value={ofi.ID_Oficina} selected >{ofi.Nombre_Oficina}</option>
                                                            :
                                                            <option key={ofi.ID_Oficina} ofi={ofi.Nombre_Oficina} value={ofi.ID_Oficina} >{ofi.Nombre_Oficina}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                        <span className="text-red-600">
                                            {errors.ID_Oficina}
                                        </span>
                                    </div>
                                    {/* <div className="mb-4">
                                        <label className="">Cargo</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="Cargo_Oficina"
                                            name="Cargo_Oficina"
                                            value={data.Cargo_Oficina}
                                            onChange={(e) =>
                                                setData("Cargo_Oficina", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.Cargo_Oficina}
                                        </span>
                                    </div> */}
                                    <div className="mb-4">
                                        <label className="">Rol</label><br />

                                        <select
                                            id='ID_Rol'
                                            label='ID_Rol'
                                            name='ID_Rol'
                                            forInput='ID_Rol'
                                            className='block w-full bg-white border   h-10  py'
                                            onChange={(e) =>
                                                setData("ID_Rol", e.target.value)
                                            }
                                        >
                                            {/* <option value={data.ID_Rol}>{data.Nombre_Rol}</option> */}
                                            <option value="" disabled selected='true'>seleccione una oficina</option>
                                            {
                                                rols.map(rol => {

                                                    return (
                                                        rol.ID_Rol == usua.ID_Rol ?
                                                            <option key={rol.ID_Rol} ofi={rol.Nombre_Rol} value={rol.ID_Rol} selected >{rol.Nombre_Rol}</option>
                                                            :
                                                            <option key={rol.ID_Rol} ofi={rol.Nombre_Rol} value={rol.ID_Rol} >{rol.Nombre_Rol}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                        <span className="text-red-600">
                                            {errors.ID_Rol}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Contraseña</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="password"
                                            name="password"
                                            value={data.password}
                                            required
                                            onChange={(e) =>
                                                setData("password", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.password}
                                        </span>
                                    </div>
                                </div>
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default Edit