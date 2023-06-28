import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faArrowAltCircleLeft, faArrowDown, faArrowUp, faCircle, faEdit, faFileWord, faPlus, faRefresh, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import QRCode from 'react-qr-code';

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

var id_persona = 'DEFAULT'
var fecha_fut_visto = ''
var num_fut_visto = ''

var fecha_ofi_visto = ''
var num_ofi_visto = ''

var fecha_prov_visto = ''
var num_prov_visto = ''
var fecha_prov_visto_2 = ''
var num_prov_visto_2 = ''

var auspicio_propuesto = ''
var autoriza_emblema = ''

var muestra_fecha = ''
var id_modalidad_pos = 'DEFAULT'
var id_modalidad_pre = 'DEFAULT'
var modalidad_educacion = ''
localStorage.setItem("id_modalidad_pre", id_modalidad_pre)
localStorage.setItem("id_modalidad_pos", id_modalidad_pos)

localStorage.setItem("id_persona", id_persona)
localStorage.setItem("modalidad_educacion", modalidad_educacion)

localStorage.setItem("visto", visto)
localStorage.setItem("num_resolucion", num_resolucion)
localStorage.setItem("fecha_resolucion", fecha_resolucion)

localStorage.setItem("fecha_fut_visto", fecha_fut_visto)
localStorage.setItem("num_fut_visto", num_fut_visto)
localStorage.setItem("fecha_ofi_visto", fecha_ofi_visto)
localStorage.setItem("num_ofi_visto", num_ofi_visto)
localStorage.setItem("fecha_prov_visto", fecha_prov_visto)
localStorage.setItem("num_prov_visto", num_prov_visto)

localStorage.setItem("fecha_prov_visto_2", fecha_prov_visto_2)
localStorage.setItem("num_prov_visto_2", num_prov_visto_2)

localStorage.setItem("auspicio_propuesto", auspicio_propuesto)
localStorage.setItem("autoriza_emblema", autoriza_emblema)

localStorage.setItem("muestra_fecha", muestra_fecha)

