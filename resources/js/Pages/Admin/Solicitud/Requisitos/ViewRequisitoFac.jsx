import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import VisualizarRequisitoFac from '@/Components/VisualizarRequisitosPDF/VisualizarRequisitoFac';

const ViewRequisitoFac = ({auth,solis}) => {

    return (

      <div>
        <Head title='Facultades'/>

          <VisualizarRequisitoFac
            key={solis.id_solicitud}
            solis={solis}
          />
        
      </div> 
  )
}

export default ViewRequisitoFac