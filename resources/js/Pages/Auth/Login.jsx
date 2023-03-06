import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword, cantidad}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);
  
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    
    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    
    return (
        <GuestLayout label='SISTEMA RESOLUCIONES'>
            <Head title="Inicio Sesión" />
            {/*status && <div className="mb-4 font-medium text-sm text-[#007CBC]">{status}</div>*/}
            
            <div className='w-9/12'></div>
            
            <form onSubmit={submit}>
                <div className="mt-0 flex">
                    <div className='flex-col w-full'>
                        <InputLabel className="font-black" forInput="email" value="Correo Institucional" />
                        <TextInput
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Ingresar Correo Institucional"
                            className="mt-1 w-full"
                            autoComplete="email"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    
                </div>

                <div className="mt-4 flex">
                    <div className='flex-col w-full'>
                        <InputLabel className="font-black" forInput="password" value="Contraseña" />
                        <TextInput
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Ingresar Contraseña"
                            className="mt-1 w-full"
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>

                {/*
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                       
                        <span className="ml-2 text-sm text-gray-600 ">Recuérdame</span>
                        
                    </label>
                </div>
                */}

                <div className="flex flex-col items-center justify-end mt-4">
                    <PrimaryButton className="flex justify-center text-base" processing={processing}>
                        Ingresar
                    </PrimaryButton>
                    <div className='mt-5 space-x-8'>

                    {/*canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline mt-4 text-sm text-[#007CBC] hover:text-[#0064bc]"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )*/}
                        {/*
                        <Link
                            href={route('notificaciones.create')}
                            className="underline mt-4 text-sm text-green-500 hover:text-green-700"
                        >
                            Solicitar acceso
                        </Link>
                        */}

                    </div>
                </div>
                <div className='block text-center pt-4 text-xs text-gray-600'>
                    SECRETARÍA GENERAL
                </div>

            </form>
        </GuestLayout>
    );
}
