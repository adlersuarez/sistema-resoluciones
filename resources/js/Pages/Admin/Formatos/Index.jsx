import React, { useState } from 'react';
import Navbar from '@/Layouts/Navbar';
import { Head, useForm } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faFileClipboard, faFilePen, faFolderOpen, faFolderTree, faX } from '@fortawesome/free-solid-svg-icons';
import TarjetaLink from '@/Components/Tarjetas/TarjetaLink';
import NoFormatos from '@/Components/DataTable/ComponentesDataTable/NoFormatos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Index({ auth, formatos }) {

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = formatos.filter(
        item => item.nombreFormato.toLowerCase().includes(filterText.toLowerCase())
    );

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    var lista = []

    filteredItems.map((elemento) =>
        lista.push({
            id: elemento.id_formato,
            formato: elemento.nombreFormato,
            icono: faFilePen,
            direccion: 'r.formatos.registrar.' + elemento.linkFormato,
        })
    )

    return (
        <Navbar auth={auth}>
            <Head title='Formatos' />
            <div className='w-full flex mt-10 mb-5'>

                <TitlePages texto={'Formatos'} icono={faFileClipboard} />

                <div className='relative ml-20'>
                    <input
                        className='w-60'
                        type="text"
                        id='search'
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder='Buscar'
                        value={filterText}
                    />
                    <button className='font-montserrat text-slate-400 absolute right-3 my-auto top-0 bottom-0 flex' onClick={handleClear}>
                        <FontAwesomeIcon className='m-auto' icon={faX} />
                    </button>
                </div>

            </div>
            <div className='bg-white shadow-sm sm:rounded-lg p-4 overflow-hidden'>
                <div className="flex-wrap gap-10 p-10 w-full flex justify-center item-center" >
                    { lista.length != 0 ?
                        lista.map(list => {
                            return (
                                <TarjetaLink
                                    ruta={list.direccion}
                                    formato={list.formato}
                                    icono={list.icono}
                                    key={list.id}
                                />

                            )
                        })
                        :
                        <NoFormatos />
                    }
                </div>
            </div>

        </Navbar>
    );
}