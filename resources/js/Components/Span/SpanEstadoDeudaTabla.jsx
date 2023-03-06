import React from 'react'

export default function SpanEstadoDeudaTabla({estado,texto}) {
    
    var color='';
    var valor='';

    //console.log(texto)

    switch(estado){
        case 0:
            color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-32 text-center';
            valor = 'Adeuda';
            break;
        case 1:
            color = 'bg-[#d3f2ea] text-[#33d1ab] font-bold rounded-md w-32 text-center';
            valor = 'No adeuda';
            break;
    }

    //console.log(color,valor)

    return (
        <span className={color}>
            {valor}{texto}
        </span>
    );
}