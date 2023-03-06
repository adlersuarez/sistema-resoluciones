import React from "react";
import TemplateAE from "./Documentos/TemplateAE";
import TemplateFac from "./Documentos/TemplateFac";
import TemplateOEF from "./Documentos/TemplateOEF";
import TemplatePais from "./Documentos/TemplatePais";

export default function TemplateDiv({est_adeudo,open,documentos,detTipPer}){
    
    const displayTemplate = (template) => {
        switch (template) {
            case 1:
                return <TemplateAE documentos={documentos} detTipPer={detTipPer}/>
            case 2:
                return <TemplateOEF detTipPer={detTipPer}/>
            case 3:
                return <TemplatePais detTipPer={detTipPer}/>
            case 4:
                return <TemplateFac detTipPer={detTipPer}/>
            default:
        }
    }
    return(
        <div className={`${open?"hidden":""}`}>
            {displayTemplate(est_adeudo.id)}
        </div>
    )
}