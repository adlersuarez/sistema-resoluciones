import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { map } from 'lodash';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        Email_User: '',
        Asunto_User: '',
        Mensaje_User: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    /*
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
    */

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Solicitar Acceso" />

            <form onSubmit={submit}>

                <div className=" mt-4 block w-full">

                    <InputLabel forInput="email" value="email" />
                    <input
                        type="email"
                        className="w-full px-4 py-2 text-gray-500"
                        label="Email_User"
                        name="Email_User"
                        value={data.Email_User}
                    />

                    <InputError message={errors.Email_User} className="mt-2" />

                </div>
                
                <div className="mt-4">
                    <InputLabel forInput="asunto" value="asunto" />
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-500"
                        label="Asunto_User"
                        name="Asunto_User"
                        value={data.Asunto_User}
                    />

                    <InputError message={errors.Asunto_User} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="mensaje" value="mensaje" />
                    <input
                        type="text"
                        className="w-full px-4 py-2 text-gray-500"
                        label="Mensaje_User"
                        name="Mensaje_User"
                        value={data.Mensaje_User}
                    />

                    <InputError message={errors.Mensaje_User} className="mt-2" />
                </div>
                
                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        ¿ya tiene acceso?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Enviar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
