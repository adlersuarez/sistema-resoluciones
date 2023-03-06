import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';

export default function ReporteArea({datos,nombre}) {
    
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    // slice(0,6) ==> 0 es inicio del arreglo -> donde empieza
    // slice(0,6) ==> 6 es la cantidad de elementos
    
    const valores = Object.values(datos);
    //console.log(valores);
    
    //fecha actual
    var fecha_actual = new Date();
    
    var mes = fecha_actual.getMonth();
    var cant_meses = 6;
    var mes_muestra = mes+7;

    const labels = meses.slice(mes_muestra,mes_muestra+cant_meses);

    const options = {
        //maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: nombre.toUpperCase(),
            color: '#64748B',
            font: {
                size: 18
            },
            padding: {
                bottom: 20
            }
          },
        },

        scales: {
            y: {
                beginAtZero: true,
            }
        }

      };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Constancias',
                //la data es de prueba extraer de bbdd
                data: valores,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                fill: true,
            },
        ],
    };

    return (
        <div id="chart" className='h-full'>
            <Line
                options={options}
                data={data} 
                type="Bar" 
                className='justify-center bg-white p-5 rounded-lg drop-shadow'
                
            />
        </div>
    );
}