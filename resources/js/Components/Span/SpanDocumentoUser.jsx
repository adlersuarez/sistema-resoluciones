import React from 'react'

export default function SpanDocumentoUser({estado}) {
    
    var color='';
    var valor='';

    //console.log(texto)

    switch(estado){
        case 0:
            color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-4/6';
            valor = 'Requerido';
            break;
        case 1:
            color = 'bg-[#d3f2ea] text-[#33d1ab] font-bold rounded-md w-4/6';
            valor = 'Activo';
            break;
    }

    //console.log(color,valor)

    return (
        <span className={color}>
            {valor}
        </span>
    );
}