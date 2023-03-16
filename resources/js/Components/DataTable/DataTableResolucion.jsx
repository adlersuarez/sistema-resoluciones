import { faDownload, faFilePdf, faPen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';

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

export default function DataTableResolucion({ datos,miembros }) {

    console.log(miembros)

    const columns = [
        {
            name: 'Resolución',
            selector: row => row.titulo,
            sortable: true,
        },
        {
            name: 'Asunto',
            selector: row => row.asunto,

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
                    <Link href="#" className="text-center text-slate-400 hover:text-blue-900 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faUsers} />
                    </Link>
                </div>
            ),

        },
        {
            name: 'Archivo',
            cell: (row) => (
                <div className='flex'>
                    <a className="text-center text-red-400 hover:text-red-600 focus:outline-none"
                        target="_blank"
                        href={`/documentos/resoluciones/${row.archivo}`}>
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
                    <Link href="#" className="text-center text-green-500 hover:text-green-600 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faPen} />
                    </Link>
                    <a href={route('r.resoluciones.descargar', row.id)}
                        target="_self"
                        className="text-center text-slate-400 hover:text-blue-900 focus:outline-none">
                        <FontAwesomeIcon className="h-6 w-6" id={row.id} icon={faDownload} />
                    </a>

                </div>
            ),
        },
    ];

    /*const data = [
        {
            id: 1,
            titulo: '01-2022-AU',
            asunto: '-',
            tipoResolucion: 'Asamblea Universitaria',
            tipoSesion: 'Extraordinaria',
            fecha: '2023-03-07',
        },
        {
            id: 2,
            titulo: '02-2022-AU',
            asunto: '-',
            tipoResolucion: 'Consejo Universitario',
            tipoSesion: 'Ordinaria',
            fecha: '2023-03-06',
        },
    ] */

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
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.titulo.toLowerCase().includes(filterText.toLowerCase())
            || item.fecha.toLowerCase().includes(filterText.toLowerCase())
            || item.tipoResolucion.toLowerCase().includes(filterText.toLowerCase())
            || item.tipoSesion.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const subHeaderDataTable = useMemo(() => {
        return (
            <div>
                <input
                    className=''
                    type="text"
                    id='search'
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder='Search'
                    value={filterText}
                />
                <button onClick={handleClear}>
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