import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Head, useForm } from '@inertiajs/inertia-react';
//import route from "vendor/tightenco/ziggy/src/js";
import { Inertia } from '@inertiajs/inertia';


export default function TemplateRevPagos({solicitudes ,estado}) {

    console.log(estado)

    const { data, setData, post } = useForm({
        c_archivoBoucher: null,
        c_codigoBoucher: null,
    })
    const [preview, setPreview] = useState('');
    const onSelectedFile = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        console.log(url);
        setPreview(url);
    }
    var form_activo = true
    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route('subirBoucher', `${solicitudes.id_solicitud}`), {
            _method: 'put',
            c_archivoBoucher: data.c_archivoBoucher,
            c_codigoBoucher: data.c_codigoBoucher,

        })
        if (solicitudes.c_archivoBoucher != null && solicitudes.c_codigoBoucher != null) {
            form_activo = false
        }
    }
    return (
        <div className="">

            <div className="flex my-4 mx-auto justify-center">
                {
                    estado[1] ?
                        <span className="flex bg-[#26b594] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                            <strong className="flex my-auto">
                                El proceso de su solicitud continuara, se valido correctamente el boucher y el codigo de pago:
                            </strong>
                        </span>
                        :
                        <span className="flex bg-[#e8b962] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                            <strong className="flex my-auto">
                                Para continuar con el proceso de su solicitud, debe subir el baucher mas el codigo de pago y esperar la validación del pago:
                            </strong>
                        </span>
                }
            </div>
            <div className="flex my-5 mx-10">
                <div className="w-1/2 p-5 border-r-2">
                    {   
                        solicitudes.c_archivoBoucher==null ?
                        <form action="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-3 mb-5">
                                <label className="flex m-auto">
                                    <strong>CÓDIGO DE PAGO</strong>
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-1/2 px-4 py-2 text-black"
                                    label="cod_boucher_fut"
                                    placeholder="Código de Boucher"
                                    onChange={(e) =>
                                        setData("c_codigoBoucher", e.target.value)
                                    }
                                />
                            </div>
                            <hr className="my-5" />
                            <div className="">
                                <label>
                                    <strong>ARCHIVO</strong>
                                </label>
                                <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group'>
                                    <div className='flex flex-col items-center justify-center pt-7'>
                                        <svg className="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <p className='text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider'>Suba el boucher de pago</p>
                                    </div>
                                    <input
                                        type="file"
                                        className='hidden'
                                        label="imagen"
                                        name="imagen"
                                        onChange={(e) => {
                                            setData("c_archivoBoucher", e.target.files[0]);
                                            onSelectedFile(e)
                                        }
                                        }
                                    />

                                </label>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="px-3 py-2 font-bold text-white bg-blue-500 rounded"
                                >
                                    <FontAwesomeIcon className="h-5 w-5 mr-2" icon={faUpload} />
                                    Subir Boucher
                                </button>
                            </div>
                        </form>
                        :
                        <form action="createForm" onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-3 mb-5">
                                <label className="flex m-auto">
                                    <strong>CÓDIGO DE PAGO</strong>
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="w-1/2 px-4 py-2 text-black"
                                    value={solicitudes.c_codigoBoucher}
                                />
                            </div>
                        </form>
                    }
                </div>
                <div className="w-1/2">
                    <div className="flex m-auto justify-center">
                        {
                            solicitudes.c_archivoBoucher != null ?
                                <embed src={`/documentos/pagos/${solicitudes.c_archivoBoucher}`} style={{ width: '300px', height: "300px" }} />
                                :
                                preview && <embed src={`${preview}`} style={{ width: '300px', height: '300px' }} />
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}