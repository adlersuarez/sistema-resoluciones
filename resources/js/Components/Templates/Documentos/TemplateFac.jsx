import React from "react";
import SpanDocumentoUser from "@/Components/Span/SpanDocumentoUser";

export default function TemplateFac({detTipPer}){
    return(
        <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
            <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                <thead className="text-xs text-white uppercase bg-[#0064bc]">
                    <tr>
                        <th scope="col" className="text-center py-3 ox-3 md:px-4" style={{ borderRight: '1px solit white' }}>
                            Oficina
                        </th>
                        <th scope="col" className="text-center py-3 ox-3 md:px-4" style={{ borderRight: '1px solit white' }}>
                            Estado
                        </th>
                        <th scope="col" className="text-center py-3 ox-3 md:px-4" style={{ borderRight: '1px solit white' }}>
                            Objetos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b">
                        <td className="py-4 px-4 md:px-6 text-lg">
                            Laboratorios - Biblioteca - Facultades
                        </td>
                        <td className="text-center py-4 px-4 md:px-6 text-lg">
                            <div className="flex w-full justify-center">
                                {
                                    detTipPer.b_estadoFac?
                                        <SpanDocumentoUser
                                            estado={1}
                                        />
                                        :
                                        <SpanDocumentoUser
                                            estado={0}
                                        />
                                }
                            </div>
                        </td>
                        <td className="text-center py-4 px-4 md:px-6 flex w-full justify-center">
                                -----
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}