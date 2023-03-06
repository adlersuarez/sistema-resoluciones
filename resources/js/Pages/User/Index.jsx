import React from 'react'
import { Head } from '@inertiajs/inertia-react';
import { faFilePen, faFolderTree, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import UserTarjetaLink from '@/Components/UserTarjetas/UserTarjetaLink';
import NavbarUser from '@/Layouts/NavbarUser';

const User = ({ auth }) => {
    
    var lista = [
        {
            id: 1,
            tramite: "TRAMITAR SOLICITUD",
            icono: faFilePen,
            direccion: "cargarsolicitud",
        },
        {
            id: 2,
            tramite: "GESTOR DE SOLICITUDES",
            icono: faFolderOpen,
            direccion: "verSolicitud",
        },
        {
            id: 3,
            tramite: "DOCUMENTOS",
            icono: faFolderTree,
            direccion: "mostrarDocumentos",
        },
    ]

    return (

        <NavbarUser auth={auth}>

            <Head title="Usuario" />

            <div className='w-full text-center py-6 text-[#0077B3] font-mono text-6xl'>
                <strong>TRÁMITE DOCUMENTARIO</strong>
            </div>
            <div className="flex-wrap gap-5 w-full flex justify-center item-center " >
                {
                    lista.map(list => {
                        return (
                            <UserTarjetaLink
                                ruta={list.direccion}
                                tramite={list.tramite}
                                icono={list.icono}
                                key={list.id}
                            />

                        )
                    })
                }
            </div>

        </NavbarUser>
    );
}

export default User

