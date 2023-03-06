import React, { useState } from 'react'
import moment from 'moment/moment'
import { result } from 'lodash';

export default function TarjetaPromedio({datos}) {
    
    //console.log(datos)

    var promedio = 0;

    //var tiempo_promedio_proceso = 0;
    //var tiempo_promedio_finalizado = 0;

    const f_aceptacion = Object.keys(datos);
    const f_solicitud = Object.values(datos);

    //console.log(f_solicitud[0])
    //console.log(f_aceptacion)

    var suma_minutos = 0;
    var count = 0;
    var f_ai ;
    var f_si ;
    var f_ax ;
    var f_sx ;

    for (let i = 0; i < f_aceptacion.length; i++) {
        
        var f_ai = new Date(f_aceptacion[i]);
        var f_si= new Date(f_solicitud[i]);
        var f_ax = moment(f_ai);
        var f_sx = moment(f_si);

        suma_minutos += f_ax.diff(f_sx, 'minutes');
        count++;
    }

    var promedio_minutos = suma_minutos/count;

    /*if (promedio % 1 != 0) {
        promedio = promedio.toFixed(1);
    }*/

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

        var valor = "| "

        if(day >= 1) {
            valor += dias + " " + horas
        }else{
            valor += horas + " " + minutos
        }
        return valor;
    }

    var resultado = ""
    if(count != 0) { resultado = minutosToString(promedio_minutos) }

    return (
        <>
        <div className='flex m-auto text-center justify-center'>
            <strong className='text-base'>
                {   
                    resultado
                } 
            </strong>
        </div> 
        </>
    );
}