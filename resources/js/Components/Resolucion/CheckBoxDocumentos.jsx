import React, { useState } from 'react'

var listaDocumentosSeleccionados = []
localStorage.setItem("listaDocumentosSeleccionados", listaDocumentosSeleccionados);

export default function CheckBoxDocumentos({ documento,tipo_documento }) {

    const [checked, setChecked] = useState(false);

    function onChange() {

        if (checked) {
            const indiceBorrado = listaDocumentosSeleccionados.findIndex(lista => lista.id === documento.id_documento)
            listaDocumentosSeleccionados.splice(indiceBorrado, 1)
        } else {
            const repetido = listaDocumentosSeleccionados.find(lista => lista.id == documento.id_documento);
            const tipoDoc = tipo_documento.find(doc => doc.id_tipoDocumento == documento.id_tipoDocumento)

            if (!repetido) {
                listaDocumentosSeleccionados.push({
                    'id': documento.id_documento,
                    'tipo': tipoDoc.nombreDocumento,
                    'nombre': documento.num_documento+"-"+documento.subNum_documento,
                })
            }
        }

        localStorage.setItem("listaDocumentosSeleccionados", JSON.stringify(listaDocumentosSeleccionados));

        setChecked(!checked)
    }

    return (
        <div className='col-span-1 my-2 flex text-sm' key={documento.id_documento}>
            <input type="checkbox" className='w-4 h-4 text-blue-500 rounded-full focus:ring-0' checked={checked} onChange={() => onChange()} />
            <label className='ml-4 my-auto'> {documento.num_documento}-{documento.subNum_documento} </label>
        </div>
    )
}