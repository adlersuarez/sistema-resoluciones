import React from 'react'


const VisualizarRequisitoOEF = ({solis},tipo) => {

  return (
    <div>
      { <embed src={`/documentos/constancia/requisitos/${solis.c_archivoOEF}`} 
        style={{width:'100%', height:'100vh'}} ></embed>
      }
    </div>  
  ) 
}
  
export default VisualizarRequisitoOEF