import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileClipboard, faFileWord } from '@fortawesome/free-solid-svg-icons';
import DataTableResolucion from '@/Components/DataTable/DataTableResolucion';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

export default function Index({ auth, formatos }) {

    const { data, setData, errors, put, progress } = useForm({
        id_formato: '',
    })

    

    const formatoElegido = formatos.filter(
        dato => dato.id_formato === data.id_formato
    )

    function handleSubmit(e) {
        e.preventDefault();

        if(data.id_formato != ''){
            Inertia.get(route('r.formatos.registrar.'+formatoElegido[0].linkFormato))
        }else{
            Swal.fire({
                icon: 'error',
                title: '¡Es necesario elegir un formato!',
                showConfirmButton: false,
                timer: 1500,
            })
        } 
          
    }

    return (
        <Navbar auth={auth}>
            <Head title='Formatos' />
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Formatos'} icono={faFileClipboard} />

                <form name="createForm" onSubmit={handleSubmit} className='w-4/9'>

                    <div className="flex mx-auto mt-4 justify-between gap-6">
                        <select
                            id='id_formato'
                            name='id_formato'
                            className='block w-full bg-white border h-10'
                            defaultValue={'DEFAULT'}
                            onChange={(e) =>
                                setData('id_formato', e.target.value)
                            }
                            required
                        >
                            <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                            {
                                formatos.map(form => {
                                    return (
                                        <option key={form.id_formato} value={form.id_formato}>{form.nombreFormato}</option>
                                    )
                                })
                            }
                        </select>
                        <button
                            type="submit"
                            className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                {/*<DataTableResolucion datos={resoluciones} miembros={miembros} sesion={tipo_sesion} resolucion={tipo_resolucion} detalle={detalles}/>*/}
            </div>

        </Navbar>
    );
}