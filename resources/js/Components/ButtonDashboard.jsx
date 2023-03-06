import React from 'react';

export default function ButtonDashboard({ type = 'submit', className = '', processing, children, href}) {
    return (
        <button
            href={href}
            type={type}
            className={
                `h-20 items-center justify-center bg-transparent border border-green-500 rounded-md font-bold text-xs text-green-1000 tracking-widest active:bg-green-900 active:text-white hover:bg-green-600 hover:text-white transition ease-in-out duration-120 ${
                    processing && 'opacity-20'
                } ` + className
            }
            disabled={processing}
           
        >
            {children}
        </button>
    );
}