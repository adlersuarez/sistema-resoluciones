import React from 'react'

export default function FooterTablaNotFound() {

    return (
        <tr className='h-10'>
            <td colSpan="100%" className='text-center bg-slate-200'>
                <p className='bold text-sm'>
                    No se encontraron registros
                </p>
            </td>
        </tr>
    );
}