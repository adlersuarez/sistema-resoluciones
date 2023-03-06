import { faArrowLeft, faArrowRight, faBan, faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Swal from 'sweetalert2';

export default function StepControl({handleClick,currentStep,steps,estado}) {

    var valido = ' bg-[#22a75a] hover:bg-[#16793f] hover:text-white transition duration-200 ease-in-out cursor-pointer'
    var blockDelim = ' bg-slate-700 border-2 border-slate-300 transition duration-200 ease-in-out cursor-not-allowed opacity-50'
    var blockEstado = ' bg-[#e8b962] cursor-not-allowedhover:bg-[#ac853d] hover:text-white transition duration-200 ease-in-out'

    const solicitud_proceso = (e) => {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Aún está en proceso',
            showConfirmButton: false,
            timer: 1000
          })
    }

    return (
        <div className="flex gap-4 w-32">                    
            <div className="flex w-full justify-between">
                <button
                    onClick={()=>handleClick("back")}
                    className={`text-white uppercase py-2 px-4 rounded-xl font-semibold '
                    ${currentStep==1 ? blockDelim : valido }`}>
                    {currentStep==1 ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faArrowLeft}/> }
                </button>
                            
                <button
                    onClick={estado[currentStep-1] ? ()=>handleClick("next"):solicitud_proceso}
                    className={`text-white uppercase py-2 px-4 rounded-xl font-semibold ' ${currentStep==steps.length ? blockDelim : (estado[currentStep-1] ? valido : blockEstado) }`}>
                    {currentStep==steps.length ? <FontAwesomeIcon icon={faBan}/> : (estado[currentStep-1] ? <FontAwesomeIcon icon={faArrowRight}/> : <FontAwesomeIcon icon={faClock}/>)}
                </button>
            </div>
            
        </div>
    );
}