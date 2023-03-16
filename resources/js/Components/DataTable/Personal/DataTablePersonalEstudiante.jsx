import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Inertia } from '@inertiajs/inertia';
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

export default function DataTablePersonalEstudiante({ datos, carrera, nivel, seccion, sede }) {

    const columns = [
        {
            name: 'Código',
            selector: row => row.codigo,
            sortable: true,
            width: '130px',

        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
            width: '300px',

        },
        {
            name: 'Carrera',
            selector: row => row.carrera,
            sortable: true,
            width: '300px',

        },
        {
            name: 'Nivel',
            selector: row => row.nivel,
            sortable: true,

        },
        {
            name: 'Sección',
            selector: row => row.seccion,
            sortable: true,

        },
        {
            name: 'Sede',
            selector: row => row.sede,
            sortable: true,

        },
    ];

    var data = []

    datos.map((elemento) =>
        data.push({
            id: elemento.id_persona,
            codigo: elemento.c_codMatricula,
            nombre: (elemento.c_apellidoP + " " + elemento.c_apellidoM + ", " + elemento.c_nombres).toUpperCase(),
            carrera: elemento.c_nomCarreraProf,
            nivel: elemento.c_nomNivel,
            seccion: elemento.c_nomSeccion,
            sede: elemento.c_nomSede,
            idCarrera: elemento.id_carreraProfesional,
            idSeccion: elemento.id_seccion,
            idNivel: elemento.id_nivel,
            idSede: elemento.id_sede,
        })
    )

    //Filtro de texto
    const [filterText, setFilterText] = useState('');
    const [filterCarrera, setFilterCarrera] = useState('');
    const [filterNivel, setFilterNivel] = useState('');
    const [filterSeccion, setFilterSeccion] = useState('');
    const [filterSede, setFilterSede] = useState('');

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => (item.codigo.toLowerCase().includes(filterText.toLowerCase()) || item.nombre.toLowerCase().includes(filterText.toLowerCase()))
            && item.idCarrera.toString().includes(filterCarrera.toString())
            && item.idSede.toString().includes(filterSede.toString())
            && item.idSeccion.toString().includes(filterSeccion.toString())
            && item.idNivel.toString().includes(filterNivel.toString())
    );

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
        setFilterCarrera('');
        setFilterSede('');
        document.querySelector('#select-carrera').value = '1';
        document.querySelector('#select-sede').value = '1';
    };


    const subHeaderDataTable = useMemo(() => {
        return (
            <div className='w-full flex flex-col'>
                <div className='flex flex-row mb-5 justify-between'>
                    <h1 className='font-black text-xl my-auto'>Búsqueda de Estudiantes</h1>
                    <Link className='h-8 w-10 rounded-md' onClick={handleClear}>
                        <div className='flex h-full bg-green-700 rounded-md text-white m-auto justify-center'>
                            <FontAwesomeIcon className="h-4 mt-2" icon={faRefresh} />
                        </div>
                    </Link>
                </div>

                <div className='flex my-auto'>
                    <label className='flex my-auto w-40 text-xs'>Nombres y Apellidos</label>
                    <input
                        className='w-[calc(100%-160px)]'
                        type="text"
                        id='search'
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder='Buscar por Código o Nombre'
                        value={filterText}
                    />
                </div >
                <div className='flex my-auto mt-4'>
                    <label className='flex my-auto w-[70px] text-xs'>Carrera</label>
                    <select
                        id='select-carrera'
                        className='w-[calc(25%+50px)]'
                        defaultValue={'1'}
                        onChange={(e) => setFilterCarrera(e.target.value)}>
                        <option className='text-gray-400 bold' value='1' disabled>Seleccione</option>
                        {
                            carrera.map(carr => {
                                return (
                                    <option key={carr.id_carreraProfesional} value={carr.id_carreraProfesional}>{carr.c_nomCarreraProf}</option>
                                )
                            })
                        }
                    </select>
                    <label className='flex my-auto w-[70px] text-xs justify-end mr-4'>Nivel</label>
                    <select
                        id='select-nivel'
                        className='w-[calc(25%-110px)]'
                        defaultValue={'1'}
                        onChange={(e) => setFilterNivel(e.target.value)}>
                        <option className='text-gray-400 bold' value='1' disabled>Seleccione</option>
                        {
                            nivel.map(niv => {
                                return (
                                    <option key={niv.id_nivel} value={niv.id_nivel}>{niv.c_nomNivel}</option>
                                )
                            })
                        }
                    </select>
                    <label className='flex my-auto w-[70px] text-xs justify-end mr-4'>Sección</label>
                    <select
                        id='select-nivel'
                        className='w-[calc(25%-110px)]'
                        defaultValue={'1'}
                        onChange={(e) => setFilterSeccion(e.target.value)}>
                        <option className='text-gray-400 bold' value='1' disabled>Seleccione</option>
                        {
                            seccion.map(secc => {
                                return (
                                    <option key={secc.id_seccion} value={secc.id_seccion}>{secc.c_acroSeccion}</option>
                                )
                            })
                        }
                    </select>
                    <label className='flex my-auto w-[70px] text-xs justify-end mr-4'>Sede</label>
                    <select
                        id='select-sede'
                        className='w-[calc(25%-110px)]'
                        defaultValue={'1'}
                        onChange={(e) => setFilterSede(e.target.value)}>
                        <option className='text-gray-400 bold' value='1' disabled>Seleccione</option>
                        {
                            sede.map(sed => {
                                return (
                                    <option key={sed.id_sede} value={sed.id_sede}>{sed.c_nomSede}</option>
                                )
                            })
                        }
                    </select>
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
            pagination
            paginationResetDefaultPage={resetPaginationToggle}
            paginationComponentOptions={paginationComponentOptions}
            subHeader
            subHeaderComponent={subHeaderDataTable}
        />
    );
}