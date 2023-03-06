import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import VisualizarRequisitoAE from '@/Components/VisualizarRequisitosPDF/VisualizarRequisitoAE';

const ViewRequisitoAE = ({auth,solis}) => {

    return (

      <div>
        <Head title='Archivo Estudiantil'/>
        
          <VisualizarRequisitoAE
            key={solis.id_solicitud}
            solis={solis}
          />
      
      </div> 
  )
}

export default ViewRequisitoAE