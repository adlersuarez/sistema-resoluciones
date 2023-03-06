import React, {  useState } from 'react'
import Navbar from '@/Layouts/Navbar';
import { Head, useForm, Link } from '@inertiajs/inertia-react';



const Create = ({auth,users,ofis,rols}) => {
    // console.log(rols)
    const [preview, setPreview] = useState('');
    const {data, setData, errors, post, progress} = useForm({
        ID_Rol:"",
        ID_Oficina:"",
        name:"",        
        email:"",
        password:"",

    });

function handleSubmit(e){
    e.preventDefault();
    post(route('d.usuarios.store'))
}

const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
};

  return (
    <Navbar auth={auth}>
        <Head title='Crear Usuario'/>
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={ route("d.usuarios.index") }
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
                                        {/* <input
                                            type="text"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="Nombre_Oficina"
                                            name="Nombre_Oficina"
                                            value={data.Nombre_Oficina}
                                            onChange={(e) =>
                                                setData("Nombre_Oficina", e.target.value)
                                            }
                                        /> */}
                                        <select 
                                            id ='Nombre_Oficina' 
                                            label="Nombre_Oficina"
                                            name='Nombre_Oficina'  
                                            forInput="Nombre_Oficina"
                                            className='block w-full bg-white border h-10 '
                    
                                            onChange={(e) =>
                                                setData('ID_Oficina', e.target.value)
                                            }
                                            
                                            required
                                            >
                                            
                                            <option value="" disabled selected='true'>seleccione una oficina</option>
                                             
                                            
                                            {
                                            ofis.map(ofi => {
                                                return(
                                                    <option key={ofi.ID_Oficina} value={ofi.ID_Oficina}>{ofi.Nombre_Oficina}</option>
                                                )
                                            })
                                            }
                                            
                                        </select>
                                            
                                        <span className="text-red-600">
                                            {errors.Nombre_Oficina}
                                        </span>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="rol">Rol</label><br />

                                        <select
                                            id ='ID_Rol' 
                                            name='ID_Rol'  
                                            className='block w-full bg-white border   h-10  py'
                                            label="ID_Rol"
                                            forInput="ID_Rol"
                                            onChange={(e) =>
                                                setData('ID_Rol', e.target.value)
                                            }
                                            required
                                        >
                                            <option value="" disabled selected='true'>seleccione un rol</option>
                                            {
                                                rols.map( rol => {
                                                    return (
                                                        <option key={rol.ID_Rol} value={rol.ID_Rol}>{rol.Nombre_Rol}</option>
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
                                            type="email"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="email"
                                            name="email"
                                            required
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
                                            // type="password"
                                            // name="password"
                                            // value={data.password}
                                            // className="mt-1 block w-full"
                                            // autoComplete="new-password"
                                            handleChange={onHandleChange}
                                            required
                                            type="password"
                                            className="w-full px-4 py-2 text-gray-500"
                                            label="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
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
                                    {/* {console.log(data)} */}
                                </div>
                            </form>
                            

                        </div>
                    </div>
                </div>
            </div>
    </Navbar>
  )
}

export default Create