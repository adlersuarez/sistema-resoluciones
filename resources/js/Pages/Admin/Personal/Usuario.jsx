import React from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import DataTablePersonalUsuario from '@/Components/DataTable/Personal/DataTablePersonalUsuario';

export default function Usuario({usuarios,roles,persona,auth}) {

    var selectPersona = "";
   
    persona.map( per => {
        selectPersona += `<option value="${per.id_persona}">${per.c_apellidoP+" "+per.c_apellidoM+" "+per.c_nombres+" - "+per.nombreTipoPersona}</option>`
    });

    const nuevo_tipo = () => {

        Swal.fire({
            title: 'Registro de Usuarios',
            html: `
            <div class="div-user">
            <div class="div-input-user">
            <label class="label-input-user">Persona</label>
            <select id="id-persona"  data-live-search="true">
                <option value="0" id="disabled-option" disabled selected="true"}>Seleccionar Persona</option>
                ${selectPersona}
            </select></div>
            <div class="div-input-user">
            <label class="label-input-user">Username</label><input type="text" id="username" class="swal2-input" placeholder="Username"></div>
            <div class="div-input-user"><label class="label-input-user">Email</label><input type="text" id="email" class="swal2-input" placeholder="Email"></div>
            <div class="div-input-user">
            <label class="label-input-user">Tipo Usuario</label>
            <select id="tipo-usuario">
                <option value="0" id="disabled-option" disabled selected}>Seleccionar Tipo</option>
                <option value="1">Administrador</option>
                <option value="2">Usuario</option>
            </select>
            </div>
            </div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '700px',
            customClass: {
               title: 'custom-title',
               closeButton: 'close-button',
            },
            preConfirm: () => {
                const id_persona = Swal.getPopup().querySelector('#id-persona').value
                const username = Swal.getPopup().querySelector('#username').value
                const email = Swal.getPopup().querySelector('#email').value
                const tipo = Swal.getPopup().querySelector('#tipo-usuario').value
                if (!username || !email || !tipo || !id_persona ) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { username: username, email: email, tipo:tipo ,id_persona:id_persona}
            }
        }).then((result) => {
            if (result.isConfirmed) {

                Inertia.post(route('u.usuarioCuenta.create'),{
                    _method: 'post',
                    id_persona: result.value.id_persona,
                    username: result.value.username,
                    email: result.value.email,
                    id_rol: result.value.tipo,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Nuevo Usuario creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <Navbar auth={auth}>
            <Head title='Usuarios'/>
            <div className='w-full flex justify-between mt-10 mb-5'>

                <TitlePages texto={'Usuarios'} icono={faUserCircle}/>
                <Link
                    onClick={nuevo_tipo}
                    className="text-center px-3 py-2 text-white bg-[#2f45ab] rounded-md focus:outline-none">
                    Registro
                </Link>
            </div>
            <div className="overflow-x-auto relative shadow-md rounded-lg mt-5 p-4 bg-[#F9FAFB]">
                <DataTablePersonalUsuario datos={usuarios} rol={roles}/>
            </div>
            
        </Navbar>
    ); 
}