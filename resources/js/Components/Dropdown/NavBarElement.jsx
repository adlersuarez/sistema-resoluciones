import React, { useEffect,useRef,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ElementoListUL from './ElementoListUL';
import { duration } from 'moment';

export default function NavBarElement({elementos,estado,widthLista}) {
    
    const titulo = elementos[0].titulo
    const icono = elementos[1].icono
    const lista = elementos[2].elementos

    const [show,setShow] = useState(false);
    const ref = useRef();

    // close dropdown if clicked anywhere outside of dropdown
    // on initial render, add click event listener
    useEffect(() => {
        const onBodyClick = (event) => {
            // check if element that was clicked is inside of ref'd component
            // if so no action is required from this event listener so exit
            if (ref.current.contains(event.target)) {
                return;
            }else{
                setShow(false);
            }
            // else close the dropdown
        };
        document.body.addEventListener("click", onBodyClick);
        // CLEANUP
        // remove event listener
        return () => {
            document.body.removeEventListener("click", onBodyClick);
        };
    }, []);
    
    const styleOpen = {
        display:"flex"
    }
    const styleClose = {
        display:"none"
    }

    var ulLista = "absolute bg-white rounded-lg mt-1 "+widthLista

    return (
        <li className='px-3' id='li-selector' >
            <button href="#" ref={ref} onClick={()=>setShow(!show)} className="flex lg:flex-row min-[200px]:flex-col items-center justify-center w-full p-2 text-base font-normal text-white rounded-lg  hover:text-[#007CBC] hover:bg-blue-50 focus:bg-blue-50 focus:text-[#007CBC] transition duration-300 ease-in-out">
                <FontAwesomeIcon className="h-5 w-6" icon={icono} />
                    <div style={estado ? styleOpen : styleClose} className="flex-1 justify-between lg:ml-3 min-[200px]:ml-0">        
                        <span id='nombre-lista' className='md:inline min-[200px]:hidden lg:text-left min-[200px]:text-center'>
                            <strong>{titulo}</strong>
                        </span>
                        <svg  className="w-6 h-6 duration-300" style={show ? {transform: 'rotate(0deg)',} : {transform: 'rotate(-90deg)'}} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                        </svg>
                    </div>
            </button>

            {  show && 

                <ul className={ulLista}>
                    <ElementoListUL lista={lista} />
                </ul>
            }
        </li>
        
    );
}