const CambioModalidadIngreso = ({ auth, estudiantes, modalidades }) => {

    const { data, setData, errors, put, progress } = useForm({
        numeroResolucion: '',
        fecha_resolucion: '',
        id_persona: '',
        id_modalidad_pre: '',
        id_modalidad_pos: '',
        modalidad_educacion: '',

        fecha_fut_visto: '',
        num_fut_visto: '',

        fecha_ofi_visto: '',
        num_ofi_visto: '',
        fecha_prov_visto: '',
        num_prov_visto: '',

        fecha_prov_visto_2: '',
        num_prov_visto_2: '',

        id_facultad: '',
        auspicio_propuesto: '',
        autoriza_emblema: '',

        imagenQR64: '',

        fechaResolucion: new Date().toISOString().split('T')[0],
    });

    var estudiante_elegido = estudiantes.filter(
        est => est.id_persona == data.id_persona
    )

    var modalidad_pre_elegida = modalidades.filter(
        pre => pre.id_modalidadIngreso == data.id_modalidad_pre
    )

    var modalidad_pos_elegida = modalidades.filter(
        pos => pos.id_modalidadIngreso == data.id_modalidad_pos
    )

    //console.log(estudiante_elegido[0])

    //Filtro de texto
    const [filterText, setFilterText] = useState('');

    var filtro = []

    estudiantes.map((elemento) =>
        filtro.push({
            id: elemento.id_persona,
            nombre: elemento.c_apellidoP + ' ' + elemento.c_apellidoM + ' ' + elemento.c_nombres,
            codigo: elemento.c_codMatricula,
            dni: elemento.c_dni,
        })
    )

    const filteredItems = filtro.filter(
        item => (item.dni.toLowerCase().includes(filterText.toLowerCase())
            || item.nombre.toLowerCase().includes(filterText.toLowerCase())
            || item.codigo.toLowerCase().includes(filterText.toLowerCase()))
    )

    //VISTO
    function agregar_visto() {
        const visto_datos = `El Formulario Único de Trámite N° ${numeroResolucion(data.num_fut_visto)}-CF-FCC.SS.-UPLA-2023 de fecha ${fecha(data.fecha_fut_visto)}, Oficio N° ${numeroResolucion(data.num_ofi_visto)}-E-2023-OURYM-UPLA de fecha ${fecha(data.fecha_ofi_visto)}, Proveído N° ${numeroResolucion(data.num_prov_visto)}-2023-VRACD-UPLA de fecha ${fecha(data.fecha_prov_visto)}, Proveído N° ${numeroResolucion(data.num_prov_visto_2)}-2023-VRACD-UPLA de fecha ${fecha(data.fecha_prov_visto_2)} y acuerdo de Consejo Universitario en sesión extraordinaria de fecha ${fecha(localStorage.getItem('fecha_resolucion'))}, respectivamente; y,`

        localStorage.setItem("visto_resolucion", visto_datos);
    }
    function editar_visto() {
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Asunto',
            html: `<h1 class="h1-form"> VISTOS</h1>
            <div class="div-form-asunto">
                <div class="div-input-form-asunto">
                    <label class="label-input-form">Descripción</label>
                    <textarea type="number" id="asunto" class="swal2-input" >${localStorage.getItem('visto_resolucion')}</textarea>
                </div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '800px',
            customClass: {
                title: 'custom-title',
                closeButton: 'close-button',
            },
            preConfirm: () => {
                const asunto = Swal.getPopup().querySelector('#asunto').value
                //const imagen = Swal.getPopup().querySelector('#imagen').value

                if (!asunto) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { asunto: asunto }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                localStorage.setItem("visto_resolucion", result.value.asunto);

                Swal.fire({
                    icon: 'success',
                    title: 'Asunto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    //CONSIDERANDO
    function agregar_considerando() {

        var nombre_completo_seleccionado = ''
        var facultad_seleccionada = ''
        var carrera_seleccionada = ''
        var codigo_seleccionado = ''

        if (data.id_persona != '') {
            nombre_completo_seleccionado = estudiante_elegido[0].c_apellidoP + ' ' + estudiante_elegido[0].c_apellidoM + ' ' + estudiante_elegido[0].c_nombres
            facultad_seleccionada = estudiante_elegido[0].c_nomFacultad
            carrera_seleccionada = estudiante_elegido[0].c_nomCarreraProf
            codigo_seleccionado = estudiante_elegido[0].c_codMatricula
        }

        listaConsiderando.push({
            descripcion: "La Ley Universitaria Ley N° 30220, en su artículo 22º, dispone que la SUNEDU es la autoridad central de la supervisión de la calidad bajo el ámbito de su competencia, incluyendo el licenciamiento y supervisión de las condiciones del servicio educativo de nivel superior universitario, en razón de lo cual dicta normas y establece procedimientos para asegurar el cumplimiento de las políticas públicas del Sector Educación en materia de su competencia;",
            id: "1",
            nombre: "Ley Universitaria",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: "El artículo 23°, inc. n) y v), del Estatuto de la Universidad Peruana Los Andes, establece que es atribución del Consejo Universitario aprobar las modalidades de ingreso a la Universidad; y, conocer y resolver todos los demás asuntos que no están encomendados a las autoridades universitarias;",
            id: "2",
            nombre: "Estatuto",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `El Formulario Único de Trámite N° ${numeroResolucion(localStorage.getItem('num_fut_visto'))} de fecha ${fecha(localStorage.getItem('fecha_fut_visto'))}, presentado por el señor ${nombre_completo_seleccionado}, egresado de la Escuela Profesional de ${carrera_seleccionada} de la ${facultad_seleccionada}, peticiona al Rector Cambio de Modalidad de Ingreso, según se detalla en la parte resolutiva;`,
            id: "3",
            nombre: "Agregado",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `El Oficio N° ${numeroResolucion(localStorage.getItem('num_ofi_visto'))}-E-2023-OURYM-UPLA de fecha ${fecha(localStorage.getItem('fecha_ofi_visto'))} emitido por el Jefe de la Oficina de Registros y Matrículas al señor Vicerrector Académico con opinión favorable en mérito a los documentos presentados por el estudiante, para su conocimiento y tratamiento pertinente;`,
            id: "4",
            nombre: "Agregadonb ",
            tipo: "General"
        })

        listaConsiderando.push({
            descripcion: `Los Miembros del Consejo Universitario en sesión extraordinaria de fecha ${fecha(localStorage.getItem('fecha_resolucion'))}, toman conocimiento del expediente y después del debate pertinente, en atención a los fundamentos señalados y en uso a las atribuciones otorgadas por ley;`,
            id: "5",
            nombre: "Miembros",
            tipo: "General"
        })
        localStorage.setItem("estudiante_elegido", nombre_completo_seleccionado)
        localStorage.setItem("estudiante_carrera_elegido", carrera_seleccionada)
        localStorage.setItem("estudiante_facultad_elegido", facultad_seleccionada)
        localStorage.setItem("estudiante_codigo_elegido", codigo_seleccionado)

        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando))
    }

    function editar_considerando(id) {
        var indiceEditar = listaConsiderando.findIndex(item => item.id === id)
        var aux = listaConsiderando[indiceEditar]
        //console.log(aux)
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Considerando',
            html: `<h1 class="h1-form"> ${aux.tipo.toUpperCase()} - ${aux.nombre}</h1>
            <div class="div-form-asunto">
                <div class="div-input-form-asunto">
                    <label class="label-input-form">Descripción</label>
                    <textarea type="number" id="asunto" class="swal2-input" >${aux.descripcion}</textarea>
                </div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '800px',
            customClass: {
                title: 'custom-title',
                closeButton: 'close-button',
            },
            preConfirm: () => {
                const asunto = Swal.getPopup().querySelector('#asunto').value
                //const imagen = Swal.getPopup().querySelector('#imagen').value

                if (!asunto) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { asunto: asunto }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                aux.descripcion = result.value.asunto
                listaConsiderando.splice(indiceEditar, 1, aux)
                localStorage.setItem("listaAsuntos", JSON.stringify(listaConsiderando));

                //console.log(listaConsiderando)

                Swal.fire({
                    icon: 'success',
                    title: 'Considerando actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    function eliminar_considerando(id) {
        var indiceBorrado = listaConsiderando.findIndex(item => item.id === id)
        listaConsiderando.splice(indiceBorrado, 1)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));

        /*var indiceBorradoDoc = listaVisto.findIndex(item => item.id === id)
        listaConsiderando.splice(indiceBorradoDoc, 1)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));*/
    }
    function mover_arriba_considerando(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        const aux_pos1 = listaConsiderando[indiceItem]
        const aux_pos2 = listaConsiderando[indiceItem - 1]

        listaConsiderando.splice(indiceItem - 1, 1, aux_pos1)
        listaConsiderando.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));
    }
    function mover_abajo_considerando(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        const aux_pos1 = listaConsiderando[indiceItem]
        const aux_pos2 = listaConsiderando[indiceItem + 1]

        listaConsiderando.splice(indiceItem + 1, 1, aux_pos1)
        listaConsiderando.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));
    }
    function estado_lista_considerando_inicio(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_considerando_fin(id) {
        var indiceItem = listaConsiderando.findIndex(item => item.id === id)
        if (indiceItem == (listaConsiderando.length - 1)) {
            return true
        }
    }

    //ASUNTOS
    function agregar_asunto() {
        var modalidad_pre_seleccionada = ''
        var modalidad_post_seleccionada = ''

        if(modalidad_pre_elegida[0] && modalidad_pos_elegida[0] ){
            modalidad_pre_seleccionada = modalidad_pre_elegida[0].c_nomModalidadIngreso
            modalidad_post_seleccionada = modalidad_pos_elegida[0].c_nomModalidadIngreso
        }

        listaAsuntos.push(
            {
                'cod': 1,
                'id': 10,
                'nombre': 'RECTIFICAR',
                'descripcion': `la Constancia de Ingreso al Proceso de Admisión, Modalidad de Educación ${data.modalidad_educacion} del egresado ${localStorage.getItem('estudiante_elegido')}, de la Escuela Profesional de ${localStorage.getItem('estudiante_carrera_elegido')} de la ${localStorage.getItem('estudiante_facultad_elegido')}, con Código de Matrícula N° ${localStorage.getItem('estudiante_codigo_elegido')}, según se detalla a continuación:
                DICE:
                MODALIDAD: ${modalidad_pre_seleccionada}
                DEBE DECIR: 
                MODALIDAD: ${modalidad_post_seleccionada}            
                `,
            },
            {
                'cod': 2,
                'id': 9,
                'nombre': 'AUTORIZAR',
                'descripcion': `al Jefe de la Oficina de Registros y Matriculas en coordinación con el Jefe de la Oficina de Admisión la rectificación aprobada en el Art. 1° de la presente resolución.`,
            },
            {
                'cod': 3,
                'id': 3,
                'nombre': 'ENCARGAR',
                'descripcion': `al Vicerrector Académico, al Decano de la ${localStorage.getItem('estudiante_facultad_elegido')}, a los jefes de las Oficinas de Registros y Matrículas, Informática y Sistemas, Admisión, y demás instancias académicas y administrativas, el cumplimiento de la presente resolución.`,
            },
            {
                'cod': 4,
                'id': 5,
                'nombre': 'TRANSCRIBIR',
                'descripcion': `la presente resolución a las Oficinas correspondientes para su conocimiento y fines pertinentes.`,
            },
        )

        localStorage.setItem('modalidad_pre_select',modalidad_pre_seleccionada)
        localStorage.setItem('modalidad_post_select',modalidad_post_seleccionada)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

    }
    function editar_asunto(cod) {
        var indiceEditar = listaAsuntos.findIndex(item => item.cod === cod)
        var aux = listaAsuntos[indiceEditar]
        //console.log(aux)
        //añadir formulario con sweet alert
        Swal.fire({
            title: 'Editar Asunto',
            html: `<h1 class="h1-form"> Art. ${indiceEditar + 1}° - ${aux.nombre.toUpperCase()}</h1>
            <div class="div-form-asunto">
                <div class="div-input-form-asunto">
                    <label class="label-input-form">Descripción</label>
                    <textarea type="number" id="asunto" class="swal2-input" >${aux.descripcion}</textarea>
                </div>
            </div>`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            showCloseButton: true,
            width: '800px',
            customClass: {
                title: 'custom-title',
                closeButton: 'close-button',
            },
            preConfirm: () => {
                const asunto = Swal.getPopup().querySelector('#asunto').value
                //const imagen = Swal.getPopup().querySelector('#imagen').value

                if (!asunto) {
                    Swal.showValidationMessage(`Por favor ingrese todos los campos`)
                }
                return { asunto: asunto }
            }
        }).then((result) => {
            if (result.isConfirmed) {

                aux.descripcion = result.value.asunto
                listaAsuntos.splice(indiceEditar, 1, aux)
                localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

                console.log(listaAsuntos)

                Swal.fire({
                    icon: 'success',
                    title: 'Asunto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }
    function eliminar_asunto(cod) {
        var indiceBorrado = listaAsuntos.findIndex(item => item.cod === cod)
        listaAsuntos.splice(indiceBorrado, 1)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_arriba_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem - 1]

        listaAsuntos.splice(indiceItem - 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function mover_abajo_asunto(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        const aux_pos1 = listaAsuntos[indiceItem]
        const aux_pos2 = listaAsuntos[indiceItem + 1]

        listaAsuntos.splice(indiceItem + 1, 1, aux_pos1)
        listaAsuntos.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
    }
    function estado_lista_asunto_inicio(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_asunto_fin(cod) {
        var indiceItem = listaAsuntos.findIndex(item => item.cod === cod)
        if (indiceItem == (listaAsuntos.length - 1)) {
            return true
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        //guardar png base 64
        if (document.querySelector('#diagram_png').src != '') {
            if (localStorage.getItem('imagenQR_base64') == '') {
                localStorage.setItem("imagenQR_base64", document.querySelector('#diagram_png').src);
            }
        }

        Inertia.post(route('r.formatos.store.CambioModalidadIngreso'), {
            _method: 'post',

            visto_resolucion: localStorage.getItem('visto_resolucion'),
            numeroResolucion: localStorage.getItem('num_resolucion'),
            fechaResolucion: localStorage.getItem('fecha_resolucion'),

            asuntos: listaAsuntos,
            considerando: listaConsiderando,

            modalidad_pre : localStorage.getItem('modalidad_pre_select'),
            modalidad_pos : localStorage.getItem('modalidad_pre_select'),

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
                <TitlePages texto={'Registrar Resolución de Cambio de modalidad de ingreso'} icono={faFileWord} />
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
                        <div className="p-4 border-b border-gray-200">

                            <form name="createForm" onSubmit={handleSubmit}>
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

                                    {/* FUT */}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-28">FUT N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_fut_visto')}
                                            onChange={(e) => {
                                                setData('num_fut_visto', e.target.value);
                                                localStorage.setItem("num_fut_visto", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'> de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_fut_visto')}
                                            onChange={(e) => {
                                                setData('fecha_fut_visto', e.target.value);
                                                localStorage.setItem("fecha_fut_visto", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* OFICIO */}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-28">Oficio N° </label>
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
                                        <div className='my-auto mx-2'>-E-2023-OURYM-UPLA de fecha</div>
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

                                    {/* PROVEIDO 1*/}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-28">Proveído N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_prov_visto')}
                                            onChange={(e) => {
                                                setData('num_prov_visto', e.target.value);
                                                localStorage.setItem("num_prov_visto", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'>-2023-VRACD-UPLA de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_prov_visto')}
                                            onChange={(e) => {
                                                setData('fecha_prov_visto', e.target.value);
                                                localStorage.setItem("fecha_prov_visto", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    {/* PROVEIDO 1*/}
                                    <div className='flex my-2'>
                                        <FontAwesomeIcon className="my-auto mx-4 h-1" icon={faCircle} />
                                        <label className="my-auto pr-2 w-28">Proveído N° </label>
                                        <input
                                            type="number"
                                            min="1" max="999"
                                            className="px-4 py-2 text-gray-500 h-8 my-auto"
                                            defaultValue={localStorage.getItem('num_prov_visto_2')}
                                            onChange={(e) => {
                                                setData('num_prov_visto_2', e.target.value);
                                                localStorage.setItem("num_prov_visto_2", e.target.value);
                                            }}
                                            required
                                        />
                                        <div className='my-auto mx-2'>-2023-R-UPLA de fecha</div>
                                        <input
                                            type="date"
                                            className="text-gray-500 h-8 my-auto w-36"
                                            defaultValue={localStorage.getItem('fecha_prov_visto_2')}
                                            onChange={(e) => {
                                                setData('fecha_prov_visto_2', e.target.value);
                                                localStorage.setItem("fecha_prov_visto_2", e.target.value);
                                            }}
                                            required
                                        />
                                    </div>

                                    <hr className='my-4' />
                                    <div className='flex justify-between mb-3'>
                                        <h1 className='font-bold'>CONSIDERANDO</h1>
                                        {listaConsiderando.length == 0 &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_considerando()} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPlus} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex my-2 flex-col pl-4'>
                                        <div className='flex pb-4'>
                                            <p className='w-3/5 my-auto'>Presentado por el(la) señor(a):</p>
                                            <input
                                                type="text"
                                                className="px-4 py-2 text-gray-500 h-10 my-auto mr-2"
                                                placeholder='Código, Nombre, DNI ...'
                                                onChange={(e) => {
                                                    setFilterText(e.target.value);
                                                }}
                                            />
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='w-2/5 block bg-white border h-10'
                                                defaultValue={localStorage.getItem('id_persona')}
                                                onChange={(e) => {
                                                    setData('id_persona', e.target.value);
                                                    localStorage.setItem("id_persona", e.target.value);
                                                }}
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    filteredItems.map(filt => {
                                                        return (
                                                            <option key={filt.id} value={filt.id}>
                                                                {filt.nombre + ' - ' + ' DNI: ' + filt.dni + ' -  Código: ' + filt.codigo}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <hr className='my-4' />
                                    <div className='flex justify-between mb-3'>
                                        <h1 className='font-bold'>SE RESUELVE</h1>
                                        {listaAsuntos.length == 0 &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_asunto()} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPlus} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                    <div className='pl-4'>
                                        <div>
                                            <strong>RECTIFICAR </strong>
                                            la Constancia de Ingreso al Proceso de Admisión
                                        </div>
                                        <div className='mt-2'>
                                            Modalidad de Educación
                                            <input
                                                id='modalidad_educacion'
                                                name='modalidad_educacion'
                                                type="text"
                                                className="p-2 text-gray-500 ml-2"
                                                defaultValue={localStorage.getItem('modalidad_educacion')}
                                                onChange={(e) => {
                                                    setData('modalidad_educacion', e.target.value);
                                                    localStorage.setItem("modalidad_educacion", e.target.value);
                                                }}
                                            />
                                        </div>
                                        <hr className='my-3' />

                                        <div className='mt-2'>
                                            <strong>DICE</strong>
                                            <div className='flex'>
                                                <p className='my-auto mr-2'>Modalidad</p>
                                                <select
                                                    id='id_modalidad_pre'
                                                    name='id_modalidad_pre'
                                                    className='w-2/5 block bg-white border h-10'
                                                    defaultValue={localStorage.getItem('id_modalidad_pre')}
                                                    onChange={(e) => {
                                                        setData('id_modalidad_pre', e.target.value);
                                                        localStorage.setItem("id_modalidad_pre", e.target.value);
                                                    }}
                                                    required
                                                >
                                                    <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                    {
                                                        modalidades.map(mod => {
                                                            return (
                                                                <option key={mod.id_modalidadIngreso} value={mod.id_modalidadIngreso}>
                                                                    {mod.c_nomModalidadIngreso}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <hr className='my-3' />
                                            <strong>DEBE DECIR</strong>
                                            <div className='flex'>
                                                <p className='my-auto mr-2'>Modalidad</p>
                                                <select
                                                    id='id_modalidad_pos'
                                                    name='id_modalidad_pos'
                                                    className='w-2/5 block bg-white border h-10'
                                                    defaultValue={localStorage.getItem('id_modalidad_pos')}
                                                    onChange={(e) => {
                                                        setData('id_modalidad_pos', e.target.value);
                                                        localStorage.setItem("id_modalidad_pos", e.target.value);
                                                    }}
                                                    required
                                                >
                                                    <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                    {
                                                        modalidades.map(mod => {
                                                            return (
                                                                <option key={mod.id_modalidadIngreso} value={mod.id_modalidadIngreso}>
                                                                    {mod.c_nomModalidadIngreso}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                    </div>
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
                            <strong>RESOLUCIÓN DE CONSEJO UNIVERSITARIO
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
                                <div>
                                    <div className='flex text-left text-lg justify-between'>
                                        <strong> VISTOS:</strong>
                                        <Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                            <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                        </Link>
                                    </div>
                                    <div className='my-2 text-justify text-base' >
                                        <div className='grid grid-cols-12 mt-2'>
                                            <div className='col-span-11'>
                                                <p> {localStorage.getItem('visto_resolucion')} </p>
                                            </div>
                                            <div className='col-span-1 flex'>
                                                <Link onClick={() => editar_visto()}
                                                    className='flex m-auto '>
                                                    <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
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
                                    <div className='flex mt-4'>
                                        <strong className='my-auto text-lg'>CONSIDERANDO:</strong>
                                        {/*<Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                       <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                   </Link>*/}
                                    </div>
                                </>
                            }

                            {listaConsiderando.map((considerando) => {

                                return (
                                    <div className='grid grid-cols-12 mt-2' key={considerando.id}>
                                        <div className='col-span-1 flex flex-row'>
                                            <div className='flex w-8 mt-1 mr-2'>
                                                {!estado_lista_considerando_fin(considerando.id) &&
                                                    <Link onClick={() => mover_abajo_considerando(considerando.id)}
                                                        className='flex mx-auto '>
                                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                                    </Link>
                                                }
                                                {!estado_lista_considerando_inicio(considerando.id) &&
                                                    <Link onClick={() => mover_arriba_considerando(considerando.id)}
                                                        className='flex mx-auto '>
                                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                                    </Link>
                                                }
                                            </div>

                                        </div>
                                        <div className='col-span-10 mx-2 text-justify text-base'>
                                            {considerando.descripcion}
                                        </div>
                                        <div className='col-span-1 flex'>
                                            <Link onClick={() => editar_considerando(considerando.id)}
                                                className='flex mx-auto '>
                                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                                            </Link>

                                            <Link onClick={() => eliminar_considerando(considerando.id)}
                                                className='flex mx-auto '>
                                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-red-700" icon={faTrash} />
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            }

                            {
                                listaAsuntos.length != 0 &&
                                <>
                                    <hr className='my-4' />
                                    <div className='flex gap-4 mt-4'>
                                        <strong className='my-auto text-lg'>SE RESUELVE:</strong>

                                    </div>
                                </>
                            }

                            {listaAsuntos.map((asunto, index) => {

                                return (
                                    <div className='grid grid-cols-12 mt-2' key={asunto.cod}>
                                        <div className='col-span-2 flex flex-row'>
                                            <div className='flex w-8 mt-1 mr-2'>
                                                {!estado_lista_asunto_fin(asunto.cod) &&
                                                    <Link onClick={() => mover_abajo_asunto(asunto.cod)}
                                                        className='flex mx-auto '>
                                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                                    </Link>
                                                }
                                                {!estado_lista_asunto_inicio(asunto.cod) &&
                                                    <Link onClick={() => mover_arriba_asunto(asunto.cod)}
                                                        className='flex mx-auto '>
                                                        <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                                    </Link>
                                                }
                                            </div>
                                            <div className='text-base'>
                                                <strong>Art. {index + 1}°</strong>
                                            </div>

                                        </div>
                                        <div className='col-span-9 mx-2 text-justify text-base'>
                                            <strong>{asunto.nombre.toUpperCase()}</strong> {asunto.descripcion}
                                        </div>
                                        <div className='col-span-1 flex'>
                                            <Link onClick={() => editar_asunto(asunto.cod)}
                                                className='flex mx-auto '>
                                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-green-700" icon={faEdit} />
                                            </Link>

                                            <Link onClick={() => eliminar_asunto(asunto.cod)}
                                                className='flex mx-auto '>
                                                <FontAwesomeIcon className="h-5 mx-0.5 hover:text-red-700" icon={faTrash} />
                                            </Link>

                                        </div>
                                    </div>
                                )
                            })

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

export default CambioModalidadIngreso