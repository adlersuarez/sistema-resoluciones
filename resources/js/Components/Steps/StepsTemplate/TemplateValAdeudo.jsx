import React from "react";
import SpanEstadoDeudaTabla from "@/Components/Span/SpanEstadoDeudaTabla";

export default function TemplateValAdeudo({noAdeudo,estado}) {

    var estado_adeudo=[
        {
            id:1,
            dependencia:'ORyM',
            detalle:'Archivo estudiantil',
            valor:noAdeudo.b_estadoAE,
        },
        {
            id:2,
            dependencia:'OEyF',
            detalle:'Caja (pensiones de enseñanza y otros)',
            valor:noAdeudo.b_estadoOEF,
        },
        {
            id:3,
            dependencia:'DURS',
            detalle:'Proyección social y otros',
            valor:noAdeudo.b_estadoPAI,
        },
        {
            id:4,
            dependencia:'Facultades',
            detalle:'Laboratorios - Biblioteca',
            valor:noAdeudo.b_estadoFac,
        },
    ]

    return (
        <div className="">
            <div className="flex my-4 mx-auto justify-center">
                {
                    estado[2]?
                    <span className="flex bg-[#26b594] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                        <strong className="flex my-auto">
                            Todos los documentos necesarios para tramitar su solicitud han sido validados, espere la genereacion de su constancia:
                        </strong> 
                    </span>
                    :
                    <span className="flex bg-[#e8b962] text-white w-10/12 mx-auto justify-center rounded-lg h-10">
                        <strong className="flex my-auto">
                            Para continuar con el proceso de su solicitud, se debe validar los siguiente documentos:
                        </strong> 
                    </span>
                }
            </div>

            <div className="flex mx-auto">
                <table className="text-xs md:text-sm text-left text-gray-500 mx-10 w-full border-2">
                    <thead className="text-xs text-white uppercase bg-[#0064bc]">
                        <tr className="border-2">
                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{ borderRight: '1px solid white' }}>
                                Documentos necesarios
                            </th>
                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{ borderRight: '1px solid white' }}>
                                Estado
                            </th>
                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{ borderRight: '1px solid white' }}>
                                Archivo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            estado_adeudo.map(adeudo =>{
                                return(
                                    <tr key={adeudo.id} className="text-center py-4 px-4 md:px-6 border-2 h-14">
                                        <td className="">
                                            <strong>{adeudo.dependencia}</strong>
                                        </td>
                                        <td className="">
                                            <div className="flex mx-auto justify-center my-auto">
                                            {
                                                adeudo.detalle
                                            }
                                            </div>
                                        </td>
                                        <td className="flex mx-auto justify-center my-auto">
                                            <div className="flex m-auto align-middle pt-4">
                                                {
                                                    adeudo.valor?
                                                        <SpanEstadoDeudaTabla estado={adeudo.valor} texto={" "}/>
                                                        :
                                                        <>
                                                            <SpanEstadoDeudaTabla estado={adeudo.valor} texto={" "}/>
                                                            <p><a href={route('mostrarDocumentos')}>Regularizar Documentos</a></p>
                                                        </>
                                                }
                                                
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
