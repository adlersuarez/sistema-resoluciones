
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react';

var elementoActividad = {
  tipo: 2,
  actividad: '',
  datos: [
    {
      fechaDel: '',
      fechaAl: '',
      duracion: '',
      detalle: '',
    },
  ],
  general: '',
}

localStorage.setItem('formActividadGeneral', 'PRESENTACIÓN DE INFORMES FINALES Y FICHAS DE EVALUACIÓN A LAS ESCUELAS PROF.  Y LA COORDINACIÓN DE PRÁCTICAS PRE PROFESIONALES (30 DÍAS DESPUÉS DE LA CULMINACIÓN) SOLO PARA PRÁCTICAS PRE PROFESIONALES II Y/O INTERNADO II');

const TableRowGeneral = () => {

  // Utilizamos useState para manejar el estado local de los inputs
  const [actividadInput, setActividadInput] = useState("");

  const guardarActividad = () => {

      elementoActividad.actividad = localStorage.getItem('formActividadGeneral')

    //console.log(elementoActividad)

    let listaActividades = JSON.parse(localStorage.getItem('actividadesFormulario')) || [] ;

    listaActividades.push({ elementoActividad })

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('actividadesFormulario', JSON.stringify(listaActividades));
  }

  return (
    <>
      <tr>
        <td className="border p-0" colSpan={5}>
          <div className='h-full w-full flex items-center p-4'>

            <textarea
              type="text"
              name="actividad_general"
              defaultValue={localStorage.getItem('formActividadGeneral')}
              onChange={(e) => {
                setActividadInput(e.target.value);
                localStorage.setItem('formActividadGeneral', e.target.value);
              }}
              className="h-24 w-full bg-transparent focus:outline-none"
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

export default TableRowGeneral;