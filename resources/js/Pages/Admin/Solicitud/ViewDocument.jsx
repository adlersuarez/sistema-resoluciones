import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import DocumentPDF from '@/Components/Solicitud/DocumentPDF';

const ViewDocument = ({auth,solis}) => {

    return (

      <div>
        <Head title='Visualizar PDF'/>

          <DocumentPDF
            key={solis.id_solicitud}
            solis={solis}
          />
        
      </div> 
  )
}

export default ViewDocument

