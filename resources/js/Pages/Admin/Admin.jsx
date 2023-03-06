import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import { faChartPie, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReporteArea from '@/Components/Reporte/ReporteArea';
import ReporteCircular from '@/Components/Reporte/ReporteCircular';
import ReporteBarrasHorizontal from '@/Components/Reporte/ReporteBarrasHorizontal';
import ReporteBarrasVertical from '@/Components/Reporte/ReporteBarrasVertical';
import TarjetaCantidad from '@/Components/Reporte/TarjetaCantidad';
import TarjetaPromedio from '@/Components/Reporte/TarjetaPromedio';
import TitlePages from '@/Components/Titulo/TitlePages';
import Swal from 'sweetalert2';

export default function Admin({auth,estado_solicitudes,constancias_fecha,cantidades_facultad,cantidades_carrera,cantidades_finalidad,diferencia_finalizado,diferencia_proceso}) {

    //Cuenta los distintas cantidades x carreras profesional 
    var carreras_prof = cantidades_carrera.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})

    //Cuenta los distintas cantidades x finalidad 
    var finalidad = cantidades_finalidad.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})

    //Cuenta los distintas cantidades x facultad
    var facultad = cantidades_facultad.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})

    const descargar_reporte = (e) => {

        Swal.fire({
            icon: 'success',
            title: '¡Su reporte ha sido generado exitosamente!',
            showConfirmButton: false,
            timer: 2000
        })
    }

    return (
        <Navbar auth={auth} >
            <Head title='Admin'/>

            <div className='w-full flex justify-between mt-10 mb-5'>
                
                <TitlePages texto={'REPORTE - Constancia No Adeudo'} icono={faChartPie}/>
                
                <a onClick={descargar_reporte}
                    href={route("reporte")}
                    target="_self"
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    <FontAwesomeIcon className="h-4 w-5 mr-1" icon={faDownload} />Generar Reporte
                </a>

            </div>

            <div className=''>
                <div className='w-full grid grid-cols-4 mt-4 gap-4 pb-5'>
                    <div className=''>
                        <Link href={route('d.solicituds.estadoPR','pendiente')}>
                            <div className='w-full bg-[#e8b962] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Pendientes</strong>
                            </div>
                        </Link>   
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={estado_solicitudes.Pendiente}
                                />
                            </div>
                        </div> 
                    </div>

                    <div className=''>
                        <Link href={route('d.solicituds.estadoPR','rechazado')}>
                            <div className='w-full bg-[#fa5c82] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Rechazadas</strong>
                            </div>
                        </Link>   
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={estado_solicitudes.Rechazado}
                                />
                            </div>
                        </div> 
                    </div>

                    <div className=''>
                        <Link href={route('d.solicituds.estado','proceso')}>
                            <div className='w-full bg-[#2098E0] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes en Proceso</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={estado_solicitudes.Proceso}
                                />
                                <TarjetaPromedio 
                                    datos={diferencia_proceso}
                                />
                            </div>
                        </div> 
                    </div>

                    <div className=''>
                        <Link href={route('d.solicituds.estado','finalizado')}>
                            <div className='w-full bg-[#26b594] text-center text-white rounded-t-lg p-2 text-xl'>
                                <strong>Solicitudes Finalizadas</strong>
                            </div>
                        </Link>
                        <div className='flex bg-white p-5 text-center text-lg space-x-2 border-2'>
                            <div className='w-full flex space-x-2 justify-center'>
                                <TarjetaCantidad
                                    cantidad={estado_solicitudes.Completado}
                                />
                                <TarjetaPromedio 
                                    datos={diferencia_finalizado}
                                />
                            </div>
                        </div> 
                    </div>
                </div>

                <div className='w-full grid grid-cols-3 gap-4 pb-5'>
                    
                    <div className='h-90'>
                        <ReporteCircular 
                        nombre={'Estado de solicitudes'}
                        datos={estado_solicitudes}
                        />
                    </div>

                    <div className='h-90 col-span-2'>
                        <ReporteArea
                            nombre={'Constancias No Adeudo entregadas - últimos 6 meses'}
                            datos={constancias_fecha}
                        />
                    </div>

                </div>

                <div className='w-full grid grid-cols-2 gap-4 pb-5'>
                    {/*
                    <div className='h-90'>
                       <ReporteBarrasHorizontal
                        nombre={'Constancias entregadas - Facultades'}
                        label={'Constancias'}
                        datos={facultades}
                       />
                    </div>
                    */}

                    <div className='h-90'>
                       <ReporteBarrasHorizontal
                        nombre={'Constancias entregadas - Carreras Profesionales'}
                        label={'Constancias'}
                        datos={carreras_prof}
                       />
                    </div>

                    <div className='h-90'>
                        <ReporteBarrasVertical
                        nombre={'Constancias entregadas - Finalidad'}
                        label={'Constancias'}
                        datos={finalidad}
                        />
                    </div>

                </div>

            </div>
        </Navbar>
    );
}