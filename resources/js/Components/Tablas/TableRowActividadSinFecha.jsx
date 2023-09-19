import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react';

var elementoActividad = {
  actividad: '',
  general: '',
}

localStorage.setItem('formActividadSinFecha', 'INGRESO DE NOTAS AL SISTEMA ACADÉMICO');
localStorage.setItem('formDetalleSinFecha', 'SEGÚN LA CULMINACIÓN DE CADA GRUPO');

const TableRowActividadSinFecha = () => {

  // Utilizamos useState para manejar el estado local de los inputs
  const [actividadInput, setActividadInput] = useState("");
  const [detalleInput, setDetalleInput] = useState("");

  const guardarActividad = () => {


    //console.log(elementoActividad)

    let listaActividades = JSON.parse(localStorage.getItem('actividadesFormulario')) || [];

    elementoActividad.actividad = localStorage.getItem('formActividadSinFecha')
    elementoActividad.general = localStorage.getItem('formDetalleSinFecha')

    listaActividades.push({ elementoActividad })

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('actividadesFormulario', JSON.stringify(listaActividades));
  }

  //console.log(JSON.parse(localStorage.getItem('actividadesFormulario')))

  return (
    <>
      <tr>
        <td className="border p-0" colSpan={2}>
          <div className='h-full w-full flex items-center p-4'>

            <textarea
              type="text"
              name="actividad"
              defaultValue={localStorage.getItem('formActividadSinFecha')}
              onChange={(e) => {
                setActividadInput(e.target.value);
                localStorage.setItem('formActividadSinFecha', e.target.value);
              }}
              className="h-full w-full bg-transparent focus:outline-none"
            />

          </div>

        </td>
        <td className="border p-0" colSpan={3}>
          <div className='h-full w-full flex items-center p-4'>
            <textarea
              type="text"
              name="detalle"
              defaultValue={localStorage.getItem('formDetalleSinFecha')}
              onChange={(e) => {
                setDetalleInput(e.target.value);
                localStorage.setItem('formDetalleSinFecha', e.target.value);
              }}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
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

export default TableRowActividadSinFecha;