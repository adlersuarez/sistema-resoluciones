import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';

export default function ReporteBarrasHorizontal({nombre,datos,label}) {
    
    //const labels = ['Ciencias Administrativas y Contables','Derecho y Ciencias Políticas','Ingeniería','Medicina Humana','Ciencias de la Salud'];
    
    //nombres
    //console.log(Object.keys(datos));
    //valores
    //console.log(Object.values(datos));

    const labels = Object.keys(datos);

    const valores = Object.values(datos);

    const options = {
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
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

    const  data = {
        labels: labels,
        datasets: [{
            label: label,
            //data: [6,2,3,10,5],
            data: valores,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            ],
            borderWidth: 1
        }] 
    };

    return (
        <div id="chart" className='h-full'>
            <Bar
            options={options} 
            data={data} 
            type="Bar" 
            className='justify-center bg-white p-5 rounded-lg drop-shadow'
            
            />
        </div>
    );
}