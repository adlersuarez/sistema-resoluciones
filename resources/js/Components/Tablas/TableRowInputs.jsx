import { faCheckCircle, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';

var elementoActividad = {
  tipo: 1,
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

const TableRowInputs = ({ index }) => {

  // Utilizamos useState para manejar el estado local de los inputs
  const [actividadInput, setActividadInput] = useState("");
  const [fechaDelInput, setFechaDelInput] = useState("");
  const [fechaAlInput, setFechaAlInput] = useState("");
  const [duracionInput, setDuracionInput] = useState("");
  const [detalleInput, setDetalleInput] = useState("");

  //const [formData, setFormData] = useState({});
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem('formData' + index);
    if (storedData) {
      setActivities(JSON.parse(storedData));
    }
  }, []);

  // Actualizar el LocalStorage cuando cambian los datos del formulario
  useEffect(() => {
    localStorage.setItem('formData' + index, JSON.stringify(activities));
  }, [activities]);

  const handleFieldChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    setActivities([...activities, {}]);
  };

  const deleteActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const guardarActividad = () => {

    // Obtener los datos almacenados previamente en el localStorage
    let formData = JSON.parse(localStorage.getItem('formData' + index)) || [];

    elementoActividad.actividad = localStorage.getItem('formActividad');
    elementoActividad.datos[0].fechaDel = localStorage.getItem('formFechaDel');
    elementoActividad.datos[0].fechaAl = localStorage.getItem('formFechaAl');
    elementoActividad.datos[0].duracion = localStorage.getItem('formDuracion');
    elementoActividad.datos[0].detalle = localStorage.getItem('formDetalle');

    for (let index = 0; index < formData.length; index++) {
      let datosDel = ''; let datosAl = ''; let datosDuracion = ''; let datosDetalle = ''
      if(formData[index].startDate){ datosDel = formData[index].startDate }
      if(formData[index].endDate){ datosAl = formData[index].endDate }
      if(formData[index].duration){ datosDuracion = formData[index].duration }
      if(formData[index].details){ datosDetalle = formData[index].details }

      elementoActividad.datos.push(
        { fechaDel: datosDel,
          fechaAl: datosAl,
          duracion: datosDuracion,
          detalle: datosDetalle, }
      )
    }

    //console.log(elementoActividad)

    let listaActividades = JSON.parse(localStorage.getItem('actividadesFormulario')) || [] ;

    listaActividades.push({ elementoActividad })

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem('actividadesFormulario', JSON.stringify(listaActividades));
  }

  //console.log(JSON.parse(localStorage.getItem('actividadesFormulario')))

  return (
    <>
      <tr>
        <td className="border p-0" rowSpan={activities.length + 1}>
          <div className='h-full w-full flex items-center p-4 pr-0'>

            <textarea
              type="text"
              name="actividad"
              defaultValue={localStorage.getItem('formActividad')}
              onChange={(e) => {
                setActividadInput(e.target.value);
                localStorage.setItem('formActividad', e.target.value);
              }}
              className="h-full w-full bg-transparent focus:outline-none"
            />

            <div className='w-10 flex flex-col'>
              <Link className="text-[#999999] focus:outline-none hover:text-[#3149d2] m-auto"
                onClick={addActivity}
                title="Agregar Fechas"
              >
                <FontAwesomeIcon className="h-6" icon={faCirclePlus} />
              </Link>

            </div>

          </div>

        </td>
        <td className="border p-2">
          <input
            type="date"
            name="fechaDel"
            defaultValue={localStorage.getItem('formFechaDel')}
            onChange={(e) => {
              setFechaDelInput(e.target.value);
              localStorage.setItem('formFechaDel', e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <input
            type="date"
            name="fechaAl"
            defaultValue={localStorage.getItem('formFechaAl')}
            onChange={(e) => {
              setFechaAlInput(e.target.value);
              localStorage.setItem('formFechaAl', e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <input
            type="text"
            name="duracion"
            placeholder="Ingrese duración"
            defaultValue={localStorage.getItem('formDuracion')}
            onChange={(e) => {
              setDuracionInput(e.target.value);
              localStorage.setItem('formDuracion', e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <textarea
            type="text"
            name="detalle"
            placeholder="Ingrese detalles"
            defaultValue={localStorage.getItem('formDetalle')}
            onChange={(e) => {
              setDetalleInput(e.target.value);
              localStorage.setItem('formDetalle', e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none"
          />
        </td>
        <td className='border p-0' rowSpan={activities.length + 1}>
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

      {/*<TableInputsAdd />*/}
      {activities.map((activity, index) => (
        <tr key={index} className="mb-4 border p-4">
          <td className="border p-2">
            <input
              type="date"
              className="w-full bg-transparent focus:outline-none text-center"
              value={activity.startDate || ''}
              onChange={(e) => handleFieldChange(index, 'startDate', e.target.value)}
            />
          </td>
          <td className="border p-2">
            <input
              type="date"
              className="w-full bg-transparent focus:outline-none text-center"
              value={activity.endDate || ''}
              onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
            />
          </td>
          <td className="border p-2">
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none text-center"
              placeholder="Ingrese duración"
              value={activity.duration || ''}
              onChange={(e) => handleFieldChange(index, 'duration', e.target.value)}
            />
          </td>
          <td className="border p-2">
            <div className='flex h-full w-full'>
              <textarea
                className="w-full bg-transparent"
                placeholder="Ingrese detalles"
                value={activity.details || ''}
                onChange={(e) => handleFieldChange(index, 'details', e.target.value)}
              />

              <Link data-tooltip-target="tooltip-default" className="text-[#999999] focus:outline-none hover:text-[#c72a3f] m-auto ml-4"
                onClick={() => deleteActivity(index)}
                title="Borrar Fechas"
              >
                <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                  Tooltip content
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>

                <FontAwesomeIcon className="h-6" icon={faTrash} />
              </Link>
            </div>

          </td>

        </tr>
      ))}

    </>
  );
};

export default TableRowInputs;