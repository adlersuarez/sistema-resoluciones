import React from 'react'


const VisualizarRequisitoFac = ({solis},tipo) => {

  return (
    <div>
      { <embed src={`/documentos/constancia/requisitos/${solis.c_archivoFac}`} 
        style={{width:'100%', height:'100vh'}} ></embed>
      }
    </div>   
  ) 
}
  
export default VisualizarRequisitoFac