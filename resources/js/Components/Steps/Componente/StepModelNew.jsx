import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function StepModelNew({index,step,estado}) {

    return (
        
        <div className={"flex items-center"}>
            <div className={`flex-auto border-y-4 transition duration-500 ease-in-out ${(step.completed ? (estado[step.id-1] ? "border-[#22a75a]" : "border-[#e8b962]") : "border-gray-300")} `} />
            
            <div className="relative flex flex-col items-center text-black">
                
                <div className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${ step.selected && ( (step.completed && estado[step.id-1]) ? "bg-[#22a75a] text-white font-bold border border-[#22a75a]" : "bg-[#e8b962] border-[#e8b962]") } `} >
                
                {   step.completed ?
                        ( estado[step.id-1] ?
                            <span className="text-white font-bold text-xl">
                                <FontAwesomeIcon className="h-6 w-6 mt-1" icon={faCheck} />
                            </span>
                        :
                            <span className="text-white font-bold text-xl">  
                                {<FontAwesomeIcon className="h-6 w-6 mt-1" icon={faClock} />}
                            </span>
                        )
                    :   
                        <strong className='text-gray-400 text-lg'>{index+1}</strong> 
                }
                </div>

                <div className={`absolute top-0 text-center mt-16 w-32 ${ step.highlighted ? ((step.completed && estado[step.id-1] ) ? "text-[#22a75a] text-[16px] font-black" : "text-[#e8b962] text-[16px] font-black") : "text-gray-400 text-xs font-medium"}`}>
                    <strong>
                        {step.description}
                    </strong>
                </div>
            </div>
            
        </div>
        
    );
}