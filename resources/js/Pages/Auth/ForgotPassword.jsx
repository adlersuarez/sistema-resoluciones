import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';


export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout label='SOLICITAR RESTAURACIÓN DE CONTRASEÑA'>
            <Head title="Cambio de Contraseña" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
            ¿Olvidaste tu contraseña? No hay problema. Simplemente háganos saber su dirección de correo electrónico y le enviaremos una contraseña por correo electrónico
                  restablecer enlace que le permitirá elegir uno nuevo.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-[#007CBC]">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex flex-row text-center mt-4 space-x-12">
                    <Link
                        className="px-10 py-2 w-6/12 text-white bg-[#0064bc] rounded-md focus:outline-none"
                        href={ route("login") }
                    >
                    Regresar
                    </Link>
                    
                    <PrimaryButton className="w-6/12 mt-0" processing={processing}>
                        Enviar Correo
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
