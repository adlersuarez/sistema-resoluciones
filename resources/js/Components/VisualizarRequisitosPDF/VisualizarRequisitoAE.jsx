import React from 'react'


const VisualizarRequisitoAE = ({solis},tipo) => {

  return (
    <div>
      { <embed src={`/documentos/constancia/requisitos/${solis.c_archivoAE}`} 
        style={{width:'100%', height:'100vh'}} ></embed>
      }
    </div>  
  ) 
}
  
export default VisualizarRequisitoAE