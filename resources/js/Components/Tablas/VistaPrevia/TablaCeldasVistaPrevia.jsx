
import React from 'react';

export default function TablaCeldasVistaPrevia({ celdas }) {

    console.log(celdas)
    console.log(celdas.elementoActividad.datos)

    return (
        <>
            <tr>
                <td className="border p-0" rowSpan={2}>
                    actividad
                </td>
                <td className="border p-2">
                    fecha del
                </td>
                <td className="border p-2">
                    fecha al
                </td>
                <td className="border p-2">
                    duracion
                </td>
                <td className="border p-2">
                    detalle
                </td>
                <td className='border p-0' rowSpan={2}>
                    editar
                </td>
            </tr>

            {/*<TableAdd />*/}
            {/*activities.map((activity, index) => (
                <tr key={index} className="mb-4 border p-4">
                    <td className="border p-2">
                       fecha del
                    </td>
                    <td className="border p-2">
                        fecha al
                    </td>
                    <td className="border p-2">
                        duracion
                    </td>
                    <td className="border p-2">
                        detalle
                    </td>

                </tr>
            ))*/}
        </>
    );
};