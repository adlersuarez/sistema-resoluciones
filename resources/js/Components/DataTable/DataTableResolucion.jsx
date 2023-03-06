import React from 'react'
import DataTable from 'react-data-table-component';

export default function DataTableResolucion({}) {
    
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Year',
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'action',
            button: true,
            cell: (row) => (
            <button className="bg-blue-500" > Edit </button>
            ),
        },
    ];

    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
            action: '<p>aea</p>'
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    //console.log(color,valor)
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <DataTable
            title="prueba" 
            columns={columns}
            data={data}
            pagination
            paginationComponentOptions={paginationComponentOptions}
        />
    );
}