import React from 'react';
import ApplicationLogoLogin from '@/Components/ApplicationLogoLogin';
import InputLabel from '@/Components/InputLabel';
import ParticulasLogin from '@/Components/ParticulasFondo/ParticulasLogin';

export default function Guest({ children, label }) {

    //LOGIN

    return (
        <>
            {/*<div className="min-h-screen max-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#007CBC]"> */}
            <div className="min-h-screen flex flex-row">

                <div className='h-screen w-auto flex justify-center items-center relative'>

                    <div className='absolute h-full w-full inset-0 z-20' >
                        <ParticulasLogin />
                    </div>

                    <img src="/images/fondoPantalla/fondo-documentos.jpg" alt="Fondo Pantalla" className='object-cover h-full' />

                    <div className='absolute h-full inset-0 flex flex-col justify-center items-center text-white bg-[#00000025] z-10'>
                        <h3 className='font-[50] text-[35px]'>Bienvenido a la</h3>
                        <h1 className='text-6xl font-montserrat'>INTRANET UPLA</h1>
                    </div>

                </div>

                <div className='bg-white w-[37%] flex flex-col justify-center items-center p-16 z-40'>

                    <div className='flex flex-col rounded-t-xl rounded-b-xl shadow-[0_1px_6px_4px_rgba(0,0,0,0.1)] w-full p-6'>
                        <div className='flex flex-col sm:max-w-lg text-center items-center w-full'>
                            <div>
                                <ApplicationLogoLogin />
                            </div>
                            <div className='px-3 pb-4'>
                                <InputLabel className='h-full w-fit align-middle font-mono text-xl' value={label} />
                            </div>
                        </div>

                        <hr className='h-9/10 bg-[#007CBC] border-0 ' />

                        <div className="flex-full sm:max-w-lg px-4 py-4 w-full">
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
