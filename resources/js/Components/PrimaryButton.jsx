import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center justify-center mt-2 py-2 w-full bg-[#007CBC] border border-transparent rounded-md font-bold text-xs text-white tracking-widest active:bg-[#0064bc] hover:bg-[#0064bc] transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
