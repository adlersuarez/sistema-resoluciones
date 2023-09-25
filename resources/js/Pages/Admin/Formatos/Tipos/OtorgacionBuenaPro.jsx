import React from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faArrowAltCircleLeft, faCircle, faFileWord, faPlus, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import QRCode from 'react-qr-code';
import VistoResolucion from '@/Components/VistaPreviaResoluciones/VistoResolucion';
import ConsiderandoResolucion from '@/Components/VistaPreviaResoluciones/ConsiderandoResolucion';
import AsuntoResolucion from '@/Components/VistaPreviaResoluciones/AsuntoResolucion';

var num_resolucion = ''
var fecha_resolucion = new Date().toISOString().split('T')[0]

var listaAsuntos = []
var listaEncargo = []
var listaConsiderando = []

var visto = ''
var visto_resolucion = ''
var considerando_resolucion = ''

localStorage.setItem("visto_resolucion", visto_resolucion);
localStorage.setItem("considerando_resolucion", considerando_resolucion);

localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));


var imagenQR_base64 = ''
localStorage.setItem("imagenQR_base64", imagenQR_base64);

var nom_obra = ''
var facultad = ''

var fecha_ofi_visto = ''
var num_ofi_visto = ''
var fecha_res_visto = ''
var num_res_visto = ''
var fecha_res_visto_2 = ''
var num_res_visto_2 = ''


var muestra_fecha = ''

localStorage.setItem("visto", visto)
localStorage.setItem("num_resolucion", num_resolucion)
localStorage.setItem("fecha_resolucion", fecha_resolucion)

localStorage.setItem("nom_obra", nom_obra)
localStorage.setItem("facultad", facultad)

localStorage.setItem("fecha_ofi_visto", fecha_ofi_visto)
localStorage.setItem("num_ofi_visto", num_ofi_visto)
localStorage.setItem("fecha_res_visto", fecha_res_visto)
localStorage.setItem("num_res_visto", num_res_visto)
localStorage.setItem("fecha_res_visto_2", fecha_res_visto_2)
localStorage.setItem("num_res_visto_2", num_res_visto_2)

localStorage.setItem("muestra_fecha", muestra_fecha)

