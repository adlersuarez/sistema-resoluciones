import React from 'react'
import dayjs from 'dayjs';

export default function FormatoTiempo({fecha}) {
    
    var fecha_mostrada =  dayjs(fecha).format('DD-MM-YYYY')

    var dia = dayjs(fecha).format('DD');
    var mes = dayjs(fecha).format('MM');
    var year = dayjs(fecha).format('YYYY');

    var mes_escrito = '';
   
    //console.log(fecha_mostrada)
    
    switch(mes){
        case '01':
            mes_escrito = 'enero';
            break;
        case '02':
            mes_escrito = 'febrero';
            break;
        case '03':
            mes_escrito = 'marzo';
            break;
        case '04':
            mes_escrito = 'abril';
            break;
        case '05':
            mes_escrito = 'mayo';
            break;
        case '06':
            mes_escrito = 'junio';
            break;
        case '07':
            mes_escrito = 'julio';
            break;
        case '08':
            mes_escrito = 'agosto';
            break;
        case '09':
            mes_escrito = 'setiembre';
            break;
        case '10':
            mes_escrito = 'octubre';
            break;
        case '11':
            mes_escrito = 'noviembre';
            break;
        case '12':
            mes_escrito = 'diciembre';
            break;
    }

    var valor = dia+" de "+mes_escrito+" del "+year;

    //console.log(color,valor)

    return (
        <span>
            {valor}
        </span>
    );
}