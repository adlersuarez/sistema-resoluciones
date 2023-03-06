import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Authenticated({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    const alertLogout = (e) => {
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Usted saldra del sistema",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir'
          }).then((result) => { 
            if (result.isConfirmed) {
              Swal.fire(
                'Logout!',
                'Saliste del sistema.',
                'success'
              )
              Inertia.post(route('logout'));
            }
          })
    }

    return (
        
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-[#007CBC] border-b border-gray-100">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-6">
                    <div className="flex justify-between py-3">
                        <div className="flex">
                            {/* Logo UPLA */}
                            <div className="shrink-0 flex items-center">
                                <Link href='#'>
                                    <ApplicationLogo className="h-5 w-auto text-gray-500" />
                                </Link>
                                <div className='text-white ml-8 font-mono max-sm:hidden text-3xl flex align-middle'>
                                    <strong>                                       
                                        UNIVERSIDAD PERUANA LOS ANDES
                                    </strong>
                                </div>
                                <div className='text-white ml-8 font-mono sm:hidden text-5xl flex align-middle'>
                                    <strong>
                                        UPLA
                                    </strong>
                                </div>
                            </div>
                            {auth.user.id_rol==2?
                            <div className="hidden space-x-8 sm:-my-px sm:ml-20 sm:flex font-mono font-bold">
                                {/*
                                <NavLink href={route('user')} active={route().current('user')}>
                                    Inicio
                                </NavLink>
                                
                                <NavLink href={route('d.usersoftwares.index')} active={route().current('d.usersoftwares.index')}>
                                    Software
                                </NavLink>
                                */}

                            </div>  
                            :<></>   
                            }
                        </div>
                        <div className='flex'>
                            <div className="sm:flex sm:items-center m-2">
                                <div className="inline-flex px-2 py-2 border border-transparent text-sm leading-4 rounded-md text-white font-bold hover:text-blue-300 focus:outline-none transition ease-in-out duration-150 ">   
                                </div>
                            </div>
                            <div className={'flex ml-40 md:ml-0'}>
                            {/*
                            <NavLink href={route('carritoindex')} active={route().current('carritoindex')}>
                                <FontAwesomeIcon icon={faBriefcase} className={'h-5 md:h-6'}></FontAwesomeIcon>
                            </NavLink>
                            */}
                            
                            </div>
                        
                            <div className="hidden sm:flex sm:items-center sm:ml-6 h-12 w-38 justify-center m-2 border border-gray-500 rounded-lg bg-white">
                                <div className="ml-3 relative ">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex px-2 py-2 border border-transparent text-sm leading-4 rounded-md text-[#007CBC] font-bold hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
                                            <Link onClick={alertLogout} as="button" className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-red-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
                                                Cerrar Sesión
                                            </Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>                        
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    { auth.user.id_rol == '1' ?
                        <div className="pt-2 pb-3 space-y-1">
                        </div>
                        : auth.user.id_rol == '2' ?
                        <div className="pt-2 pb-3 space-y-1">
                            {
                            <ResponsiveNavLink href={route('user')} active={route().current('user')}>
                                Inicio
                            </ResponsiveNavLink>
                            }
                            {/*
                            <ResponsiveNavLink href={route('d.usersoftwares.index')} active={route().current('d.usersoftwares.index')}>
                                Software
                            </ResponsiveNavLink>
                            */}

                            {/*
                            <ResponsiveNavLink href={route('carritoindex')} active={route().current('carritoindex')}>
                                Solicitudes
                            </ResponsiveNavLink>
                            */}
                            
                            
                        </div>
                        : <></>
                    }

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-blue-200">{auth.user.username}</div>
                            <div className="font-medium text-sm text-blue-300">{auth.user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <Link onClick={alertLogout} as="button" className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-red-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            
            {
                auth.user.id_rol == '1'?
                <div className='flex h-full'>
                    <div className='flex flex-col w-3/5  basis-1/4 bg-blue-400 pt-10'>
                        {/*
                        <Link href={route('reportes')} className='grid'>
                            <ButtonDashboard className='flex'><FontAwesomeIcon className="h-5 w-10"  icon={faUsers} />
                                <span className='hidden sm:flex '>Gestión de Usuarios</span>
                            </ButtonDashboard>
                        </Link>
                        <Link href={route('reportes')} className='grid'>
                            <ButtonDashboard className='flex'><FontAwesomeIcon className="h-5 w-10"  icon={faClipboardList} />
                                <span className='hidden sm:flex '>Gestión de Solicitudes</span>
                            </ButtonDashboard>
                        </Link>
                        <Link href={route('reportes')} className='grid'>
                            <ButtonDashboard className='flex'><FontAwesomeIcon className="h-5 w-10"  icon={faWindowRestore} />
                                <span className='hidden sm:flex '>Gestión de Software</span>
                            </ButtonDashboard>
                        </Link>
                        <Link href={route('reportes')} className='grid'>
                            <ButtonDashboard className='flex'><FontAwesomeIcon className="h-5 w-10"  icon={faComputer} />
                                <span className='hidden sm:flex flex-inline'>Gestión de Equipos</span>
                            </ButtonDashboard>
                        </Link>
                        <Link href={route('reportes')} className='grid'>
                            <ButtonDashboard className='flex'><FontAwesomeIcon className="h-5 w-10"  icon={faBook} />
                                <span className='hidden sm:flex '>Gestión de Reportes</span>
                            </ButtonDashboard>
                        </Link>
                        */}
                    </div>
                    <div className='w-full h-full place-content-around '>
                        <div className='bg-gradient-to-r from-green-100 to-blue-300'>
                            {children} 
                        </div>
                    </div>
                </div> : auth.user.id_rol == '2' ?
                    <div className='flex w-full h-full place-content-around '>
                    
                        <div className='container w-full'>
                            {children} 
                        </div>
                    </div>
                 : <></>
            }
                <footer className='bottom-0 fixed w-full'>
                   <div className='h-14 flex items-center justify-center text-slate-400 border-t-2 border-neutral-100 bg-white'>
                   Copyrigth © UPLA - 2023
                    
                   </div>
                </footer>
            <main>
            
            </main>
            
        </div>
    );
}