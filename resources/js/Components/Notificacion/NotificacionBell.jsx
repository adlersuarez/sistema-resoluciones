import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/inertia-react';
import Dropdown from '../Dropdown';

export default function NotificacionBell({cantidad,datos,titulo,ruta,texto}) {

    var cantidad_total=cantidad;

    return (
        <>
        <div className='font-bold'>
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="m-auto">
                        
                        <button type="button" className={'relative inline-flex px-2 py-2 border border-transparent text-sm leading-4 rounded-md text-[#007CBC] font-bold hover:text-[#686a6e] outline-none transition ease-in-out duration-150'} >
                            <div className='my-auto text-[#23377d]'>
                                <span className='align-middle'>{titulo}</span>
                            </div>

                            <FontAwesomeIcon className="h-5 w-10" icon={faBell} />
                            
                            {   cantidad_total != 0 &&
                                <span className='absolute -top-0 right-2 bg-red-400 py-0.3 px-[5px] box-content text-black rounded-full text-[10px] font-bold'>
                                    <p className='text-white'>
                                        {cantidad_total}
                                    </p>
                                </span>
                            }
                            
                        </button>
                    </span>
                </Dropdown.Trigger>
                {
                    datos != undefined &&
                    <Dropdown.Content>
                        <div className=''>
                            <div className='grid place-items-center rounded-t-md text-center text-white uppercase bg-[#0064bc] h-7 font-black'>
                                <p className='text-[1rem] font-mono'>Notificaciones</p>
                            </div>
                            
                            <Link href={route(ruta)} className='grid grid-cols-6 py-2'>
                                
                                <div className='col-span-2 grid place-items-center'>
                                    <div className='text-black'>
                                        <p className='text-3xl'> 
                                            {cantidad_total} 
                                        </p> 
                                    </div>
                                </div>

                                <div className='col-span-4 grid text-left text-black'>
                                    {   cantidad_total == 1 ?
                                        <h5 className='font-semibold'>Solicitud</h5>
                                        :
                                        <h5 className='font-semibold'>Solicitudes</h5>
                                    }
                                    
                                    <small className='text-slate-500'> {texto} </small>
                                </div>
                                
                            </Link>           
                            {/*
                            <hr />
                            <Link href='AEA'>
                                Show All Alerts
                            </Link>
                            */}
                    </div>
                    </Dropdown.Content>
                }
                
            </Dropdown>
        </div>
        
        </>

    );
}