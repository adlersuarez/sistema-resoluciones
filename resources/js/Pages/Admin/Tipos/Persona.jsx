import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord, faPerson } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import DataTableTipoSesion from '@/Components/DataTable/Tipos/DataTableTipoSesion';
import DataTableTipoPersonal from '@/Components/DataTable/Tipos/DataTableTipoPersonal';

export default function Persona({tipoPersonas,auth}) {

    const nuevo_tipo = () => {

        Swal.fire({
            title: 'Nuevo Tipo de Personal',
            html: `<div class="div-input-modal"><label class="label-input-modal">Tipo</label><input type="text" id="tipo" class="swal2-input" placeholder="Tipo"></div>
            <div class="div-input-modal"><label class="label-input-modal">Descripción</label><textarea type="textarea" id="descripcion" class="swal2-input" placeholder="Descripción"></textarea></div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '800px',
            customClass: {
               title: 'custom-title',
               closeButton: 'close-button',
            },
            preConfirm: () => {
                const tipo = Swal.getPopup().querySelector('#tipo').value
                const descripcion = Swal.getPopup().querySelector('#descripcion').value

                if (!tipo || !descripcion) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { tipo: tipo, descripcion: descripcion }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                Inertia.post(route('t.tipoPersona.create'),{
                    _method: 'post',
                    nombreTipoPersona: result.value.tipo,
                    descripcionPersona: result.value.descripcion,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Personal Creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title='Personal'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Tipo de Personal'} icono={faPerson}/>
                <Link
                    onClick={nuevo_tipo}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Nuevo
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTableTipoPersonal datos={tipoPersonas}/>
            </div>
            
        </Navbar>
    ); 
}