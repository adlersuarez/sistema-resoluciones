import React, { useState } from 'react';

function FilterComponent({ handleYearChange, handleMonthChange, handleExactDateChange }) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('');
    const [exactDate, setExactDate] = useState('');

    //Función para generar años
    function generateYearsArray(startYear) {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    }
    // Ejemplo de uso:
    const startYear = 2020; // Cambia este valor al año deseado
    const years = generateYearsArray(startYear);

    const months = [
        { value: '01', label: 'Enero' },
        { value: '02', label: 'Febrero' },
        { value: '03', label: 'Marzo' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Mayo' },
        { value: '06', label: 'Junio' },
        { value: '07', label: 'Julio' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Setiembre' },
        { value: '10', label: 'Octubre' },
        { value: '11', label: 'Noviembre' },
        { value: '12', label: 'Diciembre' },
    ];

    //console.log(exactDate)

    const handleYearSelect = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        handleYearChange(year);
    };

    const handleMonthSelect = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
        handleMonthChange(month);
    };

    const handleExactDateInput = (e) => {
        const date = e.target.value;
        setExactDate(date);
        handleExactDateChange(date);
    };

    return (
        <div className="flex justify-between items-center px-10">
            <div className='flex gap-4'>
                <label htmlFor="yearSelect" className='m-auto'>Filtrar por Año:</label>
                <select
                    id="yearSelect"
                    value={selectedYear}
                    onChange={handleYearSelect}
                >
                    <option value="">Todos los años</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex gap-4'>
                <label htmlFor="monthSelect" className='m-auto'>Filtrar por Mes:</label>
                <select
                    id="monthSelect"
                    value={selectedMonth}
                    onChange={handleMonthSelect}
                >
                    <option value="">Todos los meses</option>
                    {months.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex gap-4'>
                <label htmlFor="exactDateInput" className='m-auto'>Filtrar por Fecha Exacta:</label>
                <input
                    type="date"
                    id="exactDateInput"
                    value={exactDate}
                    onChange={handleExactDateInput}
                //placeholder="Formato: AAAA-MM-DD"
                />
            </div>


        </div>
    );
}

export default FilterComponent;