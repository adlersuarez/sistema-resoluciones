import { Inertia } from '@inertiajs/inertia'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@inertiajs/inertia-react';
import SpanEstadoSolicitud from '../Span/SpanEstadoSolicitud';
//import route from 'vendor/tightenco/ziggy/src/js';

const Card_Solicitud = ({auth,solicitud}) => {
 /* const removeItem = (e) =>{
    Inertia.delete(route('removeItemEquipo',e.currentTarget.id));
  }*/
  /*const {data, setData, errors, post, progress} = useForm({
    id:auth.user.id,

  })*/

  //console.log(solicitud);
  //console.log(data);



  return (
    <div className='px-2 py-3'>
      <div className={`p-2 bg-white transform transition-all 
      hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl 
      rounded-2xl border-2
      ${solicitud.id_estadoSolicitud==1?
      "border-yellow-500 hover:border-yellow-600"
      :""}
      ${solicitud.id_estadoSolicitud==2?
      "border-green-400 hover:border-green-700"
      :""} 
      ${solicitud.id_estadoSolicitud==3?
      "border-red-400 hover:border-red-700"
      :""} 
      ${solicitud.id_estadoSolicitud==4?
      "border-blue-400 hover:border-blue-700"
      :""} 
      
      `}>
        <div className='p-2'>
          <div className='text-center py-2'>
          <h2 className='font-bold text-xl'>SOLICITUD {solicitud.c_codSolicitud}</h2>
          </div>
          <p className='text-sm text-gray-600'>
            Estado de solicitud:  <SpanEstadoSolicitud estado={solicitud.id_estadoSolicitud}/>
          </p>
          <p className='text-sm text-gray-600'>
            Tipo de solicitud: {solicitud.c_nomSolicitud}
          </p>
          <p className='text-sm text-gray-600'>
            Finalidad de la solicitud: {solicitud.c_nomFinalidadSolicitud}
          </p>
          <p className='text-sm text-gray-600'>
            Fecha de la solicitud: {solicitud.d_fechaSolicitud}
          </p>
          <br />
          <div className='text-center'>
          <a 
          href={route("vistaSolicitud",solicitud.id_solicitud)} 
          role="button" 
          className={`text-white px-3 py-1 rounded-md  text-lg font-bold
          ${solicitud.id_estadoSolicitud==1?
          "bg-yellow-500 hover:bg-yellow-600"
          :""}
          ${solicitud.id_estadoSolicitud==2?
          "bg-green-500 hover:bg-green-900"
          :""}
          ${solicitud.id_estadoSolicitud==3?
          "bg-red-500 hover:bg-red-900"
          :""}
          ${solicitud.id_estadoSolicitud==4?
          "bg-blue-500 hover:bg-blue-900"
          :""} 
          `}>VER SOLICITUD</a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Card_Solicitud
