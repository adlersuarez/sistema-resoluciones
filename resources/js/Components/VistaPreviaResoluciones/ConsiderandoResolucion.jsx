import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEdit, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function ConsiderandoResolucion({ listaConsiderando }) {

    function editar_considerando(id) {
        var indiceEditar = listaConsiderando.findIndex(item => item.id === id)
        var aux = listaConsiderando[indiceEditar]
        //console.log(aux)
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Considerando',
            html: `<h1 class="h1-form"> ${aux.tipo.toUpperCase()} - ${aux.nombre}</h1>
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
                listaConsiderando.splice(indiceEditar, 1, aux)
                localStorage.setItem("listaAsuntos", JSON.stringify(listaConsiderando));

                //console.log(listaConsiderando)

                Swal.fire({
                    icon: 'success',
                    title: 'Considerando actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    function eliminar_considerando(id) {
        var indiceBorrado = listaConsiderando.findIndex(item => item.id === id)
        listaConsiderando.splice(indiceBorrado, 1)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));

        /*var indiceBorradoDoc = listaVisto.findIndex(item => item.id === id)
        listaConsiderando.splice(indiceBorradoDoc, 1)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));*/
    }
    function mover_arriba_considerando(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        const aux_pos1 = listaConsiderando[indiceItem]
        const aux_pos2 = listaConsiderando[indiceItem - 1]

        listaConsiderando.splice(indiceItem - 1, 1, aux_pos1)
        listaConsiderando.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));
    }
    function mover_abajo_considerando(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        const aux_pos1 = listaConsiderando[indiceItem]
        const aux_pos2 = listaConsiderando[indiceItem + 1]

        listaConsiderando.splice(indiceItem + 1, 1, aux_pos1)
        listaConsiderando.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));
    }
    function estado_lista_considerando_inicio(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_considerando_fin(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        if (indiceItem == (listaConsiderando.length - 1)) {
            return true
        }
    }

    return (
        <>
            {listaConsiderando.map((considerando) => {

                return (
                    <div className='grid grid-cols-12 mt-2' key={considerando.id}>
                        <div className='col-span-1 flex flex-row'>
                            <div className='flex w-8 mt-1 mr-2'>
                                {!estado_lista_considerando_fin(considerando.id) &&
                                    <Link onClick={() => mover_abajo_considerando(considerando.id)}
                                        className='flex mx-auto '>
                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                    </Link>
                                }
                                {!estado_lista_considerando_inicio(considerando.id) &&
                                    <Link onClick={() => mover_arriba_considerando(considerando.id)}
                                        className='flex mx-auto '>
                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                    </Link>
                                }
                            </div>

                        </div>
                        <div className='col-span-10 mx-2 text-justify text-base'>
                            {considerando.descripcion}
                        </div>
                        <div className='col-span-1 flex'>
                            <Link onClick={() => editar_considerando(considerando.id)}
                                className='flex mx-auto '>
                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                            </Link>

                            <Link onClick={() => eliminar_considerando(considerando.id)}
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