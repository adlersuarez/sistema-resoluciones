import React from 'react'

export default function SpanEstadoDocumento({texto}) {
    
    var color='bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md';

    return (
        <span className={color}>
            {texto}
        </span>
    );
}