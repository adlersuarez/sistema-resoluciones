import React, { useState } from 'react'
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function ReporteCircular({nombre,datos,label,link}) {
    
  //nombres
  //console.log(Object.keys(datos));
  //valores
  //console.log(Object.values(datos));

  const labels = Object.keys(datos);
  const valores = Object.values(datos);

  const options = {
        maintainAspectRatio: false,
        //responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
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
      };

   const  data =  {
      labels: labels,
        datasets: [{
          label: label,
          data: valores,
          backgroundColor: [
            '#e8b962',
            '#26b594',
            '#fa5c82',
            '#2098E0',
          ],
          hoverOffset: 4 
        }]
      }

    return (
        <div id="chart" className='h-full'>
            <Doughnut
            options={options} 
            data={data}
            type="Doughnut"
            className='h-full wrapper flex flex-wrap justify-center bg-white p-5 rounded-lg drop-shadow'
            />
        </div>
    );
}