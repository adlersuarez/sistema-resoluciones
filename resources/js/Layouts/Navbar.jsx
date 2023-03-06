import React, { useEffect,useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faUser, faFileArchive, faFileAlt, faArchive, faMoneyCheck, faBookBookmark, faFileClipboard, faBarChart, faFileCircleExclamation, faSignOut} from '@fortawesome/free-solid-svg-icons';
import Dropdown from '@/Components/Dropdown';
import { Inertia } from '@inertiajs/inertia';
import SideLink from '@/Components/SideLink';
import Swal from 'sweetalert2';
import NotificacionBell from '@/Components/Notificacion/NotificacionBell';
import NavBarElement from '@/Components/Dropdown/NavBarElement';

const Navbar = ({auth,children}) => {
  
    const [open,setOpen] = useState(true);
    
    useEffect(()=> {
        const data = window.localStorage.getItem('valueOpen');
        setOpen(JSON.parse(data));
    },[])
    
    useEffect(() => {
        window.localStorage.setItem('valueOpen',JSON.stringify(open))
    },[open])
    
    const styleOpen = {
        display:"flex"
    }
    const styleClose = {
        display:"none"
    }


    const alertLogout = (e) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Usted saldrá del sistema",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir'
        }).then((result) => { 
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Saliste del Sistema!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                })

                Inertia.post(route('logout'));
            }
        })
    }

    const navBarLink = {
        'reportes' : [
                { 'titulo' : 'Reportes' },
                { 'icono' : faBarChart },
                { 'elementos' :
                    [
                        {   
                            'id' : 0,
                            'nombre' : 'Constancia de No adeudo',
                            'ruta' : 'admin',
                        },
                    ]
                }
            ],

        'solicitudes' : [
            { 'titulo' : 'Solicitudes' },
            { 'icono' : faFileAlt },
            { 'elementos' :
                [
                    {   
                        'id' : 0,
                        'nombre' : 'Pendientes',
                        'ruta' : 'd.solicituds.estadoPR',
                        'subruta' : 'pendiente',
                    },
                    {   
                        'id' : 1,
                        'nombre' : 'En proceso',
                        'ruta' : 'd.solicituds.estado',
                        'subruta' : 'proceso',
                    },
                    {   
                        'id' : 2,
                        'nombre' : 'Rechazadas',
                        'ruta' : 'd.solicituds.estadoPR',
                        'subruta' : 'rechazado',
                    },
                    {   
                        'id' : 3,
                        'nombre' : 'Finalizadas',
                        'ruta' : 'd.solicituds.estado',
                        'subruta' : 'finalizado',
                    },
                ]
            }
        ],

        'archivoEstudiantil' : [
            { 'titulo' : 'Archivo Estudiantil - ORyM'},
            { 'icono' : faArchive},
            { 'elementos' :
                [
                    {   
                        'id' : 0,
                        'nombre' : 'Solicitudes Pendientes',
                        'ruta' : 'd.archivoEstudiantil',
                    },
                    {   
                        'id' : 1,
                        'nombre' : 'Validados',
                        'ruta' : 'd.archivoEstudiantil.validado',
                    },
                ]
            }
        ],

        'durs' : [
            { 'titulo' : 'Proyección Social - DURS'},
            { 'icono' : faFileClipboard},
            { 'elementos' :
                [
                    {   
                        'id' : 0,
                        'nombre' : 'Solicitudes Pendientes',
                        'ruta' : 'd.durs',
                    },
                    {   
                        'id' : 1,
                        'nombre' : 'Validados',
                        'ruta' : 'd.durs.validado',
                    },
                ]
            }
        ],

        'oefc' : [
            { 'titulo' : 'Caja - OEyF'},
            { 'icono' : faMoneyCheck},
            { 'elementos' :
                [
                    {   
                        'id' : 0,
                        'nombre' : 'Solicitudes Pendientes',
                        'ruta' : 'd.oefc',
                    },
                    {   
                        'id' : 1,
                        'nombre' : 'Validados',
                        'ruta' : 'd.oefc.validado',
                    },
                ]
            }
        ],

        'facultades' : [
            { 'titulo' : 'Facultades'},
            { 'icono' : faBookBookmark},
            { 'elementos' :
                [
                    {   
                        'id' : 0,
                        'nombre' : 'Solicitudes Pendientes',
                        'ruta' : 'd.facultades',
                    },
                    {   
                        'id' : 1,
                        'nombre' : 'Validados',
                        'ruta' : 'd.facultades.validado',
                    },
                ]
            }
        ],
    };

    return (
        <div className='flex justify-between relative '>
            <div className="shadow-md bg-[#007CBC] sticky top-0 h-screen md:h-screen" style={open ?{width:'18%'}:{width:'5%'}}>
                <div className='relative '>
                    <div className="pt-4 px-6">
                        <a href="#">
                            {/*<div className="space-x-3 flex lg:flex-row min-[200px]:flex-col cursor-auto items-center pb-4 border-b border-gray-200">*/}
                            <div className="flex lg:flex-row min-[200px]:flex-col items-center justify-center w-full p-2 text-base font-normal text-white rounded-lg transition duration-300 ease-in-out gap-5">

                                <div className="shrink-0">
                                    
                                    <img src='/images/Logo/logoupla.svg' className='bg-white rounded-lg' style={open ?{width:'75px'}:{width:'35px'}} alt="" />

                                    {/*
                                    <img src={'https://intranet.upla.edu.pe/Capa_Presentacion/Recursos/logo-upla.gif'} style={open ?{width:'75px'}:{width:'26.72px'}} alt="" />
                                    */}
                                    
                                </div>
                                <div className="grow text-center" style={open ? styleOpen : styleClose} >
                                    <strong className="text-4xl text-white md:inline min-[200px]:hidden bold font-mirza">
                                        TRÁMITE NO ADEUDO
                                    </strong>
                                </div>
                            </div>
                        </a>
                        <br/>
                    </div>
                </div>

                <div onClick={() => setOpen(!open)} className='absolute md:block w-10 h-10 text-lg text-white cursor-pointer top-2/4 -right-3 flex items-center justify-center rounded-full bg-[#007CBC] pt-2'>
                    <FontAwesomeIcon className=" h-5 w-10"  icon={faCircleLeft} style={open?{transform: 'rotate(0deg)',}:{transform: 'rotate(180deg)'}} /> 
                </div>

                <hr />

                <div className="overflow-y-auto mt-3">
                    
                    <ul className="space-y-2 ">

                        <NavBarElement elementos = {navBarLink.reportes} estado = {open} widthLista = {'w-60'}/>

                        <hr />
                        
                        {/* <li className='px-3'>
                                <SideLink href={route('d.solicituds')} active={route().current('d.solicituds')}>
                                    <FontAwesomeIcon className="h-5 w-6 "  icon={faFilePen} />
                                    <div style={open ? styleOpen : styleClose} className="flex-1 lg:ml-3 min-[200px]:ml-0">
                                        <span className='md:inline min-[200px]:hidden lg:text-left min-[200px]:text-center' >General</span>
                                    </div>
                                </SideLink>
                            </li> */}

                        <li className='px-3'>
                            <SideLink href={route('d.solicitud.secretaria')} active={route().current('d.solicitud.secretaria')}>
                                <FontAwesomeIcon className="h-5 w-6"  icon={faFileCircleExclamation} />
                                <div style={open ? styleOpen : styleClose} className="flex-1 lg:ml-3 min-[200px]:ml-0">
                                    <span className='md:inline min-[200px]:hidden lg:text-left min-[200px]:text-center'>
                                        <strong>Secretaría - ORyM</strong>
                                    </span>
                                </div>
                            </SideLink>
                        </li>

                        <li className='px-3'>
                            <SideLink href={route('d.solicitud.jefatura')} active={route().current('d.solicitud.jefatura')}>
                                <FontAwesomeIcon className="h-5 w-6 "  icon={faFileArchive} />
                                <div style={open ? styleOpen : styleClose} className="flex-1 lg:ml-3 min-[200px]:ml-0">
                                    <span className='md:inline min-[200px]:hidden lg:text-left min-[200px]:text-center'>
                                        <strong>Jefatura Oficina - ORyM</strong>
                                    </span>
                                </div>
                            </SideLink>
                        </li>

                        {// Solicitudes
                        <NavBarElement elementos = {navBarLink.solicitudes} estado = {open} widthLista = {'w-40'}/>
                        }

                        <hr />
                        
                        {// ArchivoEstudiantil
                        <NavBarElement elementos = {navBarLink.archivoEstudiantil} estado = {open} widthLista = {'w-56'}/>
                        }

                        {// Durs
                        <NavBarElement elementos = {navBarLink.durs} estado = {open} widthLista = {'w-56'}/>
                        }

                        {// Oefc
                        <NavBarElement elementos = {navBarLink.oefc} estado = {open} widthLista = {'w-56'}/>
                        }

                        {//  Facultades
                        <NavBarElement elementos = {navBarLink.facultades} estado = {open} widthLista = {'w-56'}/>
                        }
                        <hr />
                        
                    </ul>
                        
                </div>
            </div>
                
                <div className='bg-white' style={open ?{width:'82%'}:{width:'95%'}}>
                    <div className='flex p-5 justify-between items-center h-14 border-b border-neutral-100 shadow-md'>
                        <div className='text-slate-400'>
                            <label className='hidden md:block'>Bienvenido(a) {auth.user.username}</label>
                        </div>

                        <div className='flex flex-row gap-2 md:gap-6'>
                            
                            <NotificacionBell 
                                cantidad={auth.cantidad_secretaria}
                                titulo={'Secretaría'}
                                ruta ={'d.solicitud.secretaria'}
                                texto = {'Pendientes'}
                                datos={'no-adeudo'}
                            />

                            <NotificacionBell 
                                cantidad={auth.cantidad_jefatura}
                                titulo={'Jefatura'}
                                ruta ={'d.solicitud.jefatura'}
                                texto = {'Validadas | Jefatura'}
                                datos={'no-adeudo'}
                            />

                            <NotificacionBell 
                                cantidad={auth.cantidad_AE}
                                titulo={'AE'}
                                ruta ={'d.archivoEstudiantil'}
                                texto = {'Archivo Estudiantil'}
                                datos={'no-adeudo'}
                            />

                            <NotificacionBell 
                                cantidad={auth.cantidad_FAC}
                                titulo={'Facultades'}
                                ruta ={'d.facultades'}
                                texto = {'Facultades'}
                                datos={'no-adeudo'}
                            />

                            <NotificacionBell 
                                cantidad={auth.cantidad_PAI}
                                titulo={'Proyección Social'}
                                ruta ={'d.durs'}
                                texto = {'Proyección social'}
                                datos={'no-adeudo'}
                            />

                            <NotificacionBell 
                                cantidad={auth.cantidad_OEFC}
                                titulo={'Caja'}
                                ruta ={'d.oefc'}
                                texto = {'Caja'}
                                datos={'no-adeudo'}
                            />


                            <div className='rounded-md px-2 font-bold text-slate-200 text-md border border-[#007CBC]'>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                                    
                                        <button
                                            type="button"
                                            className="text-xs inline-flex md:px-2 py-2 border border-transparent md:text-sm leading-4 rounded-md text-[#007CBC] font-bold hover:text-gray-700 outline-none transition ease-in-out duration-150"
                                        >
                                            <FontAwesomeIcon className="h-5 w-10"  icon={faUser} />{auth.user.username.toUpperCase()}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    
                                    <Link onClick={alertLogout} as="button" className='block w-full px-6 py-2 text-right text-sm leading-5 text-gray-700 hover:bg-blue-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
                                        Cerrar Sesión
                                        <FontAwesomeIcon className="h-4 w-5 ml-4"  icon={faSignOut} />
                                    </Link>
                                
                                </Dropdown.Content>
                            </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center bg-slate-100 overflow-y-auto ' style={{height:'calc(100% - 112px)'}}>
                        <div className='w-11/12 flex flex-col'>
                        {children}
                        </div>  
                    </div>
                    <div className=' h-14 flex items-center justify-center text-slate-400 border-t-2 border-neutral-100'>
                    <div>
                        Copyrigth © UPLA - 2023
                    </div>
                    </div>
                </div>
        </div>
  )
}

export default Navbar