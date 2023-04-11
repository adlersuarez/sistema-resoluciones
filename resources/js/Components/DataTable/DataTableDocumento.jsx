import { faDownload, faFilePdf, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@inertiajs/inertia-react';
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
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

export default function DataTableDocumento({ datos, tipo }) {

    useEffect(() => {
        var element = document.getElementsByClassName("sc-lnskGP");
        if (element[0]) {
            if (element[0].firstElementChild != element[0].lastElementChild) {
                element[0].removeChild(element[0].lastElementChild);
            }
        }
    });
    ///////////////////////////////////////////////////////////

    const columns = [
        {
            name: 'Documento',
            selector: row => row.tipo,
            sortable: true,
        },

        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true,
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
                    //</div>href={route('r.resoluciones.ver',row.id)}
                    >
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
                    <a //href={route('r.resoluciones.descargar', row.id)}
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
            id: elemento.id_documento,
            tipo: elemento.nombreDocumento,
            codigo: elemento.num_documento + '-' + elemento.subNum_documento,
            fecha: elemento.fecha_documento.slice(0, 10),
            //archivo: elemento.archivoResolucion,
            id_tipo: elemento.id_tipoDocumento,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [filterTipo, setFilterTipo] = useState('');

    const [filterDateStart, setFilterDateStart] = useState('');
    const [filterDateEnd, setFilterDateEnd] = useState('');

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => (item.tipo.toLowerCase().includes(filterText.toLowerCase())
            || item.fecha.toLowerCase().includes(filterText.toLowerCase())
            || item.codigo.toLowerCase().includes(filterText.toLowerCase()))
            && item.id_tipo.toString().includes(filterTipo.toString())
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
                    <h1 className='font-black text-xl my-auto'>Búsqueda de Documentos</h1>
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
                        <label className='flex my-auto text-xs mr-5'>Tipo Documento</label>
                        <select
                            id='select-tipo-documento'
                            //className='w-[calc(25%-110px)]'
                            defaultValue={'0'}
                            onChange={(e) => setFilterTipo(e.target.value)}>
                            <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                            {
                                tipo.map(tip => {
                                    return (
                                        <option key={tip.id_tipoDocumento} value={tip.id_tipoDocumento}>{tip.nombreDocumento}</option>
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