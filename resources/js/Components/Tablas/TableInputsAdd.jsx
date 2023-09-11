import React, { useState } from 'react';

const TableInputsAdd = ({ actividad, fechaDel, fechaAl, duracion, detalle, onInputChange }) => {
  // Utilizamos useState para manejar el estado local de los inputs
  const [fechaDelInput, setFechaDelInput] = useState(fechaDel);
  const [fechaAlInput, setFechaAlInput] = useState(fechaAl);
  const [duracionInput, setDuracionInput] = useState(duracion);
  const [detalleInput, setDetalleInput] = useState(detalle);

  // Función para manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
    switch (name) {
      case 'actividad':
        setActividadInput(value);
        break;
      case 'fechaDel':
        setFechaDelInput(value);
        break;
      case 'fechaAl':
        setFechaAlInput(value);
        break;
      case 'duracion':
        setDuracionInput(value);
        break;
      case 'detalle':
        setDetalleInput(value);
        break;
      default:
        break;
    }
  };

  return (
    <tr>
      <td className="border p-2">
        <input
          type="date"
          name="fechaDel"
          value={fechaDelInput}
          onChange={handleInputChange}
          className="w-full bg-transparent focus:outline-none text-center"
        />
      </td>
      <td className="border p-2">
        <input
          type="date"
          name="fechaAl"
          value={fechaAlInput}
          onChange={handleInputChange}
          className="w-full bg-transparent focus:outline-none text-center"
        />
      </td>
      <td className="border p-2">
        <input
          type="text"
          name="duracion"
          value={duracionInput}
          onChange={handleInputChange}
          className="w-full bg-transparent focus:outline-none text-center"
        />
      </td>
      <td className="border p-2">
        <textarea
          type="text"
          name="detalle"
          value={detalleInput}
          onChange={handleInputChange}
          className="w-full bg-transparent focus:outline-none"
        />
      </td>
      
    </tr>
  );
};

export default TableInputsAdd;