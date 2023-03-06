import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import SpanEstadoDeuda from '../Span/SpanEstadoDeuda'
import List_Documentos from './List_Documentos'
import Swal from 'sweetalert2'
import { Inertia } from '@inertiajs/inertia'
import SpanDocumentosFaltantes from '../Span/SpanDocumentosFaltantes'

import { router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircleXmark, faMailBulk, faMailForward, faMessage } from '@fortawesome/free-solid-svg-icons'
//
const TablaDocumentos = ({mod_ingreso,archivos,estado,id_AE}) => {

    var documentos = {}

    const validar_documentos = (e) => {
        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Usted validará que el estudiante no adeuda documentos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => { 
                if (result.isConfirmed) {
              
                    Inertia.post(route('d.archivoEstudiantil.validarAE',`${id_AE}`),{
                        _method: 'put',
                        //comentario: result.value,
                    })

                    Swal.fire({
                        title: 'No Adeudo validado exitosamente!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000,
                    })
                }
          })
    }

    const notificar_documentos_faltantes = (e) => {

        localStorage.setItem("nNotiFalt","notificarFaltantes")

        Swal.fire({
            title: '¿Está seguro(a)?',
            text: "Se notificará al estudiante que tiene "+texto_span,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15803D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => { 
                if (result.isConfirmed) {
              
                    Inertia.post(route('d.archivoEstudiantil.notificarAE',`${id_AE}`),{
                        _method: 'put',
                        //comentario: result.value,
                    })

                    router.on('start', () => {
                        
                    })
                        
                    Swal.fire({
                        width: 600,
                        padding: '3em',
                        color: '#c02d63',
                        html: "<b><p style='color:#d63065; font-size: 25px'>Notificando al estudiante que tiene documentos faltantes<p></b>",
                        showConfirmButton: false,
                        backdrop: `
                            rgba(243, 18, 119, 0.14)
                            `,
                        didOpen: () => {
                            Swal.showLoading()
                            },
                        })
                        
                    router.on('finish', () => {
                        if("notificarFaltantes"==localStorage.getItem("nNotiFalt")){
                            Swal.fire({
                                title: 'Notificación enviada exitosamente!',
                                icon: 'warning',
                                showConfirmButton: false,
                                timer: 1000,
                            })
                        }
                        localStorage.removeItem('nNotiFalt');
                    })
                }
          })
    }

    const error_validar = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'No puede validar el estado',
            text: 'Aún hay '+texto_span,
            //footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    const error_notificar = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'No puede notificar',
            text: 'El estudiante no adeuda documentos',
            //footer: '<a href="">Why do I have this issue?</a>'
          })
    }

    var lista_documentos = [
        {   //0
            id: 0,
            doc: 'a_partidaNacimiento',
            descripcion: 'Partida o acta de nacimiento en original',
        },
        {   //1
            id: 1,
            doc: 'a_copiaDNI',
            descripcion: 'Copia del DNI',
        },
        {   //2
            id: 2,
            doc: 'a_certificadoEstudioSecReg',
            descripcion: 'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular',
        },
        {   //3
            id: 3,
            doc: 'a_certificadoEstudioSecRegAlt',
            descripcion: 'Certificado de Estudios originales de secundaria de 1ro al 5to año para educación básica regular o del 1ro al 4to año para educación básica alternativa',
        },
        {   //4
            id: 4,
            doc: 'a_certificadoEstudioUni',
            descripcion: 'Certificado de estudios universitarios original',
        },
        {   //5
            id: 5,
            doc: 'a_copiaLegalTituloBach',
            descripcion: 'Copia legalizada de titulo o grado académico de Bachiller',
        },
        {   //6
            id: 6,
            doc: 'a_certificadoEstudioExterno',
            descripcion: 'Certificado de estudios superiores originales de la universidad, que acredite haber aprobado 4 periodos lectivos semestrales, 2 anuales o 72 créditos',
        },
        {   //7
            id: 7,
            doc: 'a_constanciaConductaExterno',
            descripcion: 'Constancia de conducta que acredite no haber sido separado por medidas disciplinarias de la universidad de procedencia',
        },
        {   //8
            id: 8,
            doc: 'a_certificadoEstudioInterno',
            descripcion: 'Certificado de Estudios originales',
        },
        {   //9
            id: 9,
            doc: 'a_constanciaConductaInterno',
            descripcion: 'Constancia de conducta',
        },
        {   //10
            id: 10,
            doc: 'a_constanciaPrimerosPuestos',
            descripcion: 'Constancia de haber obtenido uno de los 5 primeros puestos en educación secundaria refrendada por el director departamental de educación',
        },
        {   //11
            id: 11,
            doc: 'a_curriculoDeportivo',
            descripcion: 'Currículo Deportivo documentado y legalizado',
        },
        {   //12
            id: 12,
            doc: 'a_constanciaDeportistaDestacado',
            descripcion: 'Constancia original que lo acredite como deportista destacado expedida por el IPD con antigüedad no mayor de 2 años',
        },
        {   //13
            id: 13,
            doc: 'a_informeOriginalFPD',
            descripcion: 'Informe original de FPD, del deporte que representa',
        },
        {   //14
            id: 14,
            doc: 'a_carnetRegistroCONADIS',
            descripcion: 'Carnet de registro del Consejo Nacionalde Integración de la persona con discapacidad (CONADIS)',
        },
        {   //15
            id: 15,
            doc: 'a_certificadoEstudioInst',
            descripcion: 'Certificado de estudios originales de su Instituto Pedagógico o Tecnológico',
        },
        {   //16
            id: 16,
            doc: 'a_copiaLegalTituloEgreInst',
            descripcion: 'Copia legalizada del título o constancia original de egresado emitida por la Dirección del Instituto Superior de Procedencia',
        },
        {   //17
            id: 17,
            doc: 'a_curriculoVitaeDescriptivo',
            descripcion: 'Currículo Vitae descriptivo',
        },
        {   //18
            id: 18,
            doc: 'a_certificadoEstudioEscuelaOficiales',
            descripcion: 'Certificado de Estudios superiores de las escuelas de oficiales de las FF.AA. o FF.PP.',
        },
        {   //19
            id: 19,
            doc: 'a_certificadoAcreditacionGradoOficial',
            descripcion: 'Certificado original de la Comandancia General que acredite el Grado de oficial  y de pertenecer a las FF.AA. o FF.PP.',
        },
        {   //20
            id: 20,
            doc: 'a_certificadoEstudioEscuelaSuboficiales',
            descripcion: 'Certificado de Estudios superiores emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.',
        },
        {   //21
            id: 21,
            doc: 'a_constanciaLegalizadaTituloEgreEscSub',
            descripcion: 'Constancia legalizada del titulo o constancia original de egresado emitido por las escuelas de suboficiales de las FF.AA. o FF.PP.',
        },

    ]
    
    switch (mod_ingreso) {
        case 1:
                documentos = {
                    nombre: 'Postulante Ordinario o Regular',
                    lista: [
                        lista_documentos[0],
                        lista_documentos[1],
                        lista_documentos[3],
                    ],
                }
            break;
        
        case 2:
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
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
                documentos = {
                    nombre: 'Primera Selección',
                    lista: [
                        lista_documentos[0],
                        lista_documentos[1],
                        lista_documentos[3],
                    ],
                }
            break;
        
        case 11:
                documentos = {
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
                documentos = {
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

    var documentos_necesarios =[]

    for (let i = 0; i < documentos.lista.length; i++) {
        documentos_necesarios.push(documentos.lista[i].doc)
    }

    var archivoMostrado;
    var count = 0;

    for (let x = 0; x < documentos_necesarios.length; x++) {
        switch (documentos_necesarios[x]) {
            case 'a_partidaNacimiento'://3
                archivoMostrado = archivos.a_partidaNacimiento;
                break;
    
            case 'a_copiaDNI'://4
                archivoMostrado = archivos.a_copiaDNI;
                break;
    
            case 'a_certificadoEstudioSecReg'://5
                archivoMostrado = archivos.a_certificadoEstudioSecReg;
                break;
    
            case 'a_certificadoEstudioSecRegAlt'://6
                archivoMostrado = archivos.a_certificadoEstudioSecRegAlt;
                break;
    
            case 'a_certificadoEstudioUni'://7
                archivoMostrado = archivos.a_certificadoEstudioUni;
                break;
    
            case 'a_copiaLegalTituloBach'://8
                archivoMostrado = archivos.a_copiaLegalTituloBach;
                break;
    
            case 'a_certificadoEstudioExterno'://9
                archivoMostrado = archivos.a_certificadoEstudioExterno;
                break;
    
            case 'a_constanciaConductaExterno'://10
                archivoMostrado = archivos.a_constanciaConductaExterno;
                break;
    
            case 'a_certificadoEstudioInterno'://11
                archivoMostrado = archivos.a_certificadoEstudioInterno;
                break;
    
            case 'a_constanciaConductaInterno'://12
                archivoMostrado = archivos.a_constanciaConductaInterno;
                break;
        
            case 'a_constanciaPrimerosPuestos'://13
                archivoMostrado = archivos.a_constanciaPrimerosPuestos;
                break;
    
            case 'a_curriculoDeportivo'://14
                archivoMostrado = archivos.a_curriculoDeportivo;
                break;
    
            case 'a_constanciaDeportistaDestacado'://15
                archivoMostrado = archivos.a_constanciaDeportistaDestacado;
                break;
    
            case 'a_informeOriginalFPD'://16
                archivoMostrado = archivos.a_informeOriginalFPD;
                break;
    
            case 'a_carnetRegistroCONADIS'://17
                archivoMostrado = archivos.a_carnetRegistroCONADIS;
                break;
    
            case 'a_certificadoEstudioInst'://18
                archivoMostrado = archivos.a_certificadoEstudioInst;
                break;
    
            case 'a_copiaLegalTituloEgreInst'://19
                archivoMostrado = archivos.a_copiaLegalTituloEgreInst;
                break;
    
            case 'a_curriculoVitaeDescriptivo'://20
                archivoMostrado = archivos.a_curriculoVitaeDescriptivo;
                break;
    
            case 'a_certificadoEstudioEscuelaOficiales'://21
                archivoMostrado = archivos.a_certificadoEstudioEscuelaOficiales;
                break;
    
            case 'a_certificadoAcreditacionGradoOficial'://22
                archivoMostrado = archivos.a_certificadoAcreditacionGradoOficial;
                break;
    
            case 'a_certificadoEstudioEscuelaSuboficiales'://23
                archivoMostrado = archivos.a_certificadoEstudioEscuelaSuboficiales;
                break;
            
            case 'a_constanciaLegalizadaTituloEgreEscSub'://24
                archivoMostrado = archivos.a_constanciaLegalizadaTituloEgreEscSub;
                break;
        
            default:
                break;
        }
        
        if(archivoMostrado==null){
            count++;
        }
    }
    
    
    var texto_span = "";

    if(count>0){
        if(count==1){
            texto_span = "1 documento faltante";
        }else{
            texto_span = count+" documentos faltantes";
        }
    }


    return (
        <div>
            <h1 className="font-bold text-2xl mb-5">ESTADO DEUDA - ARCHIVO ESTUDIANTIL</h1>
            <div className='flex justify-between mb-5'>
                <h2 className="text-xl">Documentos | {documentos.nombre}</h2>
                <div className='flex w-48 text-center justify-center'>
                {   estado == 0 ?
                    <>
                        {   count == 0 ?
                            
                            <SpanEstadoDeuda
                                estado = {1}
                            />
                            :
                            <SpanDocumentosFaltantes 
                                texto = {texto_span}
                            />
                        }
                    </>
                    :
                    <SpanEstadoDeuda
                        estado = {estado}
                    />
                }
                </div>
            </div>
            
            <table className="w-full text-xs md:text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#0064bc]">
                    <tr>
                        <th scope="col" className="text-center py-3 px-3 md:px-4 text-lg" style={{borderRight: '1px solid white'}}>
                            Descripción
                        </th>
                        <th scope="col" className="text-center py-3 px-3 md:px-4 text-lg" style={{borderRight: '1px solid white'}}>
                            Documento
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        documentos.lista.map( documento => {
                            return( 
                                <List_Documentos documento={documento} archivo={archivos} key={documento.id}/>
                            )
                        })
                    }
                    
                </tbody>
            </table>

            { estado == 0 &&
            
                <>
                <hr className="my-5"/>
                
                <div className='grid grid-cols-8'>
                    <div className="flex w-full col-start-3 col-end-4 mx-auto">
                        <Link 
                        onClick={
                            count ==0 ? 
                            validar_documentos
                            :
                            error_validar
                        }
                        className="w-full text-center px-3 py-2 text-white bg-green-600 rounded-md focus:outline-none"
                        >
                            <FontAwesomeIcon className="h-5 w-5 pr-3" icon={faCheckCircle} />
                                            <strong>Validar</strong>
                        </Link>
                    </div>
                                    
                    <div className="flex w-full col-start-6 col-end-7 mx-auto">
                        <Link onClick={
                            count !=0 ?
                            notificar_documentos_faltantes
                            :
                            error_notificar
                        }

                        className="w-full text-center px-6 py-2 text-white bg-[#d7aa56] rounded-md focus:outline-none"
                        >
                            <FontAwesomeIcon className="h-5 w-5 pr-2" icon={faMailBulk} />
                            <strong>Notificar</strong>
                        </Link>
                    </div>
                                    
                </div>
                </>

            }
            
        </div>
    ) 


}

export default TablaDocumentos
