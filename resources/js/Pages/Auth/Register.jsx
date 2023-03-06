import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';


export default function Register({rols}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ID_Rol: '',
        ID_Oficina: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('registro'));
    };

    return (
        <GuestLayout label='Registro de Usuario'>
            <Head title="register" />

            <form onSubmit={submit}>

                {/*comboBox Rol*/}
                <div className=" mt-4 block w-full">

                    <InputLabel forInput="rol" value="Rol" />
                    <select id ='rol' name='rol'  className='block w-full bg-white border border-gray-300 rounded-md h-10 text-gray-500 py'>
                        <option value={data.ID_Rol=2}>Administrador</option>
                        <option value={data.ID_Rol=3}>Usuario</option>
                    </select>

                    <InputError message={errors.ID_Rol} className="mt-2" />

                </div>
                
                {/*ComboBox Oficina*/}
                <div className="mt-4">
                    <InputLabel forInput="oficina" value="Oficina" />

                    <select id ='oficina' name='oficina'  className='block w-full bg-white border border-gray-300 rounded-md h-10 text-gray-500 py'>
                        <option value={data.ID_Oficina=1}>Informacion y comunicaciones</option>
                        <option value={data.ID_Oficina=2}>Logistica</option>
                        <option value={data.ID_Oficina=3}>RR_HH</option>
                        <option value={data.ID_Oficina=4}>Contabilidad</option>
                        <option value={data.ID_Oficina=5}>Vicerrectorado</option>
                        <option value={data.ID_Oficina=6}>Rectorado</option>
                    </select>

                    <InputError message={errors.ID_Oficina} className="mt-2" />
                </div>

                {/*input name*/}
                <div className="mt-4">
                    <InputLabel forInput="name" value="Nombre" />

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                
                {/*input email*/}
                <div className="mt-4">
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/*input password*/}
                <div className="mt-4">
                    <InputLabel forInput="password" value="Contraseña" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>


                {/*input confirmacion password*/}
                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirmar Contraseña" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>


                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        ¿ya registrado?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Registrar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
