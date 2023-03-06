import React from 'react'

export default function SpanDocumentosFaltantes({texto}) {
    
    var color = 'bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-56 text-center';

    return (
        <span className={color}>
            {texto}
        </span>
    );
}