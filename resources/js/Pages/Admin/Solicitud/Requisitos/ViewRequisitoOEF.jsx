import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import VisualizarRequisitoOEF from '@/Components/VisualizarRequisitosPDF/VisualizarRequisitoOEF';

const ViewRequisitoOEF = ({auth,solis}) => {

    return (

      <div>
        <Head title='Caja'/>

          <VisualizarRequisitoOEF
            key={solis.id_solicitud}
            solis={solis}
          />
        
      </div> 
  )
}

export default ViewRequisitoOEF