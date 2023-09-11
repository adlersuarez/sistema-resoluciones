import React, { useEffect, useState } from 'react';
import TableRowInputs from './TableRowInputs';

localStorage.setItem('componentes', JSON.stringify([]));

export default function TablaCalendario() {

    const [componentes, setComponentes] = useState([]);
    //console.log(componentes)

    useEffect(() => {
        const storedComponentes = JSON.parse(localStorage.getItem('componentes'));
        if (storedComponentes) {
          setComponentes(storedComponentes);
        }
      }, []);
    
      // Función para manejar el clic en el botón
      const handleAgregarClick = () => {
        const newComponentes = [...componentes, <TableRowInputs index={componentes.length + 1} key={componentes.length + 1} 
        />];
        setComponentes(newComponentes);
        localStorage.setItem('componentes', JSON.stringify(newComponentes));
      };

    return (
        <>
            <button onClick={handleAgregarClick}>
                Agregar Nuevo Componente
            </button>

            <table className="w-full border-collapse mt-10 h-0">
                <thead>
                    <tr className="">
                        <th className="border p-2" rowSpan="2">ACTIVIDADES ACADÉMICAS</th>
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
                    <TableRowInputs index={0}/>
                    {/* Mostrar los componentes agregados */}
                    {componentes.map((componente, index) => (
                        componente
                    ))}
                </tbody>
            </table>
        </>

    );
};
