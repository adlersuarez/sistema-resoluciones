import React, { useEffect, useState } from 'react';
import TableRowInputs from './TableRowInputs';
import { Link } from '@inertiajs/inertia-react';
import { faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableRowGeneral from './TableRowGeneral';
import TableRowActividadSinFecha from './TableRowActividadSinFecha';
import TableRowFechaActa from './TableRowFechaActa';

localStorage.setItem('componentes', JSON.stringify([]));

export default function TablaCalendario() {

    const [componentes, setComponentes] = useState([]);
    //console.log(componentes)

    const [botonActivo, setBotonActivo] = useState(null);

    const mostrarContenido = (indiceBoton) => {
        setBotonActivo(indiceBoton);
    };

    
    useEffect(() => {
        const storedComponentes = JSON.parse(localStorage.getItem('componentes'));
        if (storedComponentes) {
            setComponentes(storedComponentes);
        }
    }, []);


    return (
        <>
            <div className='flex gap-6'>
                <button type="button" onClick={() => mostrarContenido(1)} className='flex bg-yellow-400 hover:bg-yellow-800 h-9 px-4 rounded-lg text-white'>
                    <div className='m-auto'>
                        <strong className=' mr-2'>Actividad</strong>
                        <FontAwesomeIcon className="m-auto h-4" icon={faPlusSquare} />
                    </div>
                </button>

                <button type="button" onClick={() => mostrarContenido(2)} className='flex bg-yellow-400 hover:bg-yellow-800 h-9 px-4 rounded-lg text-white'>
                    <div className='m-auto'>
                        <strong className=' mr-2'>Actividad (Sin fecha)</strong>
                        <FontAwesomeIcon className="m-auto h-4" icon={faPlusSquare} />
                    </div>
                </button>

                <button type="button" onClick={() => mostrarContenido(3)} className='flex bg-yellow-400 hover:bg-yellow-800 h-9 px-4 rounded-lg text-white'>
                    <div className='m-auto'>
                        <strong className=' mr-2'>Culminación de grupo</strong>
                        <FontAwesomeIcon className="m-auto h-4" icon={faPlusSquare} />
                    </div>
                </button>

                <button type="button" onClick={() => mostrarContenido(4)} className='flex bg-yellow-400 hover:bg-yellow-800 h-9 px-4 rounded-lg text-white'>
                    <div className='m-auto'>
                        <strong className=' mr-2'>Fecha acta</strong>
                        <FontAwesomeIcon className="m-auto h-4" icon={faPlusSquare} />
                    </div>
                </button>
            </div>


            {
                botonActivo === 1 &&
                <table className="w-full border-collapse mt-10 h-0">
                    <thead>
                        <tr className="">
                            <th className="border p-2" rowSpan="2">ACTIVIDAD ACADÉMICA</th>
                            <th className="border p-2" colSpan="2">FECHA</th>
                            <th className="border p-2" rowSpan="2">DURACIÓN</th>
                            <th className="border p-2" rowSpan="2">DETALLE</th>
                            <th className=""></th>
                        </tr>
                        <tr className="">
                            <th className="border p-2">DEL</th>
                            <th className="border p-2">AL</th>
                            <th className=""></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRowInputs index={1} />
                    </tbody>
                </table>
            }

            {
                botonActivo === 2 &&
                <table className="w-full border-collapse mt-10 h-0">
                    <thead>
                        <tr className="">
                            <th className="border p-2" colSpan={5}>ACTIVIDAD ACADÉMICA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRowGeneral />
                    </tbody>
                </table>
            }

            {
                botonActivo === 3 &&
                <table className="w-full border-collapse mt-10 h-0">
                    <thead>
                        <tr className="">
                            <th className="border p-2" colSpan="2">ACTIVIDAD ACADÉMICA</th>
                            <th className="border p-2" colSpan="3">DURACIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRowActividadSinFecha />
                    </tbody>
                </table>
                
            }

            {
                botonActivo === 4 &&
                <table className="border-collapse mt-10 h-0">
                    <tbody>
                    <TableRowFechaActa />
                    </tbody>
                </table>
                
            }

        </>

    );
};
