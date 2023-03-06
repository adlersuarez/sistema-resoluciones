import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEye } from '@fortawesome/free-solid-svg-icons';
import TemplateDiv from "./TemplateDiv";

export default function ListTemplate({est_adeudo,documentos,detTipPer}) {
    const [open, setOpen] = useState(true);
    const mostrarTemplate = () => {
        setOpen(!open)
    }
    return (
        <div className="py-4">
            <li>
                <div onClick={mostrarTemplate} className="bg-[#0064bc] w-full cursor-pointer text-center text-white font-thin text-2xl rounded-md">
                    <div>
                        {est_adeudo.dependencia} <FontAwesomeIcon icon={faChevronDown} style={open ? { transform: 'rotate(0deg)', } : { transform: 'rotate(180deg)' }}></FontAwesomeIcon>
                    </div>
                </div>
            </li>
            <TemplateDiv est_adeudo={est_adeudo} open={open} documentos={documentos} detTipPer={detTipPer}/>
        </div>
    )
}