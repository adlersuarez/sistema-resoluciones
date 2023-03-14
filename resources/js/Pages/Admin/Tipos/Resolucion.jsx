import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import DataTableTipoResolucion from '@/Components/DataTable/Tipos/DataTableTipoResolucion';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

export default function Resolucion({tipoResoluciones,auth}) {

    const nuevo_tipo = () => {

        Swal.fire({
            title: 'Nuevo Tipo de Resolución',
            html: `<div class="div-input-modal"><label class="label-input-modal">Tipo</label><input type="text" id="tipo" class="swal2-input" placeholder="Tipo"></div>
            <div class="div-input-modal"><label class="label-input-modal">Acrónimo</label><input type="text" id="acronimo" class="swal2-input" placeholder="Acrónimo"></div>
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
                const acronimo = Swal.getPopup().querySelector('#acronimo').value
                const descripcion = Swal.getPopup().querySelector('#descripcion').value

                if (!tipo || !acronimo || !descripcion) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { tipo: tipo, acronimo: acronimo, descripcion: descripcion }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                Inertia.post(route('t.tipoResolucion.create'),{
                    _method: 'post',
                    nombreTipoResolucion: result.value.tipo,
                    acronimoTipoResolucion: result.value.acronimo,
                    descripcionTipoResolucion: result.value.descripcion,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Resolución Creada',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title='Resoluciones'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Tipo de Resoluciones'} icono={faFileWord}/>
                <Link
                    onClick={nuevo_tipo}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Nuevo
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTableTipoResolucion datos={tipoResoluciones}/>
            </div>
            
        </Navbar>
    ); 
}