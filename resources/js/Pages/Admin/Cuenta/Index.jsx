import React, { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, useForm } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faEye, faEyeDropper, faEyeSlash, faHomeUser, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Index({ usuario, auth }) {

    const [preview, setPreview] = useState('');
    const [vistaPass1, setVistaPass1] = useState(false);
    const [vistaPass2, setVistaPass2] = useState(false);

    const { data, setData, errors, put, progress } = useForm({
        username: usuario.username,
        email: usuario.email,
        c_dni: usuario.c_dni,
        c_apellidoP: usuario.c_apellidoP,
        c_apellidoM: usuario.c_apellidoM,
        c_nombres: usuario.c_nombres,
        c_numTelefono: usuario.c_numTelefono,
        //c_numCelular: usuario.c_numCelular,
        link_imagen: usuario.imagen_perfil,
        imagen_perfil: null,
        c_email: usuario.c_email,
        password: '',
        rep_password: '',
    });

    //console.log(data.link_imagen)

    function handleSubmit(e) {
        e.preventDefault();

        if (data.password === data.rep_password) {

            if (data.password != '') {

                Inertia.post(route('u.usuarioPersonal.update'), {
                    _method: 'put',

                    username: data.username,
                    password: data.password,
                    c_numTelefono: data.c_numTelefono,
                    c_email: data.c_email,
                    imagen_perfil: data.imagen_perfil,
                })

            } else {
                Inertia.post(route('u.usuarioPersonal.update'), {
                    _method: 'put',

                    username: data.username,
                    c_numTelefono: data.c_numTelefono,
                    c_email: data.c_email,
                    imagen_perfil: data.imagen_perfil,
                })
            }

            Array.from(document.querySelectorAll("#pass,#r_pass")).forEach(
                input => (input.value = "")
            );

            Swal.fire({
                icon: 'success',
                title: 'Datos de Usuario Actualizados',
                showConfirmButton: false,
                timer: 1500,
            })

        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña debe ser la misma',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    }

    const onSelectedFile = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
    }

    return (
        <Navbar auth={auth}>
            <Head title='Cuenta Personal' />
            <div className='w-full flex justify-center mt-10 mb-5'>
                <TitlePages texto={'Perfil personal'} icono={faHomeUser} />
            </div>
            <div className="mx-auto overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB] w-7/12 px-5">
                <form name="updateForm" onSubmit={handleSubmit}>
                    <div className="">
                        <h1 className='font-black text-2xl text-slate-500'>DATOS PERSONALES</h1>
                        <div className='grid grid-cols-2 gap-16 my-6'>
                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">DNI</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700 bg-slate-200"
                                    value={data.c_dni}
                                    readOnly
                                />
                            </div>

                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">Nombres</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700 bg-slate-200"
                                    value={data.c_nombres}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-16 my-6'>
                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">Apellido Paterno</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700 bg-slate-200"
                                    value={data.c_apellidoP}
                                    readOnly
                                />
                            </div>

                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">Apellido Materno</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700 bg-slate-200"
                                    value={data.c_apellidoM}
                                    readOnly
                                />
                            </div>
                        </div>

                        <h1 className='font-black text-2xl text-slate-500'>DATOS DE CONTACTO</h1>

                        <div className='grid grid-cols-2 gap-16 my-6'>
                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">Teléfono</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700"
                                    value={data.c_numTelefono}
                                    onChange={(e) =>
                                        setData('c_numTelefono', e.target.value)
                                    }
                                />
                            </div>

                            <div className="my-auto grid grid-cols-4">
                                <label className="col-span-1 my-auto">Correo</label>
                                <input
                                    type="text"
                                    className="col-span-3 w-full px-4 py-2 text-gray-700"
                                    value={data.c_email}
                                    onChange={(e) =>
                                        setData('c_email', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <h1 className='font-black text-2xl text-slate-500'>DATOS DE USUARIO</h1>

                        <div className='grid grid-cols-2 gap-16 my-6'>
                            <div className="my-auto">
                                <div className='grid grid-cols-4 mb-6'>
                                    <label className="col-span-1 my-auto">Username</label>
                                    <input
                                        type="text"
                                        className="col-span-3 w-full px-4 py-2 text-gray-500"
                                        value={data.username}
                                        onChange={(e) =>
                                            setData('username', e.target.value)
                                        }
                                    />
                                </div>
                                <h2 className='font-bold mt-6 mb-2 text-slate-400'>CAMBIO DE CONTRASEÑA</h2>
                                <div className='grid grid-cols-4 mb-6 relative'>
                                    <label className="col-span-1 my-auto">Nuevo Password</label>
                                    <input
                                        id="pass"
                                        type={vistaPass1 ? 'text' : 'password'}
                                        placeholder='. . . Contraseña'
                                        className="col-span-3 w-full px-4 py-2 text-gray-500"
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                    />
                                    <div onClick={(e)=>setVistaPass1(!vistaPass1)} className='absolute top-3 right-3 text-slate-500 cursor-pointer'>
                                        { vistaPass1 ?
                                            <FontAwesomeIcon className="h-4" icon={faEyeSlash} />
                                            :
                                            <FontAwesomeIcon className="h-4" icon={faEye} />
                                        }
                                    </div>
                                </div>

                                <div className='grid grid-cols-4 mb-6 relative'>
                                    <label className="col-span-1 my-auto">Repetir Password</label>
                                    <input
                                        id="r_pass"
                                        type={vistaPass2 ? 'text' : 'password'}
                                        placeholder='. . . Repetir la contraseña'
                                        className="col-span-3 w-full px-4 py-2 text-gray-500"
                                        onChange={(e) =>
                                            setData('rep_password', e.target.value)
                                        }
                                        required={data.password != '' ? true : false}
                                    />
                                    <div onClick={(e)=>setVistaPass2(!vistaPass2)} className='absolute top-3 right-3 text-slate-500 cursor-pointer'>
                                        { vistaPass2 ?
                                            <FontAwesomeIcon className="h-4" icon={faEyeSlash} />
                                            :
                                            <FontAwesomeIcon className="h-4" icon={faEye} />
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="h-full pl-16 pr-12 flex flex-col border-l-[1px] border-slate-900">
                                <label className="my-auto text-center w-full">Imagen Perfil</label>

                                {(!data.link_imagen || preview) ?

                                    <div className='h-40 my-2 border-[1px] border-slate-300 flex justify-center'>
                                        {preview && <img src={`${preview}`} alt="" className='object-cover h-full' />}
                                    </div>
                                    :
                                    <div className='h-40 my-2 border-[1px] border-slate-300 flex justify-center'>
                                        <img src={`/images/perfil/${data.link_imagen}`} alt="" className='object-cover h-full' />
                                    </div>
                                }

                                <input
                                    type="file"
                                    className="border-[1px] border-slate-300 p-1"
                                    label="imagen"
                                    name="imagen"
                                    onChange={(e) => {
                                        setData("imagen_perfil", e.target.files[0]);
                                        onSelectedFile(e)
                                    }
                                    }
                                />
                            </div>

                        </div>

                        <div className="flex mx-auto mt-4 justify-center">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold w-50 text-white bg-[#007CBC] rounded hover:bg-[#0064bc]"
                            >
                                Actualizar Datos
                            </button>
                        </div>

                    </div>
                </form>
            </div>

        </Navbar>
    );
}