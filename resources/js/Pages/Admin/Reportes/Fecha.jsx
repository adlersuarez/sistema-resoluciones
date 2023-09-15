import React, { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import ReporteCircular from '@/Components/Reporte/ReporteCircular';
import ReporteBarrasHorizontal from '@/Components/Reporte/ReporteBarrasHorizontal';
import TarjetaCantidad from '@/Components/Reporte/TarjetaCantidad';
import TarjetaPromedio from '@/Components/Reporte/TarjetaPromedio';
import TitlePages from '@/Components/Titulo/TitlePages';
import DashboardCard from '@/Components/Dashboard/DashboardCard';
import FilterComponent from '@/Components/Dashboard/FilterComponent';

export default function Admin({ auth }) {

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [exactDate, setExactDate] = useState('');

    const handleYearChange = (year) => {
        setSelectedYear(year);
        // Realiza la lógica de filtrado por año aquí
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        // Realiza la lógica de filtrado por mes aquí
    };

    const handleExactDateChange = (date) => {
        setExactDate(date);
        // Realiza la lógica de filtrado por fecha exacta aquí
    };

    return (
        <Navbar auth={auth} >
            <Head title='Reporte' />

            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={`REPORTE`} icono={faChartPie} />

                {/*<a onClick={descargar_reporte}
                    href={route("reporte")}
                    target="_self"
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    <FontAwesomeIcon className="h-4 w-5 mr-1" icon={faDownload} />Generar Reporte
                </a>*/}

            </div>


            <FilterComponent
                handleYearChange={handleYearChange}
                handleMonthChange={handleMonthChange}
                handleExactDateChange={handleExactDateChange}
            />


            <div className="flex justify-between px-10 items-center">
                <DashboardCard color="consejo" number="1" title="Consejo Universitario" />
                <DashboardCard color="rectorado" number="2" title="Rectorado" />
                <DashboardCard color="asamblea" number="3" title="Asamblea Universitaria" />
            </div>


            {/*<div className=''>
                <div className='w-full grid grid-cols-4 mt-4 gap-4 pb-5'>
                    <div className=''>
                        <Link href={route('admin', 'pendiente')}>
                            <div className='w-full bg-[#e8b962] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Pendientes</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={tarjetaPendiente.length}
                                />
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <Link href={route('admin', 'rechazado')}>
                            <div className='w-full bg-[#fa5c82] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Rechazadas</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={tarjetaRechazada.length}
                                />
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <Link href={route('d.solicituds.estado', 'proceso')}>
                            <div className='w-full bg-[#2098E0] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes en Proceso</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={tarjetaProceso.length}
                                />
                                <TarjetaPromedio
                                    datos={diferencia_proceso}
                                />
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <Link href={route('d.solicituds.estado', 'finalizado')}>
                            <div className='w-full bg-[#26b594] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Finalizadas</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={tarjetaCompletada.length}
                                />
                                <TarjetaPromedio
                                    datos={diferencia_finalizado}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full grid grid-cols-2 gap-4 pb-5'>

                    <div className='h-[400px]'>
                        <ReporteCircular
                            nombre={`Estado de solicitudes`}
                            datos={graficoCircularDatos}
                        />
                    </div>

                    <div className='h-[400px]'>
                        <ReporteBarrasHorizontal
                            nombre={'Constancias entregadas - Carreras Profesionales'}
                            label={'Constancias'}
                            datos={carreras_prof}
                        />
                    </div>

                </div>

                {/*filterCarrera &&

                    <div className='w-full grid grid-cols-2 gap-4 pb-5'>
                        {/*
                            <div className='h-90'>
                            <ReporteBarrasHorizontal
                                nombre={'Constancias entregadas - Facultades'}
                                label={'Constancias'}
                                datos={facultades}
                            />
                            </div>
                            

                        <div className='h-90'>
                            <ReporteArea
                                nombre={'Constancias No Adeudo entregadas - últimos 6 meses'}
                                datos={graficoAreaDatos}
                            />
                        </div>


                        <div className='h-90'>
                            <ReporteBarrasVertical
                                nombre={'Constancias entregadas - Finalidad'}
                                label={'Constancias'}
                                datos={graficoFinalidadDatos}
                            />
                        </div>

                    </div>
                }

            </div>*/}


        </Navbar>
    );
}
