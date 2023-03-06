import React from 'react'

export default function TarjetaCantidad({cantidad}) {
    
    return (
        <>
        <strong className='text-2xl'> {cantidad} </strong>
            { cantidad!= 0 &&
                <>
                    {   cantidad == 1 ?
                        <p className='text-2xl'>solicitud</p>
                        :
                        <p className='text-2xl'>solicitudes</p>
                    }
                </>
            } 
        </>
    );
}