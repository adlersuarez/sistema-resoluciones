import React from 'react';

export default function InputLabel({ forInput, value, className, children }) {
    return (
        <>
        <label htmlFor={forInput} className={`text-[#007CBC]  ` + className}>
            <strong>{value ? value : children}</strong>
        </label>
        </>
    );
}
