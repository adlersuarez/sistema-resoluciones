import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function VistoResolucion({ }) {

    function editar_visto() {
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Asunto',
            html: `<h1 class="h1-form"> VISTOS</h1>
            <div class="div-form-asunto">
                <div class="div-input-form-asunto">
                    <label class="label-input-form">Descripción</label>
                    <textarea type="number" id="asunto" class="swal2-input" >${localStorage.getItem('visto_resolucion')}</textarea>
                </div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '800px',
            customClass: {
                title: 'custom-title',
                closeButton: 'close-button',
            },
            preConfirm: () => {
                const asunto = Swal.getPopup().querySelector('#asunto').value
                //const imagen = Swal.getPopup().querySelector('#imagen').value

                if (!asunto) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { asunto: asunto }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                localStorage.setItem("visto_resolucion", result.value.asunto);

                Swal.fire({
                    icon: 'success',
                    title: 'Asunto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className='my-2 text-justify text-base' >
            <div className='grid grid-cols-12 mt-2'>
                <div className='col-span-11'>
                    <p> {localStorage.getItem('visto_resolucion')} </p>
                </div>
                <div className='col-span-1 flex'>
                    <Link onClick={() => editar_visto()}
                        className='flex m-auto '>
                        <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                    </Link>
                </div>
            </div>

        </div>
    );
}