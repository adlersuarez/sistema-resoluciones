import React from 'react';

export default function TablaCeldasVistaPrevia({ celdas }) {

    //console.log(celdas.elementoActividad)

    if (celdas.elementoActividad.tipo == 1) {
        return (
            <>
                <tr>
                    <td className="border p-0" rowSpan={celdas.elementoActividad.datos.length}>
                        {celdas.elementoActividad.actividad}
                    </td>
                    <td className="border p-2">
                        {celdas.elementoActividad.datos[0].fechaDel}
                    </td>
                    <td className="border p-2">
                        {celdas.elementoActividad.datos[0].fechaAl}
                    </td>
                    <td className="border p-2">
                        {celdas.elementoActividad.datos[0].duracion}
                    </td>
                    <td className="border p-2">
                        {celdas.elementoActividad.datos[0].detalle}
                    </td>
                    <td className='border p-0' rowSpan={celdas.elementoActividad.datos.length}>
                        
                    </td>
                </tr>

                {/*<TableAdd />*/}
                {
                    celdas.elementoActividad.datos.map((actividad, index) => (
                        index != 0 &&
                        <tr key={index} className="mb-4 border p-4">
                            <td className="border p-2">
                                {actividad.fechaDel}
                            </td>
                            <td className="border p-2">
                                {actividad.fechaAl}
                            </td>
                            <td className="border p-2">
                                {actividad.duracion}
                            </td>
                            <td className="border p-2">
                                {actividad.detalle}
                            </td>

                        </tr>
                    ))
                }
            </>
        );
    }

    if (celdas.elementoActividad.tipo == 2) {
        return (
            <>
                <tr>
                    <td className="border p-0" colSpan={5}>
                        {celdas.elementoActividad.actividad}
                    </td>
                    <td className='border p-0'>
                        
                    </td>
                </tr>
            </>
        );
    }

    if (celdas.elementoActividad.tipo == 3) {
        return (
            <>
                <tr>
                    <td className="border p-0">
                        {celdas.elementoActividad.actividad}
                    </td>
                    <td className="border p-2" colSpan={4}>
                        {celdas.elementoActividad.general}
                    </td>
                    <td className='border p-0'>
                        
                    </td>
                </tr>
            </>
        );
    }

    if (celdas.elementoActividad.tipo == 4) {
        return (
            <>
                <tr>
                    <td className="border p-0">
                        {celdas.elementoActividad.actividad}
                    </td>
                    <td className="border p-2">
                        {celdas.elementoActividad.datos[0].fechaDel}
                    </td>
                    <td className="border p-2" colSpan={3}>
                    </td>
                    <td className='border p-0'>
                        
                    </td>
                </tr>

            </>
        );
    }
};