import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
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

export default function DataTableTipoSesion({ datos }) {

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

        Swal.fire({
            title: 'Actualizar Tipo de Sesión',
            html: `<div class="div-input-modal"><label class="label-input-modal">Tipo</label><input type="text" value="${row.titulo}" id="tipo" class="swal2-input" placeholder="Tipo"></div>
            <div class="div-input-modal"><label class="label-input-modal">Descripción</label><textarea type="textarea" id="descripcion" class="swal2-input" placeholder="Descripción">${row.descripcion}</textarea></div>`,
            confirmButtonText: 'Editar',
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

                Inertia.put(route('t.tipoSesion.update',`${row.id}`),{
                    _method: 'put',
                    nombreSesion: result.value.tipo,
                    descripcionSesion: result.value.descripcion,
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Sesión Actualizada',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const eliminar_tipo = (row) => {

        Swal.fire({
            title: `¿Está seguro(a) de eliminar el tipo de sesión: <br><b>${row.titulo.toUpperCase()}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#CB1233',
          }).then((result) => {
            
            if (result.isConfirmed) {
                Inertia.delete(route('t.tipoSesion.delete',`${row.id}`))

                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Sesión Eliminada',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
          })
    }


    const columns = [
        {
            name: 'Tipo de Resolución',
            selector: row => row.titulo,
            sortable: true,

        },
        {
            name: 'Descripción',
            selector: row => row.descripcion,
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
            id: elemento.id_tipoSesion,
            titulo: elemento.nombreSesion,
            descripcion: elemento.descripcionSesion,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.titulo.toLowerCase().includes(filterText.toLowerCase())
           || item.descripcion.toLowerCase().includes(filterText.toLowerCase())
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
            noDataComponent={<NoRegistros />}
        />
    );
}