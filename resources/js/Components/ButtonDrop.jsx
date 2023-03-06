import React from 'react';

export default function ButtonDrop({ href, active, children }) {
    return (
        <button
            href={href}
            className={
                active
                    ? 'lg:flex-row min-[200px]:flex-col flex items-center justify-center p-2 text-base font-normal text-[#007CBC] bg-blue-50 rounded-lg '
                    : 'lg:flex-row min-[200px]:flex-col flex items-center justify-center p-2 text-base font-normal text-white rounded-lg  hover:text-[#007CBC] hover:bg-blue-50 transition'
            }
        >
            {children}
        </button>
    );
}
