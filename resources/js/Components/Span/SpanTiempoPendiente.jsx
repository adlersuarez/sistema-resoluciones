import React, { useEffect, useRef } from 'react'
import moment from 'moment/moment';

export default function SpanTiempoPendiente({fecha}) {
    
    const reloj = useRef();

    function diasToString(seconds) {
        var valor = Math.floor(seconds / 86400);
        return valor
    }

    function horasToString(seconds) {
        var valor = Math.floor((seconds / 3600) % 24);
        valor = (valor < 10)? '0' + valor : valor;
        return valor
    }

    function minutosToString(seconds) {
        var valor = Math.floor((seconds / 60) % 60);
        valor = (valor < 10)? '0' + valor : valor;
        return valor
    }

    function segundosToString(seconds) {
        var valor = seconds % 60;
        valor = (valor < 10)? '0' + valor : valor;
        return valor
    }

    
    const time_pend = () => {
        const f_actual = new Date();
        const f_solicitud = new Date(fecha);

        const fecha_actual = moment(f_actual);
        const fecha_solicitud = moment(f_solicitud);

        const diff_sec = fecha_actual.diff(fecha_solicitud, 'seconds');

        const dia = diasToString(diff_sec);
        const hora = horasToString(diff_sec);
        const minuto = minutosToString(diff_sec);
        const segundo = segundosToString(diff_sec);

        var resultado = ""

        if(dia >= 1) {
            if(dia == 1){
                resultado = dia + ' día  ' + hora + ' h  ' + minuto + ' min'
            }else{
                resultado = dia + ' días  ' + hora + ' h  ' + minuto + ' min'
            }
        }else{
            if( hora == '00' && minuto == '00' ){
                resultado = segundo + ' segundos'
            }else{
                if( hora == '00'){
                    resultado = minuto + ' min  ' + segundo + ' s'
                }else{
                    resultado = hora + ' h   ' + minuto + ' min  ' + segundo + ' s'
                }
            }   
        }

        return resultado
    };

    //color
    var f_actual = new Date();
    var f_solicitud = new Date(fecha);
    var fecha_actual = moment(f_actual);
    var fecha_solicitud = moment(f_solicitud);

    var diferencia = fecha_actual.diff(fecha_solicitud, 'days');

    var color=""
    if(diferencia <=3)
        color = 'bg-[#d3f2ea] text-[#33d1ab] font-bold rounded-md w-40';
    else if (diferencia <=5)
        color = 'bg-[#fff4e1] text-[#f7c76f] font-bold rounded-md w-40';
    else color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-40';

    useEffect(() => {
        const clock = setInterval(() => {
            reloj.current.innerHTML = `${time_pend()}`;
        }, 1000);
        //console.log("asd");
        return () => clearInterval(clock);
    }, []);
    //console.log("asdsss");

    return (
        <span ref={reloj} className={color}>
            {time_pend()}
        </span>   
    );
}