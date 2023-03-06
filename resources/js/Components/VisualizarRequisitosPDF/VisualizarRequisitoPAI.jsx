import React from 'react'


const VisualizarRequisitoPAI = ({solis},tipo) => {

  return (
    <div>
      { <embed src={`/documentos/constancia/requisitos/${solis.c_archivoPAI}`} 
        style={{width:'100%', height:'100vh'}} ></embed>
      }
    </div>  
  ) 
}
  
export default VisualizarRequisitoPAI