import React from 'react'

export default function SpanEstadoSolicitud({estado}) {
    
    var color='';
    var valor='';

    //console.log(estado)

    switch(estado){
        case 1:
            color = 'bg-[#fff4e1] text-[#f7c76f] font-bold rounded-md';
            valor = 'Pendiente';
            break;
        case 2:
            color = 'bg-[#d3f2ea] text-[#33d1ab] font-bold rounded-md';
            valor = 'Completado';
            break;
        case 3:
            color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md';
            valor = 'Rechazado';
            break;
        case 4:
            color = 'bg-[#C4E5F8] text-[#2098E0] font-bold rounded-md';
            valor = 'En Proceso';
            break;
    }

    //console.log(color,valor)

    return (
        <span className={color}>
            {valor}
        </span>
    );
}