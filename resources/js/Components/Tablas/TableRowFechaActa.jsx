import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react';

var elementoActividad = {
  actividad: 'FECHA DE ACTA',
  datos: [
    {
      fechaDel: '',
    },
  ],
}

const fechaActual = new Date();
// Obtener el año, mes y día
const año = fechaActual.getFullYear();
const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
const dia = fechaActual.getDate().toString().padStart(2, '0');
// Formatear la fecha con guiones
const fechaConGuiones = `${año}-${mes}-${dia}`;

localStorage.setItem('formFechaDelActividadActa',fechaConGuiones)

const TableRowFechaActa = () => {

  // Utilizamos useState para manejar el estado local de los inputs
  const [fechaDelInput, setFechaDelInput] = useState("");
 
  const guardarActividad = () => {

    let listaActividades = JSON.parse(localStorage.getItem('actividadesFormulario')) || [] ;

    listaActividades.push({ elementoActividad })

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('actividadesFormulario', JSON.stringify(listaActividades));
  }

  //console.log(JSON.parse(localStorage.getItem('actividadesFormulario')))

  return (
    <>
      <tr>
        <td className="border p-0">
          <div className='h-full flex items-center p-4'>
          FECHA DE ACTA
          </div>

        </td>
        <td className="border p-2">
          <input
            type="date"
            name="fechaDel"
            defaultValue={localStorage.getItem('formFechaDelActividadActa')}
            onChange={(e) => {
              setFechaDelInput(e.target.value);
              localStorage.setItem('formFechaDelActividadActa', e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>

        <td className='border p-0'>
          <div className='h-full w-full flex items-center p-4 gap-2'>

            <Link className="text-[#999999] focus:outline-none hover:text-[#487e21]"
              title="Validar actividad"
              onClick={() => guardarActividad()}
            >
              <FontAwesomeIcon className="h-6" icon={faCheckCircle} />
            </Link>

          </div>
        </td>
      </tr>

    </>
  );
};

export default TableRowFechaActa;