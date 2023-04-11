import React from 'react';
import { Head } from '@inertiajs/inertia-react';

const VerDocumento = ({ resolucion }) => {

    var ruta = `/documentos/resoluciones/${resolucion.archivoResolucion}`

    return (

        <div>
            <Head title={resolucion.nombreResolucion} />
            <embed src={ruta} style={{ width: '100%', height: '100vh' }} />
        </div>
    )
}

export default VerDocumento