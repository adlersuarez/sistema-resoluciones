import { faPen, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import IconoSortColumn from '../ComponentesDataTable/IconoSortColumn';
import NoRegistros from '../ComponentesDataTable/NoRegistros';

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

export default function DataTablePersonalUsuario({ datos, rol }) {

    //Eliminar svg de DataTable
    useEffect(() => {
        var element = document.getElementsByClassName("sc-lnskGP");
        if (element[0]) {
            if (element[0].firstElementChild != element[0].lastElementChild) {
                element[0].removeChild(element[0].lastElementChild);
            }
        }
    });
    
    const editar_tipo = (row) => {

        var valor_select_0 = "";
        var valor_select_1 = "";
        var valor_select_2 = "";

        //console.log(row.rol)

        switch (row.rol) {
            case 1:
                valor_select_1 = "selected";
                break;
            case 2:
                valor_select_2 = "selected";
                break;
            default:
                valor_select_0 = "selected";
                break;
        }
        //console.log(valor_select_0+" - "+valor_select_1+" - "+valor_select_2)

        Swal.fire({
            title: 'Actualizar Datos de Usuario',
            html: `<div class="div-user">
            <div class="div-input-user">
            <label class="label-input-user">Username</label><input type="text" id="username" class="swal2-input" value="${row.username}"></div>
            <div class="div-input-user"><label class="label-input-user">Email</label><input type="text" id="email" class="swal2-input" value="${row.email}"></div>
            <div class="div-input-user">
            <label class="label-input-user">Tipo Usuario</label>
            <select id="tipo-usuario">
                <option value="0" id="disabled-option" disabled ${valor_select_0}>Seleccionar Tipo</option>
                <option value="1" ${valor_select_1}>Administrador</option>
                <option value="2" ${valor_select_2}>Usuario</option>
            </select>
            </div>
            </div>
            </div>`,
            confirmButtonText: 'Editar',
            focusConfirm: false,
            showCloseButton: true,
            width: '600px',
            customClass: {
               title: 'custom-title',
               closeButton: 'close-button',
            },
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#username').value
                const email = Swal.getPopup().querySelector('#email').value
                const tipo = Swal.getPopup().querySelector('#tipo-usuario').value
                if (!username || !email || !tipo) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { username: username, email: email, tipo:tipo }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                //console.log(result)
                Inertia.put(route('u.usuarioCuenta.update',`${row.id}`),{
                    _method: 'put',
                    username: result.value.username,
                    email: result.value.email,
                    id_rol: result.value.tipo,
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
            title: `¿Está seguro(a) de eliminar al usuario: <br><b>${row.username.toUpperCase()}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#CB1233',
          }).then((result) => {
            
            if (result.isConfirmed) {
                Inertia.delete(route('u.usuarioCuenta.delete',`${row.id}`))

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }


    const columns = [
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true,

        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,

        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,

        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,

        },
        {
            name: 'Foto',
            cell: (row) => (
                <div className='flex gap-2'>
                    <Link className="text-center text-blue-800 focus:outline-none">
                        <div className='rounded-md w-9 h-9 flex m-auto justify-center '>
                            <FontAwesomeIcon className="h-5 w-5 my-2" id={row.id} icon={faUser} />
                        </div>
                    </Link>
                </div>
            ),

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
            id: elemento.id,
            nombre: elemento.c_apellidoP+" "+elemento.c_apellidoM+", "+elemento.c_nombres,
            username: elemento.username,
            email: elemento.email,
            rol: elemento.id_rol,
            tipo: elemento.c_nomRol,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.nombre.toLowerCase().includes(filterText.toLowerCase())
           || item.username.toLowerCase().includes(filterText.toLowerCase())
           || item.email.toLowerCase().includes(filterText.toLowerCase())
           || item.tipo.toLowerCase().includes(filterText.toLowerCase())
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

            sortIcon={<IconoSortColumn />}
            noDataComponent={<NoRegistros />}
        />
    );
}