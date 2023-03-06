import React from 'react';
import { Head, useForm} from '@inertiajs/inertia-react';
import { _adapters } from 'chart.js';
import Swal from 'sweetalert2';
import BotonVolver from '@/Components/Botones/BotonVolver';
import NavbarUser from '@/Layouts/NavbarUser';

const Solicitud = ({ auth, finalidad_soli, tipo_soli}) => {

    const {data, setData, errors, post, progress} = useForm({
        id:auth.user.id,
        d_fechaSolicitud:null,
        id_tipoSolicitud: null,
        id_estadoSolicitud:"1",
        id_finalidadSolicitud:null,
        c_codSolicitud:null,
    });
    
    var ahora = new Date();
    var mes = ahora.getMonth()+1;
    var dia = ahora.getDate();
    if(mes<10){
        mes="0"+mes;
    }
    if(dia<10){
        dia="0"+dia;
    }
    var fecha = ahora.getFullYear()+"-"+mes+"-"+dia+" "+ahora.toLocaleTimeString();
    var fecha2 = ahora.getFullYear()+mes+dia;

    function handleSubmit(e){
        e.preventDefault();
        e.target.reset()
        data.c_codSolicitud ="S"+tipo_soli[Number(data.id_tipoSolicitud)-1].c_acroTipoSolicitud+finalidad_soli[Number(data.id_finalidadSolicitud)-1].c_acroFinalSolicitud+"-"+fecha2;
        let ahora = new Date();
        data.d_fechaSolicitud = fecha;
        post(route('guardarsolicitud'))
        Swal.fire({
            //position: 'top-middle',
            icon: 'success',
            title: 'Solicitud Creada',
            text: 'Para continuar con su solicitud, debe subir el Boucher y código de pago por tramite, en la sección de solicitudes',
            showConfirmButton: true,
          })
        }

    return (
        <NavbarUser auth={auth}>
            <Head title="Solicitud" />
            <div className='flex w-auto justify-center pt-5'>
                <div className='w-3/4'>
                    <div className="bg-slate-100 flex items-center justify-between px-4 py-2">
                        <BotonVolver ruta={'user'}/>
                    </div>

                    <div className='text-center p-4 ml-4 my-4 bg-gradient-to-r from-slate-200 to-slate-300'>
                        <h2 className='text-[#0064bc] font-bold text-2xl'>
                            <strong>TRÁMITE DOCUMENTARIO</strong>
                        </h2>
                    </div>
                    
                    <form action="createForm" onSubmit={handleSubmit}>

                    <div className="my-8 ml-4">
                        <label className="mb-4">
                            <strong>
                                TIPO DE SOLICITUD
                            </strong>
                        </label>
                        <select
                        id ='id_tipoSolicitud'
                        name='id_tipoSolicitud'
                        className='block w-full bg-white border h-10'
                        label="id_tipoSolicitud"
                        //forInput="id_tipoSolicitud"
                        defaultValue={'DEFAULT'}
                        onChange={(e) =>
                        setData('id_tipoSolicitud', e.target.value)
                        }
                        required
                        >
                        <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccione el tipo de Solicitud</option>
                        {
                            tipo_soli.map( tipo_solis => {
                                return (
                                    <option key={tipo_solis.id_tipoSolicitud} value={tipo_solis.id_tipoSolicitud}>{tipo_solis.c_nomSolicitud}</option>
                                )
                            })
                        }
                        </select>
                        <span className="text-red-600">
                            {errors.id_tipoSolicitud}
                        </span>
                    </div>

                    {
                    data.id_tipoSolicitud==1&&
                    <div className="my-8 ml-4">
                        <label className="mb-2">
                            <strong>
                                FINALIDAD DE LA SOLICITUD
                            </strong>
                        </label>
                        <select
                        id ='id_finalidadSolicitud'
                        name='id_finalidadSolicitud'
                        className='block w-full bg-white border   h-10  py'
                        label="id_finalidadSolicitud"
                        //forInput="id_finalidadSolicitud"
                        defaultValue={'DEFAULT'}

                        onChange={(e) =>
                            setData('id_finalidadSolicitud', e.target.value)
                        }
                        required
                        >
                        <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccione el tipo de Finalidad</option>
                        {
                            finalidad_soli.map( final_soli => {
                                return (
                                    <option key={final_soli.id_finalidadSolicitud} value={final_soli.id_finalidadSolicitud}>{final_soli.c_nomFinalidadSolicitud}</option>
                                )
                            })
                        }
                        </select>
                        <span className="text-red-600">
                            {errors.id_finalidadSolicitud}
                        </span>
                    </div>
                    }
                    
                    <div className="mt-4 px-4">
                        <button
                            type="submit"
                            className={`disabled px-6 py-2 font-bold text-white bg-[#007CBC] rounded
                            ${data.id_tipoSolicitud != null && data.id_finalidadSolicitud != null?
                                "hover:bg-[#0064bc]"
                                :
                                "cursor-not-allowed"
                            }
                            `}
                            >
                            Tramitar
                        </button>
                    </div>
                    </form>

                </div>
            </div>    

        </NavbarUser>
    )
}

export default Solicitud
