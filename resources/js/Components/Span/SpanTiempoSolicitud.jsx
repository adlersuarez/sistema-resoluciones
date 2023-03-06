import React from 'react'
import moment from 'moment/moment';

export default function SpanTiempoSolicitud({fechaSolicitud}) {
    
    var f_actual = new Date();
    var f_solicitud = new Date(fechaSolicitud);

    var fecha_actual = moment(f_actual);
    var fecha_solicitud = moment(f_solicitud);

    //console.log(fecha_actual.diff(fecha_solicitud, 'days'));

    var diferencia = fecha_actual.diff(fecha_solicitud, 'days');
    var diff_minutos = fecha_actual.diff(fecha_solicitud, 'minutes');
    
    var resultado = "";

    var color ="";

    function minutosToString(minutes) {

        var day = Math.floor(minutes / 1440);
       
        var hour = Math.floor((minutes/60) % 24);
        
        var minute = Math.floor(minutes % 60);
        
        var dias = ""
        var horas = ""
        var minutos = ""

        if(day != 0){ if(day == 1){ dias = "1 día" }else{ dias = day + " días" }} 
        
        if(hour != 0){ if(hour == 1){ horas = "1 h" }else{ horas = hour + " h" }} 

        if(minute != 0){ if(minute == 1){ minutos = "1 min" }else{ minutos = minute + " min" }} 

        var valor = ""

        if(day >= 1) {
            valor = dias + " " + horas
        }else{
            valor = horas + " " + minutos
        }
        return valor;
    }

    resultado = minutosToString(diff_minutos)
    
    if(diferencia <=3)
        color = 'bg-[#d3f2ea] text-[#33d1ab] font-bold rounded-md w-28';
    else if (diferencia <=5)
        color = 'bg-[#fff4e1] text-[#f7c76f] font-bold rounded-md w-28';
    else color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-28';


    return (
        <span className={color}>
            {resultado} 
        </span>
    );
}