const OtorgacionBuenaPro = ({ auth , facultad }) => {

    // console.log(facultad)

    const { data, setData, errors, put, progress } = useForm({
        numeroResolucion: '',
        fecha_resolucion: '',

        nom_obra: '',
        facultad: '',

        fecha_res_visto: '',
        num_res_visto: '',
        fecha_res_visto_2: '',
        num_res_visto_2: '',

        fecha_ofi_visto: '',
        num_ofi_visto: '',

        fecha_carta_visto: '',
        num_carta_visto: '',

        imagenQR64: '',

        fechaResolucion: new Date().toISOString().split('T')[0],
    });

    //VISTO
    function agregar_visto() {
        const visto_datos = `El Oficio Digital N° ${numeroResolucion(data.num_ofi_visto)}-2022-R-UPLA de fecha ${fecha(data.fecha_ofi_visto)}, La Resolución N° ${numeroResolucion(data.num_res_visto)}-2022-CU de fecha ${fecha(data.fecha_res_visto)}, La Resolución N° 3305-2022-CU de fecha 07.12.2022, Resolución N° ${numeroResolucion(data.num_res_visto_2)}-2023-CU-UPLA de fecha ${fecha(data.fecha_res_visto_2)} y acuerdo de Consejo Universitario en sesión extraordinaria de fecha ${fecha(localStorage.getItem('fecha_resolucion'))}, respectivamente; y,`

        localStorage.setItem("visto_resolucion", visto_datos);

        agregar_considerando()
        agregar_asunto()
    }

    //CONSIDERANDO
    function agregar_considerando() {
        listaConsiderando.push({
            descripcion: "La Ley Universitaria 30220, que señala que el Estado reconoce la autonomía universitaria, manifestada a través de cinco regímenes: normativo, de gobierno, académico, administrativo y económico, en el marco de este derecho y garantía que la Constitución concede a las universidades, independientemente de su naturaleza pública o privada, es que éstas pueden ejercer sus capacidades y potestades a fin de prestar, adecuada y óptimamente, el servicio educativo superior universitaria;",
            id: "1",
            nombre: "Estatuto",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `La Resolución N° ${numeroResolucion(localStorage.getItem("num_res_visto"))}-2022-CU de fecha ${fecha(localStorage.getItem("fecha_res_visto"))} que, aprueba el expediente técnico '${localStorage.getItem("nom_obra").toUpperCase()} - ${localStorage.getItem("facultad").toUpperCase()}”;`,
            id: "2",
            nombre: "Resolución",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `La Resolución N° ${numeroResolucion(localStorage.getItem("num_res_visto_2"))}-2023-CU-UPLA de fecha ${fecha(localStorage.getItem("fecha_res_visto_2"))} que, aprueba la comisión encargada de la elaboración de bases, convocatoria y selección del Supervisor para la obra "${localStorage.getItem("nom_obra").toUpperCase()}”;`,
            id: "3",
            nombre: "Miembros",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `El Oficio Digital N° 781-2023-R-UPLA de fecha 24.04.2023 emitido por el señor Rector mediante el cual remite el expediente para ser puesto a consideración de Consejo Universitario;`,
            // descripcion: `El Informe Digital N° ${numeroResolucion(localStorage.getItem('num_carta_visto'))}-2023-OPLAN-UPLA de fecha ${fecha(localStorage.getItem('fecha_carta_visto'))}, del Rector, mediante el cual presenta el Presupuesto Institucional de Apertura UPLA – 2023 al Consejo Universitario, considerando el Oficio Digital N° ${numeroResolucion(localStorage.getItem('num_ofi_visto'))}-2023-OPLAN-UPLA de fecha ${fecha(localStorage.getItem('fecha_ofi_visto'))};`,
            id: "4",
            nombre: "Agregado",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `Los Miembros del Consejo Universitario en sesión Ordinaria de fecha ${fecha(localStorage.getItem('fecha_resolucion'))}, toman conocimiento del expediente y después del debate pertinente, en atención a los fundamentos señalados y en uso a las atribuciones otorgadas por ley;`,
            id: "5",
            nombre: "Miembros",
            tipo: "General"
        })

        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando))
    }

    //ASUNTOS
    function agregar_asunto() {

        listaAsuntos.push(
            {
                'cod': 1,
                'id': 1,
                'nombre': 'APROBAR',
                'descripcion': `las bases para la convocatoria y selección del Supervisor para la obra "${localStorage.getItem('nom_obra')}", de la ${localStorage.getItem('facultad').toUpperCase()}, en mérito a la propuesta formulada mediante Carta N° 0002-COMISIÓN.AULAS.SUPERVISOR-2023 de fecha 25.01.2022, según se detalla a continuación:`,
            },
            {
                'cod': 2,
                'id': 3,
                'nombre': 'ENCARGAR',
                'descripcion': `al Vicerrector Académico, a los Directores Generales Académico y de Administración, a la Decana de la Facultad de Ciencias de la Salud, y demás Instancias Académicas y Administrativas, el cumplimiento de la presente Resolución.`,
            },
            {
                'cod': 3,
                'id': 5,
                'nombre': 'TRANSCRIBIR',
                'descripcion': `la presente Resolución a las instancias correspondientes, para su conocimiento y fines pertinentes.`,
            },
        )

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

    }

    function handleSubmit(e) {
        e.preventDefault();

        //guardar png base 64
        if (document.querySelector('#diagram_png').src != '') {
            if (localStorage.getItem('imagenQR_base64') == '') {
                localStorage.setItem("imagenQR_base64", document.querySelector('#diagram_png').src);
            }
        }

        Inertia.post(route('r.formatos.store.AuspicioAcademico'), {
            _method: 'post',

            visto_resolucion: localStorage.getItem('visto_resolucion'),
            numeroResolucion: localStorage.getItem('num_resolucion'),
            fechaResolucion: localStorage.getItem('fecha_resolucion'),

            asuntos: listaAsuntos,
            considerando: listaConsiderando,

            imagenQR64: localStorage.getItem('imagenQR_base64'),
        })

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    if (localStorage.getItem('fecha_resolucion') != '') {
        localStorage.setItem("muestra_fecha", data.fechaResolucion.replaceAll('-', '.'));
    }

    function fecha(id) {
        const cambiada = id.split("-").reverse().join("-");
        if (cambiada) { return cambiada.replaceAll('-', '.') }
    }

    function numeroResolucion(id) {
        return id.padStart(4, '0000')
    }
    function yearFecha(id) {
        return id.slice(0, 4)
    }

    function textoCodigoQR() {
        var texto = ''

        if (localStorage.getItem('num_resolucion') != '') {
            texto += numeroResolucion(localStorage.getItem('num_resolucion'))
        }

        if (localStorage.getItem('fecha_resolucion') != '') {
            texto += '-' + yearFecha(localStorage.getItem('fecha_resolucion'))
        }

        texto += '-CU'

        if (localStorage.getItem('fecha_resolucion') != '') {
            texto += ' ' + fecha(localStorage.getItem('fecha_resolucion'))
        }

        return texto
    }

    var codigo_qr = textoCodigoQR()

    if (localStorage.getItem('num_resolucion') != '' && localStorage.getItem('fecha_resolucion') != '') {

        //CONVERTIR SVG a png agregando un canvas
        var mySVG = document.querySelector('#svblock'),        // Inline SVG element
            tgtImage = document.querySelector('#diagram_png'), // Where to draw the result
            can = document.createElement('canvas'), // Not shown on page
            ctx = can.getContext('2d'),
            loader = new Image;

        loader.width = can.width = tgtImage.width = mySVG.clientWidth;
        loader.height = can.height = tgtImage.height = mySVG.clientHeight;

        loader.onload = function () {
            ctx.drawImage(loader, 0, 0, loader.width, loader.height);
            tgtImage.src = can.toDataURL();

            //console.log(tgtImage.src)
            if (tgtImage.src) {
                localStorage.setItem("imagenQR_base64", tgtImage.src);
            }
        };
        var svgAsXML = (new XMLSerializer).serializeToString(mySVG);
        loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
    }

    return (
        <Navbar auth={auth}>
            <Head title="Resoluciones" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Registrar Resolución de Propuesta Jefe Of.'} icono={faFileWord} />
                <div className="flex items-center justify-between mb-6">
                    <Link className="pr-5 pl-3 py-2 text-white bg-[#007CBC] rounded-md focus:outline-none hover:bg-[#0064bc]"
                        //onClick={() => limpiar()}
                        href={route('r.formatos')}
                    >
                        <FontAwesomeIcon className="h-4 w-5 mr-3" icon={faArrowAltCircleLeft} />
                        <strong>Volver</strong>
                    </Link>
                </div>
            </div>
            <div className="flex">
                <div className="w-6/12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-10 py-4 border-b border-gray-200">
                            <hr className='my-4' />

                            <form name="createForm" onSubmit={handleSubmit}>
                                {/* empieza el form*/}
                                <div className=''>
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <h1 className='font-bold m-auto pr-2 text-xl'>RESOLUCIÓN</h1>
                                        </div>
                                        <div className='flex'>
                                            <h3 className='font-bold m-auto pr-2'>N°</h3>
                                            <input
                                                type="number"
                                                min="1" max="999"
                                                className="px-4 py-2 text-gray-500 h-8 my-auto"
                                                defaultValue={localStorage.getItem('num_resolucion')}
                                                onChange={(e) => {
                                                    setData('num_resolucion', e.target.value);
                                                    localStorage.setItem("num_resolucion", e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className='flex'>
                                            <h3 className='font-bold m-auto pr-2'>Fecha</h3>
                                            <input
                                                type="date"
                                                className="px-4 py-2 text-gray-500 h-8 my-auto"
                                                defaultValue={localStorage.getItem('fecha_resolucion')}
                                                onChange={(e) => {
                                                    setData('fecha_resolucion', e.target.value);
                                                    localStorage.setItem("fecha_resolucion", e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <hr className='my-4' />
                                    {/*OBRA*/}
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <h1 className='font-bold m-auto pr-2 text-xl'>NOMBRE DE LA OBRA</h1>
                                        </div>
                                        <div className='flex'>
                                            <h3 className='font-bold m-auto pr-2'></h3>
                                            <input
                                                type="text"
                                                className="px-4 py-2 text-gray-500 h-8 my-auto"
                                                defaultValue={localStorage.getItem('nom_obra').toUpperCase()}
                                                onChange={(e) => {
                                                    setData('nom_obra', e.target.value);
                                                    localStorage.setItem("nom_obra", e.target.value.toUpperCase());
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/*FACULTAD*/}
                                    <div className='flex justify-around py-2'>
                                        <div className='my-auto mx-2'>Facultad:</div>
                                        <select 
                                            id="select-carrera-prof"
                                            defaultValue={'0'}
                                            onChange={(e)=>{
                                                setData('facultad',e.target.value);
                                                localStorage.setItem("facultad", e.target.value)
                                            }}>
                                            <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                            {
                                                facultad.map(fac => {
                                                    return (
                                                        <option key={fac.id_facultad} value={fac.c_nomFacultad}>{fac.c_nomFacultad}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <hr className='my-4' />
                                    <div className='flex justify-between mb-3'>
                                        <h1 className='font-bold'>VISTOS</h1>
                                        {localStorage.getItem('visto_resolucion') == '' &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_visto()} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'> Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPlus} />
                                                    </div>
                                                </Link>
                                            </div>}
                                    </div>

                                    {/* RESOLUCION */}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-32">El Oficio Digital N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_ofi_visto')}
                                            onChange={(e) => {
                                                setData('num_ofi_visto', e.target.value);
                                                localStorage.setItem("num_ofi_visto", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'>-2023-CU de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_ofi_visto')}
                                            onChange={(e) => {
                                                setData('fecha_ofi_visto', e.target.value);
                                                localStorage.setItem("fecha_ofi_visto", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* OFICIO 1 */}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-32">La Resolución N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_res_visto')}
                                            onChange={(e) => {
                                                setData('num_res_visto', e.target.value);
                                                localStorage.setItem("num_res_visto", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'> de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_res_visto')}
                                            onChange={(e) => {
                                                setData('fecha_res_visto', e.target.value);
                                                localStorage.setItem("fecha_res_visto", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* OFICIO 2*/}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-32">La Resolución N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_res_visto_2')}
                                            onChange={(e) => {
                                                setData('num_res_visto_2', e.target.value);
                                                localStorage.setItem("num_res_visto_2", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'>-2023-R-UPLA de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_res_visto_2')}
                                            onChange={(e) => {
                                                setData('fecha_res_visto_2', e.target.value);
                                                localStorage.setItem("fecha_res_visto_2", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>


                                    <hr className='my-4' />

                                    <div className="flex mx-auto mt-4 justify-center">
                                        <button type="submit" className="px-6 py-2 font-bold w-40 text-white bg-[#007CBC] rounded hover:bg-[#0064bc]">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-sm sm:rounded-lg w-6/12 p-4 ml-4 overflow-hidden'>
                    <div className='h-[800px] border-black border-[1px] p-2 overflow-x-hidden max-h-[745px] max-[745px]:overflow-scroll'>
                        <div className='my-2 text-center text-xl'>
                            <strong>RESOLUCIÓN DE PROPUESTA JEFE

                                {
                                    localStorage.getItem('num_resolucion') != '' &&
                                    '  N° ' + numeroResolucion(localStorage.getItem('num_resolucion'))
                                }
                                {
                                    (localStorage.getItem('fecha_resolucion') != '' && localStorage.getItem('num_resolucion') != '') &&
                                    '-' + yearFecha(localStorage.getItem('fecha_resolucion')) + '-CU-UPLA'
                                }
                            </strong>
                            {
                                data.fechaResolucion &&
                                <div className='my-2 text-right text-base '>
                                    <label>Huancayo, {fecha(localStorage.getItem('fecha_resolucion'))}</label>
                                </div>
                            }
                            {
                                (localStorage.getItem('visto_resolucion') != '' && localStorage.getItem('fecha_resolucion') != '') &&
                                <>
                                    <div className='flex text-left text-lg justify-between'>
                                        <strong> VISTOS:</strong>
                                        <Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                            <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                        </Link>
                                    </div>

                                    <VistoResolucion />
                                </>
                            }
                            {
                                (localStorage.getItem('visto_resolucion') == '' && listaConsiderando.length == 0) &&
                                <div className='flex w-full h-8 bg-slate-500 text-center text-white justify-center'>
                                    <strong className='m-auto'>VISTA PREVIA</strong>
                                </div>
                            }
                            {
                                listaConsiderando.length != 0 &&
                                <>
                                    <hr className='my-4' />
                                    <div className='flex mt-4 justify-between'>
                                        <strong className='my-auto text-lg'>CONSIDERANDO:</strong>
                                        <Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                            <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                        </Link>
                                    </div>

                                    <ConsiderandoResolucion listaConsiderando={listaConsiderando} />
                                </>
                            }

                            {
                                listaAsuntos.length != 0 &&
                                <>
                                    <hr className='my-4' />
                                    <div className='flex gap-4 mt-4 justify-between'>
                                        <strong className='my-auto text-lg'>SE RESUELVE:</strong>
                                        <Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                            <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                        </Link>
                                    </div>
                                    <AsuntoResolucion listaAsuntos={listaAsuntos} />
                                </>
                            }

                            {
                                codigo_qr &&
                                <div className='mt-4 text-center uppercase'>
                                    <hr className='my-10' />

                                    {<div className='w-40 h-40 m-auto' id='diagram_image'>
                                        <QRCode
                                            id='svblock'
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={codigo_qr}
                                            viewBox={`0 0 256 256`}
                                            fgColor={'#007CBC'}
                                        />
                                    </div>}
                                    <label className='text-[#007CBC] font-bold text-sm mt-4'>{codigo_qr}</label>
                                    <img className='hidden' id="diagram_png" />

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </Navbar >
    )
}

export default OtorgacionBuenaPro