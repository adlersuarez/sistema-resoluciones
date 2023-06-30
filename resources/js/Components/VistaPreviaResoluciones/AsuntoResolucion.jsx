import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function AsuntoResolucion({ listaAsuntos }) {

    function editar_asunto(cod) {
        var indiceEditar = listaAsuntos.findIndex(item => item.cod === cod)
        var aux = listaAsuntos[indiceEditar]
        //console.log(aux)
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Asunto',
            html: `<h1 class="h1-form"> Art. ${indiceEditar + 1}° - ${aux.nombre.toUpperCase()}</h1>
            <div class="div-form-asunto">
                <div class="div-input-form-asunto">
                    <label class="label-input-form">Descripción</label>
                    <textarea type="number" id="asunto" class="swal2-input" >${aux.descripcion}</textarea>
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

                aux.descripcion = result.value.asunto
                listaAsuntos.splice(indiceEditar, 1, aux)
                localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

                //console.log(listaAsuntos)

                Swal.fire({
                    icon: 'success',
                    title: 'Asunto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    function eliminar_asunto(cod) {
        var indiceBorrado = listaAsuntos.findIndex(item => item.cod === cod)
        listaAsuntos.splice(indiceBorrado, 1)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_arriba_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem - 1]

        listaAsuntos.splice(indiceItem - 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_abajo_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem + 1]

        listaAsuntos.splice(indiceItem + 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function estado_lista_asunto_inicio(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_asunto_fin(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == (listaAsuntos.length - 1)) {
            return true
        }
    }

    return (
        <>
            {listaAsuntos.map((asunto, index) => {

                return (
                    <div className='grid grid-cols-12 mt-2' key={asunto.cod}>
                        <div className='col-span-2 flex flex-row'>
                            <div className='flex w-8 mt-1 mr-2'>
                                {!estado_lista_asunto_fin(asunto.cod) &&
                                    <Link onClick={() => mover_abajo_asunto(asunto.cod)}
                                        className='flex mx-auto '>
                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                    </Link>
                                }
                                {!estado_lista_asunto_inicio(asunto.cod) &&
                                    <Link onClick={() => mover_arriba_asunto(asunto.cod)}
                                        className='flex mx-auto '>
                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                    </Link>
                                }
                            </div>
                            <div className='text-base'>
                                <strong>Art. {index + 1}°</strong>
                            </div>

                        </div>
                        <div className='col-span-9 mx-2 text-justify text-base'>
                            <strong>{asunto.nombre.toUpperCase()}</strong> {asunto.descripcion}
                        </div>
                        <div className='col-span-1 flex'>
                            <Link onClick={() => editar_asunto(asunto.cod)}
                                className='flex mx-auto '>
                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                            </Link>

                            <Link onClick={() => eliminar_asunto(asunto.cod)}
                                className='flex mx-auto '>
                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-red-700" icon={faTrash} />
                            </Link>

                        </div>
                    </div>
                )
            })

            }
        </>
    );
}