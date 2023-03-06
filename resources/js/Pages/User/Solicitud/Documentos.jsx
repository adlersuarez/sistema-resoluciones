import React from "react";
import { Head } from '@inertiajs/inertia-react';
import BotonVolver from "@/Components/Botones/BotonVolver";
import NavbarUser from '@/Layouts/NavbarUser';
import ListTemplate from "@/Components/Templates/ListaTemplate";

export default function Documentos({ auth, documentos,detTipPer }) {

    var estado_adeudo=[
        {
            id:1,
            dependencia:'ORyM',
            detalle:'Archivo estudiantil',
            valor:false,
        },
        {
            id:2,
            dependencia:'OEyF',
            detalle:'Caja (pensiones de enseñanza y otros)',
            valor:false,
        },
        {
            id:3,
            dependencia:'DURS',
            detalle:'Proyección social y otros',
            valor:false,
        },
        {
            id:4,
            dependencia:'Facultades',
            detalle:'Laboratorios - Biblioteca',
            valor:false,
        },
    ]
    
    return (
        <NavbarUser auth={auth}>
            <Head title="Documentos" />

            <div className="bg-slate-100 flex items-center justify-between py-2 mt-10">
                <BotonVolver ruta={'user'}/>
            </div>
            <div>
                <ul>
                    { 
                        estado_adeudo.map(est_adeudo=>{
                            return(
                                    <ListTemplate key={est_adeudo.id} est_adeudo={est_adeudo} documentos={documentos} detTipPer={detTipPer}/>
                            )
                        })
                    }
                </ul> 
            </div>

            <div className='py-5 w-full'> </div>
        </NavbarUser>
    );
}
