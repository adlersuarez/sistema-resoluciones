import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import DataTablePersonalAdministrador from '@/Components/DataTable/Personal/DataTablePersonalAdministrador';


export default function Administrador({tipoAdmin,auth}) {

    const nuevo_tipo = () => {

        Swal.fire({
            title: 'Registro de Administradores',
            html: `<h1 class="h1-form">DATOS PERSONALES</h1>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">DNI</label><input type="number" id="dni" class="swal2-input" maxlength="8" size="8" placeholder="DNI"></div>
            <div class="div-input-form"><label class="label-input-form">Nombres</label><input type="text" id="nombre" class="swal2-input" placeholder="Nombres"></div>
            </div>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">Apellido Paterno</label><input type="text" id="apellidoP" class="swal2-input" placeholder="Apellido Paterno"></div>
            <div class="div-input-form"><label class="label-input-form">Apellido Materno</label><input type="text" id="apellidoM" class="swal2-input" placeholder="Apellido Materno"></div>
            </div>
            <hr class="hr-form"/>
            <h1 class="h1-form">DATOS DE CONTACTO</h1>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">Teléfono</label><input type="number" id="telefono" class="swal2-input" placeholder="Teléfono"></div>
            <div class="div-input-form"><label class="label-input-form">Correo</label><input type="email" id="email" class="swal2-input" placeholder="Email"></div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '1000px',
            customClass: {
               title: 'custom-title',
               closeButton: 'close-button',
            },
            preConfirm: () => {
                const dni = Swal.getPopup().querySelector('#dni').value
                const nombre = Swal.getPopup().querySelector('#nombre').value
                const apellidoP = Swal.getPopup().querySelector('#apellidoP').value
                const apellidoM = Swal.getPopup().querySelector('#apellidoM').value
                const telefono = Swal.getPopup().querySelector('#telefono').value
                const email = Swal.getPopup().querySelector('#email').value

                if (!dni || !nombre || !apellidoP || !apellidoM || !telefono || !email) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { dni: dni, nombre: nombre, apellidoP: apellidoP, apellidoM: apellidoM, telefono: telefono, email: email }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                Inertia.post(route('p.personalAdministrador.create'),{
                    _method: 'post',
                    c_dni: result.value.dni,
                    c_apellidoP: result.value.apellidoP,
                    c_apellidoM: result.value.apellidoM,
                    c_nombres: result.value.nombre,
                    c_numTelefono: result.value.telefono,
                    c_email: result.value.email,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Nuevo Administrador creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title='Administradores'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Administradores del Sistema'} icono={faUserEdit}/>
                <Link
                    onClick={nuevo_tipo}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registro
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTablePersonalAdministrador datos={tipoAdmin}/>
            </div>
            
        </Navbar>
    ); 
}