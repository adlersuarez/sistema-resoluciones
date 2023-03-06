import React, { useState } from "react";
import Stepper from '@/Components/Steps/Stepper';
import StepperControl from '@/Components/Steps/StepperControl';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import TemplateSolicitud from "@/Components/Steps/StepsTemplate/TemplateSolicitud";
import TemplateValAdeudo from "@/Components/Steps/StepsTemplate/TemplateValAdeudo";
import TemplateFinal from "@/Components/Steps/StepsTemplate/TemplateFinal";
import { StepperContext } from "@/contexts/StepperContexts";
import TemplateRevPagos from "@/Components/Steps/StepsTemplate/TemplateRevPagos";
import BotonVolver from "@/Components/Botones/BotonVolver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark     } from '@fortawesome/free-solid-svg-icons';
import NavbarUser from '@/Layouts/NavbarUser';

export default function VistaSolicitud({ solicitudes, auth, documentos, detalle_solicitud,noAdeudo }) {
    
    const [currentStep, SetCurrentStep] = useState(1);
    const [userData, setUserData] = useState('');
    const [finalData, setFinalData] = useState([]);
    const sol = {
        "no_adeudo" : {
            pasos : [
                "Solicitud",
                "Revisión pagos",
                "Validación de No Adeudo",
                "Constancia",
            ],
        },
        "constancia_de_estudio":{
            pasos:[
                "SOLICITUD",
                "FUT",
                "REVISION",
                "FINALIZADO",
            ],
        }
    }

    const steps = sol.no_adeudo.pasos;
    
    var lista_documentos = [
        {   //0
            id: 0,
            doc: 'a_partidaNacimiento',
            descripcion: 'Partida o acta de nacimiento en original',
            file: null,
        },
        {   //1
            id: 1,
            doc: 'a_copiaDNI',
            descripcion: 'Copia del DNI',
            file: null,
        },
        {   //2
            id: 2,
            doc: 'a_certificadoEstudioSecReg',
            descripcion: 'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular',
            file: null,
        },
        {   //3
            id: 3,
            doc: 'a_certificadoEstudioSecRegAlt',
            descripcion: 'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular o del 1ro al 4to año para educación básica alternativa',
            file: null,
        },
        {   //4
            id: 4,
            doc: 'a_certificadoEstudioUni',
            descripcion: 'Certificado de estudios universitarios original',
            file: null,
        },
        {   //5
            id: 5,
            doc: 'a_copiaLegalTituloBach',
            descripcion: 'Copia legalizada de titulo o grado académico de Bachiller',
            file: null,
        },
        {   //6
            id: 6,
            doc: 'a_certificadoEstudioExterno',
            descripcion: 'Certificado de estudios superiores originales de la universidad, que acredite haber aprobado 4 periodos lectivos semestrales, 2 anuales o 72 créditos',
            file: null,
        },
        {   //7
            id: 7,
            doc: 'a_constanciaConductaExterno',
            descripcion: 'Constancia de conducta que acredite no haber sido separado por medidas disciplinarias de la universidad de procedencia',
            file: null,
        },
        {   //8
            id: 8,
            doc: 'a_certificadoEstudioInterno',
            descripcion: 'Certificado de Estudios originales',
            file: null,
        },
        {   //9
            id: 9,
            doc: 'a_constanciaConductaInterno',
            descripcion: 'Constancia de conducta',
            file: null,
        },
        {   //10
            id: 10,
            doc: 'a_constanciaPrimerosPuestos',
            descripcion: 'Constancia de haber obtenido uno de los 5 primeros puestos en educación secundaria refrendada por el director departamental de educación',
            file: null,
        },
        {   //11
            id: 11,
            doc: 'a_curriculoDeportivo',
            descripcion: 'Currículo Deportivo documentado y legalizado',
            file: null,
        },
        {   //12
            id: 12,
            doc: 'a_constanciaDeportistaDestacado',
            descripcion: 'Constancia original que lo acredite como deportista destacado expedida por el IPD con antigüedad no mayor de 2 años',
            file: null,
        },
        {   //13
            id: 13,
            doc: 'a_informeOriginalFPD',
            descripcion: 'Informe original de FPD, del deporte que representa',
            file: null,
        },
        {   //14
            id: 14,
            doc: 'a_carnetRegistroCONADIS',
            descripcion: 'Carnet de registro del Consejo Nacionalde Integración de la persona con discapacidad (CONADIS)',
            file: null,
        },
        {   //15
            id: 15,
            doc: 'a_certificadoEstudioInst',
            descripcion: 'Certificado de estudios originales de su Instituto Pedagógico o Tecnológico',
            file: null,
        },
        {   //16
            id: 16,
            doc: 'a_copiaLegalTituloEgreInst',
            descripcion: 'Copia legalizada del título o constancia original de egresado emitida por la Dirección del Instituto Superior de Procedencia',
            file: null,
        },
        {   //17
            id: 17,
            doc: 'a_curriculoVitaeDescriptivo',
            descripcion: 'Currículo Vitae descriptivo',
            file: null,
        },
        {   //18
            id: 18,
            doc: 'a_certificadoEstudioEscuelaOficiales',
            descripcion: 'Certificado de Estudios superiores de las escuelas de oficiales de las FF.AA. o FF.PP.',
            file: null,
        },
        {   //19
            id: 19,
            doc: 'a_certificadoAcreditacionGradoOficial',
            descripcion: 'Certificado original de la Comandancia General que acredite el Grado de oficial  y de pertenecer a las FF.AA. o FF.PP.',
            file: null,
        },
        {   //20
            id: 20,
            doc: 'a_certificadoEstudioEscuelaSuboficiales',
            descripcion: 'Certificado de Estudios superiores emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.',
            file: null,
        },
        {   //21
            id: 21,
            doc: 'a_constanciaLegalizadaTituloEgreEscSub',
            descripcion: 'Constancia legalizada del titulo o constancia original de egresado emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.',
            file: null,
        },

    ]

    var doc = {}

    switch (solicitudes.id_modalidadIngreso) {
        case 1:
            doc = {
                nombre: 'Postulante Ordinario o Regular',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[3],
                ],
            }
            break;

        case 2:
            doc = {
                nombre: 'Titulados o Graduados (2da. Carrera)',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[4],
                    lista_documentos[5],
                ],
            }
            break;

        case 3:
            doc = {
                nombre: 'Traslado Externo de una Universidad Nacional o Extranjera',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[6],
                    lista_documentos[7],
                ],
            }
            break;

        case 4:
            doc = {
                nombre: 'Traslado Interno',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[8],
                    lista_documentos[9],
                ],
            }
            break;

        case 5:
            doc = {
                nombre: 'Primeros Puestos de Nivel Secundario',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[2],
                    lista_documentos[10],
                ],
            }
            break;

        case 6:
            doc = {
                nombre: 'Deportistas Destacados',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[3],
                    lista_documentos[11],
                    lista_documentos[12],
                    lista_documentos[13],
                ],
            }
            break;

        case 7:
            doc = {
                nombre: 'Personas con Discapacidad',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[3],
                    lista_documentos[14],
                ],
            }
            break;

        case 8:
            doc = {
                nombre: 'Titulados o Egresados de Institutos Pedagógicos o Tecnológicos',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[15],
                    lista_documentos[16],
                ],
            }
            break;

        case 9:
            doc = {
                nombre: 'Mayores de 30 años',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[3],
                    lista_documentos[17],
                ],
            }
            break;

        case 10:
            doc = {
                nombre: 'Primera Selección',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[3],
                ],
            }
            break;

        case 11:
            doc = {
                nombre: 'Oficiales de las FF.AA. y FF.PP.',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[18],
                    lista_documentos[19],
                ],
            }
            break;

        case 12:
            doc = {
                nombre: 'Sub Oficiales de las FF.AA. y FF.PP.',
                lista: [
                    lista_documentos[0],
                    lista_documentos[1],
                    lista_documentos[20],
                    lista_documentos[21],
                ],
            }
            break;

        default:
            break;
    }

    var tam_list = doc.lista.length
    var documentos_necesarios =[]
    var documentos_obtenidos =[]
    var adeuda_doc = true

    for(var i=0;i<tam_list;i++){
        documentos_necesarios.push(doc.lista[i].doc)
    }

    var claves = Object.keys(documentos)
    for(let k=0;k<claves.length;k++){
        for (let j = 0; j < documentos_necesarios.length; j++) {

            if(claves[k]==documentos_necesarios[j]){
                //documentos_obtenidos.push({archivo:documentos[claves[k]]})
                documentos_obtenidos.push(documentos[claves[k]])
                /*
                if(documentos[claves[k]]==null){
                    adeuda_doc= true
                    console.log(documentos[claves[k]])
                }
                */
            }
        }
    }

    for (let index = 0; index < doc.lista.length; index++) {
        doc.lista[index].file = documentos_obtenidos[index];
    }

    if(noAdeudo != null) {if(noAdeudo.b_estadoPAI==1&&noAdeudo.b_estadoOEF==1&&noAdeudo.b_estadoFac==1&&noAdeudo.b_estadoAE==1){
        adeuda_doc=false
    }}

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <TemplateSolicitud id={solicitudes.id_solicitud} solicitudes={solicitudes} estado={estado_model}/>
            case 2:
                return <TemplateRevPagos solicitudes={solicitudes} estado={estado_model}/>
            case 3:
                return <TemplateValAdeudo noAdeudo={noAdeudo} estado={estado_model}/>
            case 4:
                return <TemplateFinal solicitudes={solicitudes} detalle_solicitud={detalle_solicitud} estado={estado_model}/>
            default:
        }
    }

    const { data } = useForm({
        nombres: solicitudes.c_nombres,
        apellidoM: solicitudes.c_apellidoM,
        apellidoP: solicitudes.c_apellidoM,
        codigo_estudiante: solicitudes.c_codMatricula,
        tipo_solicitud: solicitudes.c_nomSolicitud,
        facultad: solicitudes.c_nomFacultad,
        carrera: solicitudes.c_nomCarreraProf,
        fecha_solicitud: solicitudes.d_fechaSolicitud,
        sede: solicitudes.c_nomSede,
        tipo_estudiante: solicitudes.c_nomTipoEstud,
        correo_institucional: solicitudes.c_email,
        direccion_sede: solicitudes.c_dirección,
        monto_solicitud: solicitudes.f_montoPagoTipo,
        fut_solicitud: solicitudes.c_archivoFut,
        estado_solicitud: solicitudes.id_estadoSolicitud,
    });

    var nombre_completo = solicitudes.c_nombres + " " + solicitudes.c_apellidoM + " " + solicitudes.c_apellidoP;
    var sede = data.sede.toUpperCase() + " - " + data.direccion_sede;
    var carrera_profesional = data.carrera + " en la " + data.facultad;
    var monto = "S/. " + data.monto_solicitud;
    const handleClick = (direction) => {
        let newStep = currentStep;

        direction == "next" ? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && SetCurrentStep(newStep);
    }

    var paso_1 = false
    var paso_2 = false
    var paso_3 = false
    var paso_4 = false

    if(solicitudes.c_codigoFut != null){ paso_1=true }
    if(solicitudes.c_codigoBoucher != null && solicitudes.id_estadoSolicitud != 1){ paso_2=true }
    if(noAdeudo != null){ if(noAdeudo.b_estadoPAI && noAdeudo.b_estadoOEF && noAdeudo.b_estadoFac && noAdeudo.b_estadoAE){ paso_3=true }}
    if(detalle_solicitud != null){ if(detalle_solicitud.b_estadoDetalleNA) { paso_4=true }}
    
    var estado_model = [ paso_1, paso_2, paso_3, paso_4,]

    return (
        <NavbarUser auth={auth}>
            <Head title='User' />{/*bg-slate-300*/}
            <div className="bg-slate-100 flex items-center justify-between py-2 mt-10">
                <BotonVolver ruta={'verSolicitud'}/>
            </div>
            {
                solicitudes.id_estadoSolicitud!=3?
                <div className="md:w-full mx-auto shadow-xl rounded-2xl pb-2 bg-white ">
                    <div className="w-full horizontal mt-5">
                        <Stepper steps={steps} currentStep={currentStep} estadoModel={estado_model}></Stepper>
                        <div className="mt-10 p-1">
                            <StepperContext.Provider value={{
                                userData,
                                setUserData,
                                finalData,
                                setFinalData
                            }}>
                                {displayStep(currentStep)}
                            </StepperContext.Provider>
                        </div>
                    </div>
                    <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps}
                    estadoModel={estado_model}
                    />
                </div>
                :
                <div className="md:w-full mx-auto shadow-xl rounded-2xl pb-2 
                bg-white border-4 border-red-500 border-dashed">
                    <div className="text-center  text-4xl uppercase font-mono">
                        <div className="py-3">
                            <strong className="text-red-700">SOLICITUD RECHAZADA</strong>
                        </div>
                        <div className="py-5">
                            <span className="bg-[#f5dbe7] text-[#fa5c82] font-bold rounded-md w-32 text-center">
                                {solicitudes.c_comentarioSolicitud}
                            </span>
                        </div>
                        <div className="py-3">
                            <FontAwesomeIcon className="text-red-600" icon={faCircleXmark} size="2x"/>
                        </div>
                    </div>
                </div>
            }
            <div className='py-5 w-full'> </div>
        </NavbarUser>
    )
}
