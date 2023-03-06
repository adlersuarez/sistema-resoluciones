
import React from 'react'


const DocumentPDF = ({solis}) => {

  // cambiar para documentos/constancia/no-adeudo
  return (
     <div>
      {
        solis.map(solic => {
            return(
              <embed src={`/documentos/fut/${solic.c_archivoFut}`} 
              style={{width:'100%', height:'100vh'}} ></embed>
            )
        })
      }

    </div>  
  ) 
}
  
export default DocumentPDF