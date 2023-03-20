import { faDownload, faFilePdf, faPen, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';

const customStyles = {
    headCells: {
        style: {
            backgroundColor: 'rgba(249, 250, 251, 1)',
            textTransform: 'uppercase',
            color: 'rgba(107, 114, 128, 1))',
            letterSpacing: '0.05em',
            fontSize: '0.75rem',
            fontWeight: '900',
            lineHeight: '1rem',

            borderTop: '2px solid rgba(0, 0, 0, .13)',
            borderBottom: '2px solid rgba(0, 0, 0, .13)',
        }
    },
    cells: {
        style: {
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            overflowX: 'unset'
        }
    },
    subHeader: {
        style: {
            backgroundColor: 'rgba(249, 250, 251, 1)',
            textTransform: 'uppercase',
            color: 'rgba(107, 114, 128, 1))',
            padding: 16
        }
    }
}

const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};

export default function DataTablePersonalAdministrador({ datos }) {

    const editar_tipo = (row) => {

        Swal.fire({
            title: 'Actualizar Datos de Administrador',
            html: `<h1 class="h1-form">DATOS PERSONALES</h1>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">DNI</label><input type="number" id="dni" class="swal2-input" maxlength="8" size="8" value="${row.dni}"></div>
            <div class="div-input-form"><label class="label-input-form">Nombres</label><input type="text" id="nombre" class="swal2-input" value="${row.c_nom}"></div>
            </div>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">Apellido Paterno</label><input type="text" id="apellidoP" class="swal2-input" value="${row.c_apP}"></div>
            <div class="div-input-form"><label class="label-input-form">Apellido Materno</label><input type="text" id="apellidoM" class="swal2-input" value="${row.c_apM}"></div>
            </div>
            <hr class="hr-form"/>
            <h1 class="h1-form">DATOS DE CONTACTO</h1>
            <div class="div-form">
            <div class="div-input-form"><label class="label-input-form">Teléfono</label><input type="number" id="telefono" class="swal2-input" value="${row.telefono}"></div>
            <div class="div-input-form"><label class="label-input-form">Correo</label><input type="email" id="email" class="swal2-input" value="${row.correo}"></div>
            </div>`,
            confirmButtonText: 'Editar',
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

                Inertia.put(route('p.personalAdministrador.update',`${row.id}`),{
                    _method: 'put',
                    c_dni: result.value.dni,
                    c_apellidoP: result.value.apellidoP,
                    c_apellidoM: result.value.apellidoM,
                    c_nombres: result.value.nombre,
                    c_numTelefono: result.value.telefono,
                    c_email: result.value.email,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Datos de administrador actualizados',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const eliminar_tipo = (row) => {

        Swal.fire({
            title: `¿Está seguro(a) de eliminar al personal: <br><b>${row.nombre.toUpperCase()}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#CB1233',
          }).then((result) => {
            
            if (result.isConfirmed) {
                Inertia.delete(route('p.personalAdministrador.delete',`${row.id}`))

                Swal.fire({
                    icon: 'success',
                    title: 'Personal eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }


    const columns = [
        {
            name: 'DNI',
            selector: row => row.dni,
            sortable: true,

        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,

        },
        {
            name: 'Teléfono',
            selector: row => row.telefono,
            sortable: true,

        },
        {
            name: 'Correo',
            selector: row => row.correo,
            sortable: true,

        },
        {
            name: 'Acción',
            cell: (row) => (
                <div className='flex gap-2'>
                    <Link onClick={()=>eliminar_tipo(row)} className="text-center text-white focus:outline-none">
                        <div className='bg-red-600 hover:bg-red-800 rounded-md w-9 h-9 flex m-auto justify-center '>
                            <FontAwesomeIcon className="h-4 w-4 my-2.5" id={row.id} icon={faTrash} />
                        </div>
                    </Link>
                    <Link onClick={()=>editar_tipo(row)} className="text-center text-white focus:outline-none">
                        <div className='bg-green-600 hover:bg-green-800 rounded-md w-9 h-9 flex m-auto justify-center'>
                            <FontAwesomeIcon className="h-4 w-4 my-2.5" id={row.id} icon={faPen} />
                        </div>
                    </Link>
                </div>
            ),
        },
    ];


    var data = []

    datos.map((elemento) =>
        data.push({
            id: elemento.id_persona,
            dni: elemento.c_dni,
            nombre: elemento.c_apellidoP+" "+elemento.c_apellidoM+", "+elemento.c_nombres,
            c_nom: elemento.c_nombres,
            c_apP: elemento.c_apellidoP,
            c_apM: elemento.c_apellidoM,
            telefono: elemento.c_numTelefono,
            correo: elemento.c_email,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.dni.toLowerCase().includes(filterText.toLowerCase())
           || item.nombre.toLowerCase().includes(filterText.toLowerCase())
           || item.telefono.toLowerCase().includes(filterText.toLowerCase())
           || item.correo.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const subHeaderDataTable = useMemo(() => {
        return (
            <div className='relative'>
                <input
                    className=''
                    type="text"
                    id='search'
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder='Search'
                    value={filterText}
                />
                <button className='font-montserrat text-slate-400 absolute right-3 my-auto top-0 bottom-0' onClick={handleClear}>
                    X
                </button>
            </div>
        );

    }, [filterText]);

    return (
        <DataTable
            //title="prueba" 
            columns={columns}
            data={filteredItems}
            customStyles={customStyles}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            paginationComponentOptions={paginationComponentOptions}
            subHeader
            subHeaderComponent={subHeaderDataTable}
        />
    );
}