import React from 'react'


export default function SubtitlePagesCantidad({cantidad,tipo,valores,estado}) {

    var cant_tipo = 0
    switch (tipo) {
        case 1: cant_tipo = valores.cant_1;
            break;
        case 2: cant_tipo = valores.cant_2;
            break;
        case 3: cant_tipo = valores.cant_3;
            break;
        case 4: cant_tipo = valores.cant_4;
            break;
        default:
            break;
    }

    var resultado = ""
    if(tipo == undefined){
        if(estado == undefined) {
            cantidad == 0 ?
            resultado = "Sin solicitudes" :
            (cantidad == 1 ?
                resultado = "1 solicitud pendiente" :
                resultado = cantidad + " solicitudes pendientes")
        }else{
            cantidad == 0 ?
            resultado = "Sin solicitudes" :
            (cantidad == 1 ?
                resultado = "1 solicitud validada" :
                resultado = cantidad + " solicitudes validadas")
        }
    }else{
        if(valores != undefined){
            cant_tipo == 0 ?
            resultado = "Sin solicitudes" :
            (cant_tipo == 1 ?
                resultado = "1 solicitud" :
                resultado = cant_tipo + " solicitudes")
        }
    }

    return (
        <div className='hidden md:block items-center text-slate-500 text-xl'>
            <strong>{resultado}</strong>
        </div>
    );
}