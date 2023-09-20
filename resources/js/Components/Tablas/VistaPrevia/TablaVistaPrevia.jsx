import React from 'react';
import TablaCeldasVistaPrevia from './TablaCeldasVistaPrevia';

export default function TablaVistaPrevia({ datos }) {

    //console.log(datos)

    let elementos = [
        'ENFERMERÍA', 'ODONTOLOGÍA',
        'FARMACIA Y BIOQUÍMICA', 'NUTRICIÓN HUMANA',
        'MEDICINA VETERINARIA Y ZOOTECNIA', 'OBSTETRICIA',
        'PSICOLOGÍA (PRESENCIAL Y SEMIPRESENCIAL)', 'TECNOLOGÍA MÉDICA (LABORATORIO, TERAPIA, RADIOLOGÍA Y OPTOMETRÍA)',
    ]

    return (
        <div className='flex flex-col w-full mt-1'>

            <h1 className='font-bold text-sm'>CALENDARIO ACADÉMICO DE PRÁCTICAS PRE PROFESIONALES Y/O INTERNADO 2023-I</h1>
            <h2 className='font-bold text-sm'>HUANCAYO- LIMA</h2>

            <div className="grid grid-cols-2 gap-x-4 text-xs">
                {elementos.map((elemento, index) => (
                    <div key={index} className="rounded-lg flex-auto text-left">
                        {elemento}
                    </div>
                ))}
            </div>


            <table className="w-full border-collapse mt-2 h-0 text-xs">
                <thead>
                    <tr className="">
                        <th className="border p-1" rowSpan="2">ACTIVIDAD ACADÉMICA</th>
                        <th className="border p-1" colSpan="2">FECHA</th>
                        <th className="border p-1" rowSpan="2">DURACIÓN</th>
                        <th className="border p-1" rowSpan="2">DETALLE</th>
                        <th className=""></th>
                    </tr>
                    <tr className="">
                        <th className="border p-1">DEL</th>
                        <th className="border p-1">AL</th>
                        <th className=""></th>
                    </tr>
                </thead>
                <tbody>
                    {   datos &&
                        datos.map((dato , index) => (
                            <TablaCeldasVistaPrevia celdas={dato} key={index}/>
                        ))
                    }
                </tbody>
            </table>


        </div>

    );
};
