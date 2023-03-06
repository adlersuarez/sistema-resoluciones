import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';

export default function TemplateSolicitud({id,solicitudes}){

    return (
        <div className="w-full">
            <div className="flex my-4 mx-auto justify-center">
                {
                    solicitudes.c_archivoFut == null ?

                    <span className="flex bg-[#e8b962] text-white w-11/12 mx-auto justify-center rounded-lg h-10">
                        <strong className="flex my-auto">
                            Para continuar con el proceso de su solicitud, debe generar el FUT virtual
                        </strong> 
                    </span>
                    :
                    <span className="flex bg-[#26b594] text-white w-11/12 mx-auto justify-center rounded-lg h-10">
                        <strong className="flex my-auto">
                            Usted registro correctamente su solicitud, si desea puede descargar el FUT virtual.
                        </strong> 
                    </span>
                }
            </div>
            <div className="flex w-full">
                {
                    solicitudes.c_archivoFut == null?

                    <div className="w-full flex m-auto justify-center">
                        <div className="py-3">
                            <Link
                            className="px-3 py-2 text-white bg-blue-500 rounded-md focus:outline-none hover:bg-blue-700 font-bold"
                                href={ route('generarFUT',id) }
                            >
                                <FontAwesomeIcon className="h-5 w-5 mr-2" icon={faFilePdf}/>
                                GENERAR FUT
                            </Link>
                        </div> 
                    </div>              
                    :
                    <>
                        <div className="w-1/2 flex m-auto justify-center ">
                            <div className="flex flex-col py-3">                     
                                <a
                                className="px-3 py-2 text-white text-center bg-blue-500 rounded-md focus:outline-none hover:bg-blue-700 font-bold"
                                target="_self" 
                                href={`/documentos/constancia/fut/${solicitudes.c_archivoFut}`}
                                download={solicitudes.c_archivoFut}
                                >
                                    <FontAwesomeIcon className="h-4 w-4 mr-3" icon={faDownload}/>
                                    DESCARGAR FUT
                                </a>
                            </div>
                        </div>

                        <div className="w-1/2 flex m-auto align-middle justify-center border-l-2">
                            {
                                solicitudes.c_archivoFut != null &&
                                <embed src={`/documentos/constancia/fut/${solicitudes.c_archivoFut}`} style={{width:'200px',height:'275px'}} />
                            }
                            
                        </div>
                    </>
                }
            </div>
        </div>
    )
}