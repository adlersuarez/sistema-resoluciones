import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDownload ,faClock } from '@fortawesome/free-solid-svg-icons';


export default function TemplateFinal({solicitudes, detalle_solicitud,estado}) {
    return (
        <div className="w-full text-center">

            {
                solicitudes.id_estadoSolicitud == 2 ?
                    <div>
                        <div>
                            <span className="flex bg-[#26b594] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                                <strong className="flex my-auto">
                                    Su solicitud ha llegado a la etapa final exitosamente, puede descargar su constancia con un click en el siguiente boton.
                                </strong>
                            </span>
                        </div>
                        <div className="pt-3">
                            <FontAwesomeIcon className="text-green-600" icon={faCheck} size="3x" />
                        </div>
                        <div className="w-1/2 flex m-auto justify-center ">
                            <div className="flex flex-col py-3">
                                <a
                                    className="px-3 py-2 text-white text-center bg-[#007CBC] rounded-md focus:outline-none hover:bg-[#0064bc] font-bold"
                                    target="_self"
                                    href={`/documentos/constancia/no-adeudo/${detalle_solicitud.c_constanciaNA}`}
                                    download={detalle_solicitud.c_constanciaNA}
                                >
                                    <FontAwesomeIcon className="h-4 w-4 mr-3" icon={faDownload} />
                                    DESCARGAR CONSTANCIA DE NO ADEUDO
                                </a>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <span className="flex bg-[#e8b962] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                                <strong className="flex my-auto">
                                    Su solicitud ha llegado a la etapa final exitosamente, espere la generacion de la constancia de no adeudo.
                                </strong>
                            </span>
                        </div>
                        <div className="pt-3">
                            <FontAwesomeIcon className="text-orange-600" icon={faClock} size="3x" />
                        </div>
                        <div className="w-1/2 flex m-auto justify-center ">
                            <div className="flex flex-col py-3">
                                <a
                                    className="px-3 py-2 text-white text-center bg-[#007CBC] 
                                    rounded-md focus:outline-none cursor-not-allowed
                                    hover:bg-[#0064bc] font-bold"
                                    target="_self"
                                    href="#"
                                >
                                    <FontAwesomeIcon className="h-4 w-4 mr-3" icon={faDownload} />
                                    DESCARGAR CONSTANCIA DE NO ADEUDO
                                </a>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
