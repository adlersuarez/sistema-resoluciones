import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faBandAid, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia';

const IconoDownloadPDF = ({ruta,id,estado}) => {


  return (
    
    <div className='flex flex-col m-auto items-center'>
      { estado == '1' ?

        <a href={route(ruta,id)}
            className="font-medium text-blue-500 justify-center bg-blue-100 px-2 py-2 rounded-md hover:bg-blue-700 hover:text-white mx-3 w-12" target="_blank">
            <FontAwesomeIcon className="h-5 w-8 mx-auto" icon={faFilePdf}/> 
        </a>
        :
        <span className='bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-full text-center'>
          No encontrado
        </span>
      
      }
        
    </div>
  ) 
}
  
export default IconoDownloadPDF