import React,{useState} from "react";
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import SpanDocumentoUser from "@/Components/Span/SpanDocumentoUser";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "@inertiajs/inertia-react";

export default function TemplateAE({documentos,detTipPer}){

    const { data, setData } = useForm({
        mod_ingreso:detTipPer.id_modalidadIngreso,
        doc_subido:null,
    });

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

    if (data.mod_ingreso != null) {
        //console.log(data.mod_ingreso)
        switch (parseInt(data.mod_ingreso)) {
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
    }

    var documentos_necesarios =[]
    var documentos_obtenidos =[]

    if(data.mod_ingreso != null){
        var tam_list = doc.lista.length
        for(var i=0;i<tam_list;i++){
            //console.log(i)
            documentos_necesarios.push(doc.lista[i].doc)
            //console.log(i)
        }
        var claves = Object.keys(documentos)
        //console.log(claves)
        for(let k=0;k<claves.length;k++){
            for (let j = 0; j < documentos_necesarios.length; j++) {

                if(claves[k]==documentos_necesarios[j]){
                    //documentos_obtenidos.push({archivo:documentos[claves[k]]})
                    documentos_obtenidos.push(documentos[claves[k]])
                }
            }
        }
        for (let index = 0; index < doc.lista.length; index++) {
            doc.lista[index].file = documentos_obtenidos[index];
        }
        //console.log(doc)
    }

    return(
        <div className="overflow-x-auto relative shadow-md rounded-lg mt-5">
                <table className="w-full text-xs md:text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-white uppercase bg-[#0064bc]">
                        <tr>
                            <th scope="col" className="text-center py-3 px-3 md:px-4" style={{ borderRight: '1px solid white' }}>
                                Documentos necesarios
                            </th>
                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{ borderRight: '1px solid white' }}>
                                Estado
                            </th>
                            <th scope="col" className="text-center py-3 px-3 md:px-4 " style={{ borderRight: '1px solid white' }}>
                                Archivo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //nuevo componente
                            data.mod_ingreso!=null?
                                doc.lista.map(docs =>{
                                    function handleSubmit(e){
                                        e.preventDefault();
                                        Inertia.post(route('actulizarDocumentos',`${detTipPer.id_estudiante}`),{
                                        _method: 'put',
                                        c_archivoDoc: docs.doc,
                                        c_imagenDoc: data.doc_subido,
                                        })

                                        Swal.fire({
                                            //position: 'top-middle',
                                            icon: 'success',
                                            title: 'documento actulizado',
                                            showConfirmButton: false,
                                            timer: 1000
                                          })

                                    }
                                    const [preview, setPreview] = useState('');

                                    const onSelectedFile = (e) =>{
                                    const file = e.target.files[0];
                                    const url = URL.createObjectURL(file);
                                    console.log(url);
                                    setPreview(url);
                                    }
                                    
                                    const mostrarDoc = (e) =>{
                                        Swal.fire({
                                            title: `Doc: &nbsp&nbsp<b>${docs.descripcion}</b>`,
                                            text: ``,
                                            width: '600px',
                                            heightAuto: false,
                                            customClass: 'swal-height',
                                            html: `<div><embed src='/documentos/estudiante/${docs.file}' className='max-w-xs' alt='Boucher' width='100%' height='650px' /></div>`,
                                            
                                        }) 
                                    }
                                    const [update,setUpdate] = useState(true)

                                    const btnActulizar = (e) =>{
                                        setUpdate(!update)
                                    }

                                    return(
                                        <tr className="bg-white border-b" key={docs.id}>
                                            <td className="py-4 px-4 md:px-6 text-lg">
                                                <strong> {docs.descripcion} </strong>
                                            </td>
                                            <td className="text-center py-4 px-4 md:px-6 text-lg">
                                                <div className="flex w-full justify-center">
                                                {
                                                    docs.file!=null?
                                                    <SpanDocumentoUser
                                                        estado={1}
                                                    />
                                                    :
                                                    <SpanDocumentoUser
                                                        estado={0}
                                                    />
                                                }
                                                </div>
                                            </td>
                                            <td className="text-center py-4 px-4 md:px-6 flex w-full justify-center">
                                                {
                                                    docs.file==null?

                                                    <form action="createForm" onSubmit={handleSubmit}>
                                                        
                                                            <div className="border-4 border-gray-400 rounded-lg border-dashed p-4 text-center h-auto">
                                                                <label className="">
                                                                    <div className='inline-block mb-4 text-center justify-center align-middle'>
                                                                        <p className='text-lg text-gray-800 group-hover:text-blue-600 tracking-wider'>Seleccionar</p>
                                                                    </div>
                                                                    
                                                                    <input
                                                                        type="file"
                                                                        className='bg-yellow-400 hidden'
                                                                        label="documento"
                                                                        name="documento"
                                                                        onChange={(e) =>
                                                                            {
                                                                            setData(
                                                                                "doc_subido",e.target.files[0]);
                                                                                onSelectedFile(e);
                                                                            }
                                                                        }
                                                                    />
                                                                </label>
                                                            </div>
                                                        
                                                            <div className="mt-4 mb-4">
                                                                {   
                                                                    preview && <embed src={`${preview}`} style={{width:'100%', height:'300px'}} />
                                                                }
                                                            </div>
                                                        
                                                        <div className="mt-4">
                                                            <button
                                                            type="submit"
                                                            className="px-6 py-2 font-bold text-white bg-[#0064bc] rounded"
                                                            >
                                                            Subir Documento
                                                            </button>
                                                        </div>
                                                    </form>

                                                    :
                                                    <div className="items-center flex flex-row mb-2 col-span-4">
                                                        <Link onClick={mostrarDoc} className="px-3">
                                                            <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
                                                                <embed src={`/documentos/estudiante/${docs.file}`} style={{width:'100px',height:"100px"}} />
                                                                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-gray-700 text-white grid place-items-center">
                                                                    <FontAwesomeIcon className="h-8 w-10 mx-3" icon={faEye}/>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="border-l-2 border-black px-3">
                                                            <div onClick={btnActulizar} className={`cursor-pointer bg-blue-500 rounded px-2 py-1 text-white ${!update?"hidden":""}`}>
                                                                Actulizar Doc.
                                                            </div>
                                                            <div className={`${update?"hidden":""}`}>
                                                                <form action="createForm" onSubmit={handleSubmit}>
                                                                
                                                                    <div className="border-4 border-gray-400 rounded-lg border-dashed p-4 text-center h-auto">
                                                                        <label className="">
                                                                            <div className='inline-block mb-4 text-center justify-center align-middle'>
                                                                                <p className='text-lg text-gray-800 group-hover:text-blue-600 tracking-wider'>Actulizar</p>
                                                                            </div>
                                                                            
                                                                            <input
                                                                                type="file"
                                                                                className='bg-yellow-400 hidden'
                                                                                label="documento"
                                                                                name="documento"
                                                                                onChange={(e) =>
                                                                                    {
                                                                                    setData(
                                                                                        "doc_subido",e.target.files[0]);
                                                                                        onSelectedFile(e);
                                                                                    }
                                                                                }
                                                                            />
                                                                        </label>
                                                                    </div>
                                                                
                                                                    <div className="mt-4 mb-4">
                                                                        {   
                                                                            preview && <embed src={`${preview}`} style={{width:'100%', height:'300px'}} />
                                                                        }
                                                                    </div>
                                                                
                                                                    <div className="mt-4">
                                                                        <button
                                                                        type="submit"
                                                                        className="px-6 py-2 font-bold text-white bg-[#0064bc] rounded"
                                                                        >
                                                                        Actualizar Documento
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            :
                            <div></div>
                        }

                    </tbody>
                </table>
            </div>
    )
}