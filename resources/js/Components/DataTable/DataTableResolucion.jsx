import { faArchive, faDownload, faFilePdf, faPen, faRefresh, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import IconoSortColumn from './ComponentesDataTable/IconoSortColumn';
import NoRegistros from './ComponentesDataTable/NoRegistros';

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

export default function DataTableResolucion({ datos, miembros, sesion, resolucion }) {

    //console.log(sesion)
    //console.log(resolucion)
    //Eliminar svg de DataTable
    useEffect(() => {
        var element = document.getElementsByClassName("sc-lnskGP");
        if (element[0]) {
            if (element[0].firstElementChild != element[0].lastElementChild) {
                element[0].removeChild(element[0].lastElementChild);
            }
        }
    });
    ////////////////////////////////////////////////////////////

    const mostrarMiembro = (id) => {

        const resolucion = datos.filter(
            dato => dato.id_resolucion === id
        )

        const miembrosResolucion = miembros.filter(
            miembro => miembro.id_resolucion === id
        )

        var elementosTabla = '';

        miembrosResolucion.map(mRes => {
            elementosTabla += `<tr class="tr-miembros">
                                <td class="td-dni">${mRes.c_dni}</td>
                                <td class="td-nombre">${mRes.c_apellidoP + ' ' + mRes.c_apellidoM + ' ' + mRes.c_nombres}</td>
                                <td class="td-descripcion">${mRes.descripcionMiembro}</td>
                            </tr>`;
        })

        var tabla = `<table class="table-miembros-res">
                        <tr class="tr-miembros">
                            <th class="th-dni">DNI</th>
                            <th class="th-nombre">Nombre</th>
                            <th class="th-descripcion">Descripción</th>
                        </tr>
                        ${elementosTabla}
                    </table>`
        if (miembrosResolucion.length > 0) {
            Swal.fire({
                title: `Resolución | ${resolucion[0].nombreResolucion}`,
                html: `<div class="div-table-miembros">
                        ${tabla}
                        </div>`,
                focusConfirm: false,
                showCloseButton: true,
                width: '650px',
                customClass: {
                    title: 'custom-title',
                },
                showConfirmButton: true,
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: `Resolución | ${resolucion[0].nombreResolucion}`,
                text: 'No hay miembros en esta resolución',
            })
        }
    }

    const mostrarAsunto = (id) => {
    //console.log(id)
    }

    const columns = [
        {
            name: 'Resolución',
            selector: row => row.titulo,
            sortable: true,
        },
        {
            name: 'Asunto',
            cell: (row) => (
                <div className='flex'>
                    <Link onClick={() => mostrarAsunto(row.id)} className="text-center text-slate-400 hover:text-blue-900 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faArchive} />
                    </Link>
                </div>
            ),

        },
        {
            name: 'Tipo Resolución',
            selector: row => row.tipoResolucion,

        },
        {
            name: 'Tipo Sesión',
            selector: row => row.tipoSesion,

        },
        {
            name: 'Usuarios',
            cell: (row) => (
                <div className='flex'>
                    <Link onClick={() => mostrarMiembro(row.id)} className="text-center text-slate-400 hover:text-blue-900 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faUsers} />
                    </Link>
                </div>
            ),

        },
        {
            name: 'Archivo',
            cell: (row) => (
                <div className='flex'>
                    {/*<a className="text-center text-red-400 hover:text-red-600 focus:outline-none"
                        target="_blank"
                        href={`/documentos/resoluciones/${row.archivo}`}>
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faFilePdf} />
                    </a>*/}
                    
                    <a className="text-center text-red-400 hover:text-red-600 focus:outline-none"
                        target="_blank"
                        href={route('r.resoluciones.ver',row.id)}>
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faFilePdf} />
                    </a>
                </div>
            ),

        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true,
        },
        {
            name: 'Acción',
            cell: (row) => (
                <div className='flex gap-2'>
                    {/*<Link href="#" className="text-center text-green-500 hover:text-green-600 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faPen} />
                    </Link>*/}
                    <a href={route('r.resoluciones.descargar', row.id)}
                        target="_self"
                        className="text-center text-slate-400 hover:text-blue-900 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faDownload} />
                    </a>

                </div>
            ),
        },
    ];

    var data = []

    datos.map((elemento) =>
        data.push({
            id: elemento.id_resolucion,
            titulo: elemento.nombreResolucion,
            asunto: elemento.asuntoResolucion,
            tipoResolucion: elemento.nombreTipoResolucion,
            tipoSesion: elemento.nombreSesion,
            fecha: elemento.fechaResolucion.slice(0, 10),
            archivo: elemento.archivoResolucion,
            id_resolucion: elemento.id_tipoResolucion,
            id_sesion: elemento.id_tipoSesion,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [filterSesion, setFilterSesion] = useState('');
    const [filterResolucion, setFilterResolucion] = useState('');

    const [filterDateStart, setFilterDateStart] = useState('');
    const [filterDateEnd, setFilterDateEnd] = useState('');

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => (item.titulo.toLowerCase().includes(filterText.toLowerCase())
            || item.fecha.toLowerCase().includes(filterText.toLowerCase())
            || item.tipoResolucion.toLowerCase().includes(filterText.toLowerCase())
            || item.tipoSesion.toLowerCase().includes(filterText.toLowerCase()))
            && item.id_resolucion.toString().includes(filterResolucion.toString())
            && item.id_sesion.toString().includes(filterSesion.toString())
            && (filterDateStart == '' ? true : item.fecha >= filterDateStart)
            && (filterDateEnd == '' ? true : item.fecha <= filterDateEnd)

    );

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const subHeaderDataTable = useMemo(() => {
        return (
            <div className='w-full flex flex-col'>
                <div className='flex flex-row mb-5 justify-between'>
                    <h1 className='font-black text-xl my-auto'>Búsqueda de Resoluciones</h1>
                    <div className='flex'>
                        <input
                            type="text"
                            id='search'
                            onChange={(e) => setFilterText(e.target.value)}
                            placeholder='Search'
                            value={filterText}
                        />
                        <Link className='h-8 w-10 my-auto rounded-md ml-5' onClick={handleClear}>
                            <div className='flex h-full bg-green-700 rounded-md text-white m-auto justify-center'>
                                <FontAwesomeIcon className="h-4 mt-2" icon={faRefresh} />
                            </div>
                        </Link>
                    </div>

                </div>
              
                    <div className='flex flex-row justify-between'>

                        <div className='flex '>
                            <label className='flex my-auto text-xs mr-5'>Tipo Resolución</label>
                            <select
                                id='select-tipo-resolucion'
                                //className='w-[calc(25%-110px)]'
                                defaultValue={'0'}
                                onChange={(e) => setFilterResolucion(e.target.value)}>
                                <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                {
                                    resolucion.map(res => {
                                        return (
                                            <option key={res.id_tipoResolucion} value={res.id_tipoResolucion}>{res.nombreTipoResolucion}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className='flex my-auto text-xs ml-16 mr-5'>Tipo Sesión</label>
                            <select
                                id='select-tipo-sesion'
                                //className='w-[calc(25%+50px)]'
                                defaultValue={'0'}
                                onChange={(e) => setFilterSesion(e.target.value)}>
                                <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                {
                                    sesion.map(ses => {
                                        return (
                                            <option key={ses.id_tipoSesion} value={ses.id_tipoSesion}>{ses.nombreSesion}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex'>
                            <label className='flex my-auto text-xs ml-16 mr-5'>Fecha</label>
                            <input
                                type="date"
                                onChange={(e) => setFilterDateStart(e.target.value)}
                            //value={filterDateStart}
                            />
                            <label className='flex my-auto text-xs mx-2'>-</label>
                            <input
                                type="date"
                                onChange={(e) => setFilterDateEnd(e.target.value)}
                            //value={filterDateEnd}
                            />
                        </div>

                    </div>

                
            </div>
        );

    }, [filterText]);

    return (
        <DataTable
            //title="prueba" 
            columns={columns}
            data={filteredItems}
            customStyles={customStyles}
            sortIcon={<IconoSortColumn />}
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            paginationComponentOptions={paginationComponentOptions}
            subHeader
            subHeaderComponent={subHeaderDataTable}
            noDataComponent={<NoRegistros />}
        />
    );
}