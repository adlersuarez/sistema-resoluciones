import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import VisualizarRequisitoPAI from '@/Components/VisualizarRequisitosPDF/VisualizarRequisitoPAI';

const ViewRequisitoPAI = ({auth,solis}) => {

    return (

      <div>
        <Head title='Proyección Social'/>

          <VisualizarRequisitoPAI
            key={solis.id_solicitud}
            solis={solis}
          />
        
      </div> 
  )
}

export default ViewRequisitoPAI