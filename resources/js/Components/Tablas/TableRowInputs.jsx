import { faCheckCircle, faCirclePlus, faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';

var filasActividad = 1

const data = {
  formData0: '',
  formData1: '',
  formData2: '',
  formData3: '',
  formData4: '',
  formData5: '',
  formData6: '',
  formData7: '',
  formData8: '',
  formData9: '',
  formData10: '',
  formData11: '',
  formData12: '',
  formData13: '',
  formData14: '',
  formData15: '',
  formData16: '',
  formData17: '',
  formData18: '',
  formData19: '',
  formData20: '',
};
const actividadIn = {
  formActividad0: '',
  formActividad1: '',
  formActividad2: '',
  formActividad3: '',
  formActividad4: '',
  formActividad5: '',
  formActividad6: '',
  formActividad7: '',
  formActividad8: '',
  formActividad9: '',
  formActividad10: '',
  formActividad11: '',
  formActividad12: '',
  formActividad13: '',
  formActividad14: '',
  formActividad15: '',
  formActividad16: '',
  formActividad17: '',
  formActividad18: '',
  formActividad19: '',
  formActividad20: '',
};
const fechaDelIn = {
  formFechaDel0: '',
  formFechaDel1: '',
  formFechaDel2: '',
  formFechaDel3: '',
  formFechaDel4: '',
  formFechaDel5: '',
  formFechaDel6: '',
  formFechaDel7: '',
  formFechaDel8: '',
  formFechaDel9: '',
  formFechaDel10: '',
  formFechaDel11: '',
  formFechaDel12: '',
  formFechaDel13: '',
  formFechaDel14: '',
  formFechaDel15: '',
  formFechaDel16: '',
  formFechaDel17: '',
  formFechaDel18: '',
  formFechaDel19: '',
  formFechaDel20: '',
};
const fechaAlIn = {
  formFechaAl0: '',
  formFechaAl1: '',
  formFechaAl2: '',
  formFechaAl3: '',
  formFechaAl4: '',
  formFechaAl5: '',
  formFechaAl6: '',
  formFechaAl7: '',
  formFechaAl8: '',
  formFechaAl9: '',
  formFechaAl10: '',
  formFechaAl11: '',
  formFechaAl12: '',
  formFechaAl13: '',
  formFechaAl14: '',
  formFechaAl15: '',
  formFechaAl16: '',
  formFechaAl17: '',
  formFechaAl18: '',
  formFechaAl19: '',
  formFechaAl20: '',
};
const duracionIn = {
  formDuracion0: '',
  formDuracion1: '',
  formDuracion2: '',
  formDuracion3: '',
  formDuracion4: '',
  formDuracion5: '',
  formDuracion6: '',
  formDuracion7: '',
  formDuracion8: '',
  formDuracion9: '',
  formDuracion10: '',
  formDuracion11: '',
  formDuracion12: '',
  formDuracion13: '',
  formDuracion14: '',
  formDuracion15: '',
  formDuracion16: '',
  formDuracion17: '',
  formDuracion18: '',
  formDuracion19: '',
  formDuracion20: '',
};
const detalleIn = {
  formDetalle0: '',
  formDetalle1: '',
  formDetalle2: '',
  formDetalle3: '',
  formDetalle4: '',
  formDetalle5: '',
  formDetalle6: '',
  formDetalle7: '',
  formDetalle8: '',
  formDetalle9: '',
  formDetalle10: '',
  formDetalle11: '',
  formDetalle12: '',
  formDetalle13: '',
  formDetalle14: '',
  formDetalle15: '',
  formDetalle16: '',
  formDetalle17: '',
  formDetalle18: '',
  formDetalle19: '',
  formDetalle20: '',
};

for (const key in data) {
  localStorage.setItem(key, JSON.stringify([]));
}

for (const key in actividadIn) {
  localStorage.setItem(key, "");
}
for (const key in fechaDelIn) {
  localStorage.setItem(key, "");
}
for (const key in fechaAlIn) {
  localStorage.setItem(key, "");
}
for (const key in duracionIn) {
  localStorage.setItem(key, "");
}
for (const key in detalleIn) {
  localStorage.setItem(key, "");
}

localStorage.setItem("filasActividad", filasActividad);
//

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

  }

  return (
    <>
      <tr>
        <td className="border p-0" rowSpan={activities.length + 1}>
          <div className='h-full w-full flex items-center p-4 pr-0'>

            <textarea
              type="text"
              name="actividad"
              defaultValue={localStorage.getItem('formActividad' + index)}
              onChange={(e) => {
                setActividadInput(e.target.value);
                localStorage.setItem('formActividad' + index, e.target.value);
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
            defaultValue={localStorage.getItem('formFechaDel' + index)}
            onChange={(e) => {
              setFechaDelInput(e.target.value);
              localStorage.setItem('formFechaDel' + index, e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <input
            type="date"
            name="fechaAl"
            defaultValue={localStorage.getItem('formFechaAl' + index)}
            onChange={(e) => {
              setFechaAlInput(e.target.value);
              localStorage.setItem('formFechaAl' + index, e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <input
            type="text"
            name="duracion"
            placeholder="Ingrese duración"
            defaultValue={localStorage.getItem('formDuracion' + index)}
            onChange={(e) => {
              setDuracionInput(e.target.value);
              localStorage.setItem('formDuracion' + index, e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none text-center"
          />
        </td>
        <td className="border p-2">
          <textarea
            type="text"
            name="detalle"
            placeholder="Ingrese detalles"
            defaultValue={localStorage.getItem('formDetalle' + index)}
            onChange={(e) => {
              setDetalleInput(e.target.value);
              localStorage.setItem('formDetalle' + index, e.target.value);
            }}
            className="w-full bg-transparent focus:outline-none"
          />
        </td>
        <td className='p-0' rowSpan={activities.length + 1}>
          <div className='h-full w-full flex items-center p-4 pr-0 gap-2'>

            <Link className="text-[#999999] focus:outline-none hover:text-[#487e21]"
            //onClick={() => limpiar()}
            >
              <FontAwesomeIcon className="h-6" icon={faCheckCircle} />
            </Link>

            <Link className="text-[#999999] focus:outline-none hover:text-[#942f26]"
            //onClick={() => limpiar()}
            >
              <FontAwesomeIcon className="h-6" icon={faCircleXmark} />
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