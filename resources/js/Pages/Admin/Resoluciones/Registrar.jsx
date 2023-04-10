import React, { useState } from 'react'
import Navbar from '@/Layouts/Navbar'
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import TitlePages from '@/Components/Titulo/TitlePages';
import { faArrowAltCircleLeft, faArrowDown, faArrowUp, faEdit, faFileWord, faFolderPlus, faMinus, faPencil, faPersonCirclePlus, faRefresh, faTrash, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import QRCode from "react-qr-code";
import CheckBoxDocumentos from '@/Components/Resolucion/CheckBoxDocumentos';

var listaMiembros = []
var listaAsuntos = []
var listaEncargo = []
var listaConsiderando = []
var listaVisto = []

var id_resolucion = 'DEFAULT'
var id_sesion = 'DEFAULT'
var num_resolucion = ''
var fecha_resolucion = ''
var visto_resolucion = ''

var muestra_tipo_resolucion = ''
var muestra_tipo_sesion = ''
var muestra_fecha = ''

var imagenQR_base64 = ''

localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));

localStorage.setItem("id_resolucion", id_resolucion);
localStorage.setItem("id_sesion", id_sesion);
localStorage.setItem("num_resolucion", num_resolucion);
localStorage.setItem("fecha_resolucion", fecha_resolucion);
localStorage.setItem("visto_resolucion", visto_resolucion);

localStorage.setItem("muestra_tipo_resolucion", muestra_tipo_resolucion);
localStorage.setItem("muestra_tipo_sesion", muestra_tipo_sesion);
localStorage.setItem("muestra_fecha", muestra_fecha);

localStorage.setItem("imagenQR_base64", imagenQR_base64);

const Registrar = ({ auth, persona, tipo_resolucion, tipo_sesion, tipo_asunto, autoridad, documento, tipo_documento }) => {

    const { data, setData, errors, put, progress } = useForm({
        id_persona: '',
        id_tipoSesion: '',
        id_tipoResolucion: '',
        //id_carreraProfesional: '',
        //id_sede: '',
        numeroResolucion: '',
        imagenResolucion: null,
        asuntoResolucion: '',
        vistoResolucion: '',
        fechaResolucion: '',
        alturaImagen: '80',
        id_asunto: '',
        miembros: [0],
        asuntos: [],
        encargo: [],

        imagenQR64: '',
    });

    const [filterText, setFilterText] = useState('');
    const [filterDoc, setFilterDoc] = useState('');

    const [filterAutoridad, setFilterAutoridad] = useState('');
    const [filterTipoDocumento, setFilterTipoDocumento] = useState('');

    const filtroPersona = persona.filter(
        item => item.c_dni.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoP.toLowerCase().includes(filterText.toLowerCase())
            || item.c_apellidoM.toLowerCase().includes(filterText.toLowerCase())
            || item.c_nombres.toLowerCase().includes(filterText.toLowerCase())
    );

    const filtroAutoridad = autoridad.filter(
        item => item.c_nombreAutoridad.toLowerCase().includes(filterAutoridad.toLowerCase())
    );

    const filtroTipoDocumento = documento.filter(
        item => item.id_tipoDocumento.toString() == filterTipoDocumento.toString()
            && (item.num_documento.toLowerCase().includes(filterDoc.toLowerCase())
                || item.subNum_documento.toLowerCase().includes(filterDoc.toLowerCase()))
    );

    function limpiar() {

        localStorage.setItem("listaMiembros", []);
        localStorage.setItem("listaAsuntos", []);
        localStorage.setItem("listaEncargo", []);

        localStorage.setItem("id_resolucion", 'DEFAULT');
        localStorage.setItem("id_sesion", 'DEFAULT');
        localStorage.setItem("num_resolucion", '');
        localStorage.setItem("fecha_resolucion", '');
        localStorage.setItem("visto_resolucion", '');

        localStorage.setItem("muestra_tipo_resolucion", '');
        localStorage.setItem("muestra_tipo_sesion", '');
        localStorage.setItem("muestra_fecha", '');

        listaAsuntos = []
        listaEncargo = []
    }

    function handleSubmit(e) {
        e.preventDefault();

        listaMiembros.map(lis => {
            data.miembros.push(lis.id)
        })

        //guardar png base 64
        if (document.querySelector('#diagram_png').src != '') {
            if (localStorage.getItem('imagenQR_base64') == '') {
                localStorage.setItem("imagenQR_base64", document.querySelector('#diagram_png').src);
            }
        }


        Inertia.post(route('r.resoluciones.store'), {
            _method: 'post',

            id_tipoSesion: localStorage.getItem('id_sesion'),
            id_tipoResolucion: localStorage.getItem('id_resolucion'),
            visto_resolucion: localStorage.getItem('visto_resolucion'),
            //id_carreraProfesional: data.id_carreraProfesional,
            //id_sede: data.id_sede,
            numeroResolucion: localStorage.getItem('num_resolucion'),
            fechaResolucion: localStorage.getItem('fecha_resolucion'),
            miembros: data.miembros,
            asuntos: listaAsuntos,
            //imagen64
            imagenQR64: localStorage.getItem('imagenQR_base64'),
        })

        Swal.fire({
            icon: 'success',
            title: 'Resolución creada',
            showConfirmButton: false,
            timer: 1500,
        })

        limpiar()
    }

    //VISTO
    function agregar_visto() {
        var vistoOficio = ''
        var vistoProveido = ''

        var conteoOficio = 0
        var conteoProveido = 0

        JSON.parse(localStorage.getItem('listaDocumentosSeleccionados')).map(lista => {
            const texto = documento.find(element => element.id_documento == lista.id)
            if (texto.id_tipoDocumento == '1') {
                conteoOficio++
            }
            if (texto.id_tipoDocumento == '2') {
                conteoProveido++
            }
        })

        if (conteoProveido == 1) {
            vistoProveido = 'el proveído '
        } else if (conteoProveido > 1) {
            vistoProveido = 'los Proveídos '
        }

        if (conteoOficio > 0) {
            if (conteoOficio == 1) {
                vistoOficio = 'El Oficio '
            } else {
                vistoOficio = 'Los Oficios '
            }
        } else {
            vistoProveido = vistoProveido.charAt(0).toUpperCase() + vistoProveido.slice(1);
        }

        var contAuxOficio = 1
        var contAuxProveido = 1

        JSON.parse(localStorage.getItem('listaDocumentosSeleccionados')).map(lista => {
            const texto = documento.find(element => element.id_documento == lista.id)
            //console.log(texto)

            if (texto.id_tipoDocumento == '1') {
                // añadir comas e "y" dependiendo de la cantidad de oficios en la cadena
                if (contAuxOficio < conteoOficio - 1) {
                    vistoOficio += texto.num_documento + "-" + texto.subNum_documento + ", "
                }

                if (contAuxOficio == conteoOficio - 1) {
                    vistoOficio += texto.num_documento + "-" + texto.subNum_documento + " y "
                }

                if (contAuxOficio == conteoOficio) {
                    vistoOficio += texto.num_documento + "-" + texto.subNum_documento
                }
                contAuxOficio++
            }

            if (texto.id_tipoDocumento == '2') {

                // añadir comas e "y" dependiendo de la cantidad de oficios en la cadena
                if (contAuxProveido < conteoProveido - 1) {
                    vistoProveido += texto.num_documento + "-" + texto.subNum_documento + ", "
                }

                if (contAuxProveido == conteoProveido - 1) {
                    vistoProveido += texto.num_documento + "-" + texto.subNum_documento + " y "
                }

                if (contAuxProveido == conteoProveido) {
                    vistoProveido += texto.num_documento + "-" + texto.subNum_documento
                }
                contAuxProveido++
            }

            // añadir filtro de REPETIDOS //////////////////////////////////////////////////////////////
            var repetido = listaConsiderando.find(lista => lista.id == texto.id_documento)
            console.log(texto)
            const tipoDoc = tipo_documento.find(doc => doc.id_tipoDocumento == texto.id_tipoDocumento)

            if (!repetido) {
                listaConsiderando.push({
                    'id': texto.id_documento,
                    'descripcion': 'Que, ' + texto.considerando_documento,
                    'tipo': tipoDoc.nombreDocumento,
                    'nombre': texto.num_documento + '-' + texto.subNum_documento
                })
            }

            localStorage.setItem("listaConsiderando", JSON.stringify(listaConsiderando));
        })

        if (conteoOficio > 0 && conteoProveido == 0) {
            localStorage.setItem("visto_resolucion", vistoOficio);
        }

        if (conteoOficio == 0 && conteoProveido > 0) {
            localStorage.setItem("visto_resolucion", vistoProveido);
        }

        if (conteoOficio > 0 && conteoProveido > 0) {
            localStorage.setItem("visto_resolucion", vistoOficio + " ,y " + vistoProveido);
        }
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

    //PARTICIPANTES
    function agregar_participantes(id) {
        if (id) {
            const busqueda = persona.find(element => element.id_persona == id);
            //console.log(busqueda)
            const repetido = listaMiembros.find(lista => lista.id == id);
            if (!repetido) {
                listaMiembros.push({
                    'id': busqueda.id_persona,
                    'codigo': busqueda.c_codMatricula,
                    'nombre': busqueda.c_nombres + ' ' + busqueda.c_apellidoP + ' ' + busqueda.c_apellidoM,
                    'facultad': busqueda.c_nomFacultad,
                })
            }
            localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
        }
    }
    function eliminar_participante(id) {
        var indiceBorrado = listaMiembros.findIndex(item => item.id === id)
        listaMiembros.splice(indiceBorrado, 1)
        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }
    function mover_arriba_participante(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        const aux_pos1 = listaMiembros[indiceItem]
        const aux_pos2 = listaMiembros[indiceItem - 1]

        listaMiembros.splice(indiceItem - 1, 1, aux_pos1)
        listaMiembros.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }
    function mover_abajo_participante(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        const aux_pos1 = listaMiembros[indiceItem]
        const aux_pos2 = listaMiembros[indiceItem + 1]

        listaMiembros.splice(indiceItem + 1, 1, aux_pos1)
        listaMiembros.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaMiembros", JSON.stringify(listaMiembros));
    }
    function estado_lista_miembro_inicio(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_miembro_fin(id) {
        var indiceItem = listaMiembros.findIndex(item => item.id === id)
        if (indiceItem == (listaMiembros.length - 1)) {
            return true
        }
    }

    //ASUNTOS
    function agregar_asunto(cod) {

        var descripcion = data.asuntoResolucion
        var imagen = data.imagenResolucion
        var altura = data.alturaImagen

        if (cod) {
            const busqueda = tipo_asunto.find(element => element.id_tipoAsunto == cod);

            listaAsuntos.push({
                'cod': Date(),
                'id': busqueda.id_tipoAsunto,
                'nombre': busqueda.c_nombreTipoAsunto,
                'descripcion': descripcion,
                'imagen': imagen,
                'altura': altura,
            })

            localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));
        }
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

    //ENCARGOS
    function agregar_encargo(id) {
        if (id) {
            const busqueda = autoridad.find(element => element.id_autoridad == id);
            //console.log(busqueda)
            const repetido = listaEncargo.find(lista => lista.id == id);
            if (!repetido) {
                listaEncargo.push({
                    'id': busqueda.id_autoridad,
                    'articulo': busqueda.c_articuloAutoridad,
                    'nombre': busqueda.c_nombreAutoridad,
                })
            }
            localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
        }
    }
    function eliminar_encargo(id) {
        var indiceBorrado = listaEncargo.findIndex(item => item.id === id)
        listaEncargo.splice(indiceBorrado, 1)
        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function mover_arriba_encargo(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        const aux_pos1 = listaEncargo[indiceItem]
        const aux_pos2 = listaEncargo[indiceItem - 1]

        listaEncargo.splice(indiceItem - 1, 1, aux_pos1)
        listaEncargo.splice(indiceItem, 1, aux_pos2)

        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function mover_abajo_encargo(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        const aux_pos1 = listaEncargo[indiceItem]
        const aux_pos2 = listaEncargo[indiceItem + 1]

        listaEncargo.splice(indiceItem + 1, 1, aux_pos1)
        listaEncargo.splice(indiceItem, 1, aux_pos2)
        localStorage.setItem("listaEncargo", JSON.stringify(listaEncargo));
    }
    function estado_lista_encargo_inicio(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        if (indiceItem == 0) {
            return true
        }
    }
    function estado_lista_encargo_fin(id) {
        var indiceItem = listaEncargo.findIndex(item => item.id === id)
        if (indiceItem == (listaEncargo.length - 1)) {
            return true
        }
    }

    //Descripción de ENCARGO
    var descripcion = ""

    listaEncargo.map(encargo => {
        descripcion += encargo.articulo + " " + encargo.nombre + ", "
    })
    descripcion += "y demás Instancias Académicas y Administrativas, el cumplimiento de la presente Resolución."

    //Agregar ASUNTO - ENCARGO
    function agregar_asunto_encargo() {

        var descripcion_asunto = descripcion

        listaAsuntos.push({
            'cod': Date(),
            'id': 3,
            'nombre': 'ENCARGAR',
            'descripcion': descripcion_asunto,
            'imagen': null,
            'altura': '',
        })

        localStorage.setItem("listaAsuntos", JSON.stringify(listaAsuntos));

    }

    //MUESTRA DE PREVISUALIZACION
    if (localStorage.getItem('id_sesion') != '') {
        const busqueda = tipo_sesion.find(element => element.id_tipoSesion == localStorage.getItem('id_sesion'));
        busqueda &&
            localStorage.setItem("muestra_tipo_sesion", busqueda.nombreSesion);
    }

    if (localStorage.getItem('id_resolucion') != '') {
        const busqueda = tipo_resolucion.find(element => element.id_tipoResolucion == localStorage.getItem('id_resolucion'));
        busqueda &&
            localStorage.setItem("muestra_tipo_resolucion", busqueda.nombreTipoResolucion);
    }

    if (localStorage.getItem('fecha_resolucion') != '') {
        localStorage.setItem("muestra_fecha", data.fechaResolucion.replaceAll('-', '.'));
    }

    function mostrar_sesion(id) {
        const busqueda = tipo_sesion.find(element => element.id_tipoSesion == id);
        if (busqueda) {
            return busqueda.nombreSesion
        }
    }

    function mostrar_resolucion(id) {
        const busqueda = tipo_resolucion.find(element => element.id_tipoResolucion == id);
        if (busqueda) {
            return busqueda.nombreTipoResolucion
        }
    }

    function fecha(id) {
        if (id) {
            return id.replaceAll('-', '.')
        }
    }
    function numeroResolucion(id) {
        return id.padStart(4, '0000')
    }
    function yearFecha(id) {
        return id.slice(0, 4)
    }
    function acronimoResolucion(id) {
        const busqueda = tipo_resolucion.find(element => element.id_tipoResolucion == id);
        if (busqueda) {
            return busqueda.acronimoTipoResolucion
        }
    }

    function textoCodigoQR() {
        var texto = ''

        if (localStorage.getItem('num_resolucion') != '') {
            texto += numeroResolucion(localStorage.getItem('num_resolucion'))
        }

        if (localStorage.getItem('fecha_resolucion') != '') {
            texto += '-' + yearFecha(localStorage.getItem('fecha_resolucion'))
        }

        if (localStorage.getItem('id_resolucion') != 'DEFAULT') {
            texto += '-' + acronimoResolucion(localStorage.getItem('id_resolucion'))
        }

        if (localStorage.getItem('fecha_resolucion') != '') {
            texto += ' ' + fecha(localStorage.getItem('fecha_resolucion'))
        }

        return texto
    }

    var codigo_qr = textoCodigoQR()

    if (localStorage.getItem('num_resolucion') != '' && localStorage.getItem('fecha_resolucion') != '' && localStorage.getItem('id_resolucion') != 'DEFAULT') {

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

    if (localStorage.getItem('listaDocumentosSeleccionados') != []) {
        listaVisto = JSON.parse(localStorage.getItem('listaDocumentosSeleccionados'))
    }

    //console.log(listaVisto)
    //console.log(JSON.parse(localStorage.getItem('listaDocumentosSeleccionados')))

    return (
        <Navbar auth={auth}>
            <Head title="Resoluciones" />
            <div className='w-full flex justify-between mt-10 mb-5'>
                <TitlePages texto={'Registrar Resolución'} icono={faFileWord} />
                <div className="flex items-center justify-between mb-6">
                    <Link className="pr-5 pl-3 py-2 text-white bg-[#007CBC] rounded-md focus:outline-none hover:bg-[#0064bc]"
                        onClick={() => limpiar()}
                        href={route('r.resoluciones')}
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
                                <div className="">
                                    {/* Miembros Resolucion */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Estudiante </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar por Nombre o DNI"
                                                onChange={(e) => setFilterText(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex flex-col my-auto col-span-5">
                                            <select
                                                id='id_persona'
                                                name='id_persona'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_persona', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    filtroPersona.map(per => {
                                                        return (
                                                            <option key={per.id_persona} value={per.id_persona}>{per.c_apellidoP + " " + per.c_apellidoM + ", " + per.c_nombres + " - " + per.c_dni}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="flex flex-col my-auto col-span-1 text-slate-400">
                                            <Link onClick={() => agregar_participantes(data.id_persona)} className='flex m-auto hover:text-slate-600'>
                                                <FontAwesomeIcon className="h-6" icon={faUserPlus} />
                                            </Link>
                                        </div>
                                    </div>
                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaMiembros.length != 0 &&
                                        <div className='my-2'>
                                            <label className="my-auto text-lg text-slate-400"> <strong>Lista de Estudiantes Seleccionados</strong> </label>
                                            <div className="flex flex-col my-auto">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400 text-center'>
                                                            <th></th>
                                                            <th>Código</th>
                                                            <th>Facultad</th>
                                                            <th>Nombre Completo</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaMiembros.map((miembro) =>
                                                                <tr key={miembro.id} className="">
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto h-6 text-slate-400'>
                                                                            {!estado_lista_miembro_fin(miembro.id) ?
                                                                                <Link onClick={() => mover_abajo_participante(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }
                                                                            {!estado_lista_miembro_inicio(miembro.id) ?
                                                                                <Link onClick={() => mover_arriba_participante(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.codigo}</td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.facultad}</td>
                                                                    <td className='text-left pl-4 border-slate-400 border-[1px]'>{miembro.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto text-red-500'>
                                                                            <Link onClick={() => eliminar_participante(miembro.id)} className='flex m-auto w-7 h-6'>
                                                                                <FontAwesomeIcon className="m-auto h-4 hover:text-red-800" icon={faUserMinus} />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>
                                    }

                                    <hr className="my-4" />
                                    <div className='flex gap-4'>
                                        <strong className="my-auto">Resolución: </strong>
                                    </div>
                                    {/* Tipo de Sesión - Resolución*/}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">Tipo Sesión </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <select
                                                id='id_tipoSesion'
                                                name='id_tipoSesion'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={localStorage.getItem('id_sesion')}
                                                onChange={(e) => {
                                                    setData('id_tipoSesion', e.target.value)
                                                    localStorage.setItem("id_sesion", e.target.value);
                                                }}
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_sesion.map(ses => {
                                                        return (
                                                            <option key={ses.id_tipoSesion} value={ses.id_tipoSesion}>{ses.nombreSesion}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <label className="col-span-2 my-auto">Tipo Resolución </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <select
                                                id='id_tipoResolucion'
                                                name='id_tipoResolucion'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={localStorage.getItem('id_resolucion')}
                                                onChange={(e) => {
                                                    setData('id_tipoResolucion', e.target.value);
                                                    localStorage.setItem("id_resolucion", e.target.value);
                                                }}
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_resolucion.map(res => {
                                                        return (
                                                            <option key={res.id_tipoResolucion} value={res.id_tipoResolucion}>{res.nombreTipoResolucion}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {/* Número y Fecha de Resolución */}
                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <label className="col-span-2 my-auto">N° Resolución </label>
                                        <div className="flex flex-col my-auto col-span-4" id='fecha-input'>
                                            <input
                                                type="number"
                                                min="1" max="999"
                                                className="w-full px-4 py-2 text-gray-500"
                                                defaultValue={localStorage.getItem('num_resolucion')}
                                                onChange={(e) => {
                                                    setData('numeroResolucion', e.target.value);
                                                    localStorage.setItem("num_resolucion", e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                        <label className="col-span-2 my-auto mx-auto">Fecha </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="date"
                                                className="w-full px-4 py-2 text-gray-500"
                                                defaultValue={localStorage.getItem('fecha_resolucion')}
                                                onChange={(e) => {
                                                    setData('fechaResolucion', e.target.value);
                                                    localStorage.setItem("fecha_resolucion", e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    {/* Asunto Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Visto: </strong>
                                        <Link className='text-green-600 hover:text-green-700 h-7 w-7 flex'>
                                            <FontAwesomeIcon className="h-6 m-auto" icon={faFolderPlus} />
                                        </Link>

                                    </div>

                                    {/*<div className='grid grid-cols-12 gap-4 my-4'>

                                        <div className="flex flex-col col-span-12">
                                            <textarea
                                                type="text"
                                                className="p-2 text-gray-500 h-20"
                                                defaultValue={localStorage.getItem('visto_resolucion')}
                                                onChange={(e) =>
                                                    setData('vistoResolucion', e.target.value)
                                                }
                                            ></textarea>

                                        </div>
                                    </div> */}
                                    <div className='grid grid-cols-4 gap-2 my-4'>
                                        <div className="flex flex-col col-span-1">
                                            <select
                                                id='id_tipo_documento'
                                                name='id_tipo_documento'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setFilterTipoDocumento(e.target.value)
                                                }
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_documento.map(tip => {
                                                        return (
                                                            <option key={tip.id_tipoDocumento} value={tip.id_tipoDocumento}>{tip.nombreDocumento}</option>
                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>
                                        <div className='col-span-1'></div>
                                        <div className="flex flex-col col-span-2">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Filtro documento"
                                                onChange={(e) => setFilterDoc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3 grid grid-cols-2">
                                        {filtroTipoDocumento.map(doc => {
                                            return (
                                                <CheckBoxDocumentos key={doc.id_documento} documento={doc} tipo_documento={tipo_documento} />
                                            )
                                        })}
                                    </div>
                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaVisto.length != 0 &&
                                        <div className='my-2'>
                                            <div className='flex justify-between'>
                                                <label className="my-auto text-lg text-slate-400">
                                                    <strong>Lista de Vistos seleccionados</strong>
                                                </label>
                                                {
                                                    listaVisto.length != 0 &&
                                                    <div className="flex text-white ">
                                                        <Link onClick={() => agregar_visto()} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                            <div className='m-auto'>
                                                                <strong className=' mr-2'>
                                                                    {
                                                                        localStorage.getItem('visto_resolucion') == '' ?
                                                                            'Agregar'
                                                                            :
                                                                            'Editar'

                                                                    } </strong>
                                                                <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                }
                                            </div>

                                            <div className="flex flex-col my-auto">
                                                <table className="table-fixed mt-4">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400 text-center'>
                                                            <th></th>
                                                            <th>Tipo</th>
                                                            <th>Documento</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaVisto.map((doc) =>
                                                                <tr key={doc.id} className="">
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto h-6 text-slate-400'>
                                                                            {!estado_lista_encargo_fin(doc.id) ?
                                                                                <Link onClick={() => mover_abajo_encargo(doc.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }
                                                                            {!estado_lista_encargo_inicio(doc.id) ?
                                                                                <Link onClick={() => mover_arriba_encargo(doc.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{doc.tipo}</td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{doc.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto text-red-500'>
                                                                            <Link onClick={() => eliminar_encargo(doc.id)} className='flex m-auto w-7 h-6'>
                                                                                <FontAwesomeIcon className="m-auto h-4 hover:text-red-800" icon={faUserMinus} />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>

                                    }

                                    <hr className="my-4" />

                                    {/* Asunto Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Se resuelve: </strong>
                                        {
                                            (data.id_asunto != '') &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_asunto(data.id_asunto)} className='flex mx-auto bg-green-600 hover:bg-green-800 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>Agregar </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </div>

                                    <div className='grid grid-cols-12 gap-4 my-4'>
                                        <div className="flex flex-col col-span-3">
                                            <select
                                                id='id_asunto'
                                                name='id_asunto'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_asunto', e.target.value)
                                                }
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    tipo_asunto.map(tip => {
                                                        return (
                                                            <option key={tip.id_tipoAsunto} value={tip.id_tipoAsunto}>{tip.c_nombreTipoAsunto}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>


                                        <div className="flex flex-col col-span-9">
                                            <textarea
                                                type="text"
                                                className="p-2 text-gray-500 h-20"
                                                onChange={(e) =>
                                                    setData('asuntoResolucion', e.target.value)
                                                }

                                            ></textarea>
                                            {
                                                data.id_asunto == 1 &&
                                                <div className='grid grid-cols-12 gap-4 my-4'>
                                                    <label className="col-span-2 my-auto">Imagen </label>
                                                    <div className="flex flex-col col-span-6 border-[1px] border-current">
                                                        <input
                                                            type="file"
                                                            className="w-full px-4 py-2"
                                                            onChange={(e) =>
                                                                setData("imagenResolucion", e.target.files[0])
                                                            }
                                                        />
                                                    </div>
                                                    {/*<label className="col-span-2 my-auto text-right">Altura(px) </label>
                                                    <div className="flex flex-col col-span-2">
                                                        <input
                                                            type="number"
                                                            className="w-full px-4 py-2"
                                                            defaultValue={80}
                                                            min={40}
                                                            onChange={(e) =>
                                                                setData("alturaImagen", e.target.value)
                                                            }
                                                        />
                                                    </div>*/}
                                                </div>
                                            }
                                        </div>

                                    </div>

                                    <hr className="my-4" />

                                    {/* Encargo Resolucion */}
                                    <div className='flex justify-between '>
                                        <strong className="my-auto">Se Encarga: </strong>
                                        {
                                            listaEncargo.length != 0 &&
                                            <div className="flex text-white ">
                                                <Link onClick={() => agregar_asunto_encargo()}
                                                    className='flex mx-auto bg-yellow-500 hover:bg-yellow-600 h-9 w-28 rounded-lg'>
                                                    <div className='m-auto'>
                                                        <strong className=' mr-2'>
                                                            Agregar
                                                        </strong>
                                                        <FontAwesomeIcon className="m-auto h-4" icon={faPencil} />
                                                    </div>
                                                </Link>
                                            </div>
                                        }

                                    </div>

                                    {/* TABLA DE MIEMBROS*/}
                                    {
                                        listaEncargo.length != 0 &&
                                        <div className='my-2'>
                                            <label className="my-auto text-lg text-slate-400"> <strong>Lista de Autoridades Seleccionadas</strong> </label>
                                            <div className="flex flex-col my-auto">
                                                <hr />
                                                <table className="table-fixed">
                                                    <thead className='bg-slate-400 text-white h-6'>
                                                        <tr className='font-bold border-2 border-slate-400 text-center'>
                                                            <th></th>
                                                            <th>Descripción</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listaEncargo.map((miembro) =>
                                                                <tr key={miembro.id} className="">
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto h-6 text-slate-400'>
                                                                            {!estado_lista_encargo_fin(miembro.id) ?
                                                                                <Link onClick={() => mover_abajo_encargo(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowDown} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }
                                                                            {!estado_lista_encargo_inicio(miembro.id) ?
                                                                                <Link onClick={() => mover_arriba_encargo(miembro.id)}
                                                                                    className='flex m-auto '>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5 hover:text-blue-700" icon={faArrowUp} />
                                                                                </Link>
                                                                                :
                                                                                <p className='flex m-auto'>
                                                                                    <FontAwesomeIcon className="h-4 mx-0.5" icon={faMinus} />
                                                                                </p>
                                                                            }

                                                                        </div>
                                                                    </td>
                                                                    <td className='text-center border-slate-400 border-[1px]'>{miembro.nombre}</td>
                                                                    <td className='border-slate-400 border-[1px]'>
                                                                        <div className='flex m-auto text-red-500'>
                                                                            <Link onClick={() => eliminar_encargo(miembro.id)} className='flex m-auto w-7 h-6'>
                                                                                <FontAwesomeIcon className="m-auto h-4 hover:text-red-800" icon={faUserMinus} />
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                                <hr />
                                            </div>
                                        </div>
                                    }

                                    <div className='grid grid-cols-12 gap-2 col-span-9 mt-5'>
                                        <label className="col-span-2 my-auto">Autoridad: </label>
                                        <div className="flex flex-col my-auto col-span-4">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 text-gray-500"
                                                placeholder="Buscar"
                                                onChange={(e) => setFilterAutoridad(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex flex-col my-auto col-span-5">
                                            <select
                                                id='id_autoridad'
                                                name='id_autoridad'
                                                className='block w-full bg-white border h-10'
                                                defaultValue={'DEFAULT'}
                                                onChange={(e) =>
                                                    setData('id_autoridad', e.target.value)
                                                }
                                                required
                                            >
                                                <option className='text-gray-400 bold' value="DEFAULT" disabled>Seleccionar</option>
                                                {
                                                    filtroAutoridad.map(aut => {
                                                        return (
                                                            <option key={aut.id_autoridad} value={aut.id_autoridad}>{aut.c_nombreAutoridad}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="flex flex-col my-auto col-span-1 text-slate-400">
                                            <Link onClick={() => agregar_encargo(data.id_autoridad)}
                                                className='flex m-auto hover:text-slate-600'>
                                                <FontAwesomeIcon className="h-8 w-10" icon={faPersonCirclePlus} />
                                            </Link>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

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
                            <strong>RESOLUCIÓN
                                {(localStorage.getItem('id_resolucion') != '' && mostrar_resolucion(localStorage.getItem('id_resolucion'))) &&
                                    ` DE ${mostrar_resolucion(localStorage.getItem('id_resolucion')).toUpperCase()}`
                                }
                                {
                                    localStorage.getItem('num_resolucion') != '' &&
                                    '  N° ' + numeroResolucion(localStorage.getItem('num_resolucion'))
                                }
                                {
                                    localStorage.getItem('fecha_resolucion') != '' &&
                                    '-' + yearFecha(localStorage.getItem('fecha_resolucion'))
                                }
                                {
                                    localStorage.getItem('id_resolucion') != 'DEFAULT' &&
                                    '-' + acronimoResolucion(localStorage.getItem('id_resolucion'))
                                }

                            </strong>
                        </div>
                        {
                            data.fechaResolucion &&
                            <div className='my-2 text-right'>
                                <label>Huancayo, {fecha(localStorage.getItem('fecha_resolucion'))}</label>
                            </div>
                        }

                        {
                            (localStorage.getItem('visto_resolucion') != '' && localStorage.getItem('id_resolucion') != 'DEFAULT' && localStorage.getItem('id_sesion') != 'DEFAULT' && localStorage.getItem('fecha_resolucion') != '') &&
                            <div>
                                <div>
                                    <strong> VISTOS:</strong>
                                </div>
                                <div className='my-2 text-justify' >
                                    <p>{localStorage.getItem('visto_resolucion')} y el acuerdo de {mostrar_resolucion(localStorage.getItem('id_resolucion'))} en Sesión {mostrar_sesion(localStorage.getItem('id_sesion'))} de fecha {fecha(localStorage.getItem('fecha_resolucion'))}, respectivamente; y,
                                    </p>
                                </div>
                            </div>
                        }

                        {
                            (listaAsuntos.length == 0 && listaAsuntos.length == 0) &&
                            <div className='flex w-full h-8 bg-slate-500 text-center text-white justify-center'>
                                <strong className='m-auto'>VISTA PREVIA</strong>
                            </div>
                        }



                        {
                            listaConsiderando.length != 0 &&
                            <>
                                <hr className='my-4' />
                                <div className='flex mt-4'>
                                    <strong className='my-auto'>CONSIDERANDO:</strong>
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
                                    <div className='col-span-10 mx-2 text-justify'>
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
                                    <strong className='my-auto'>SE RESUELVE:</strong>
                                    <Link className='rounded-full bg-green-600 hover:bg-green-700 text-white h-7 w-7 flex'>
                                        <FontAwesomeIcon className="h-4 m-auto" icon={faRefresh} />
                                    </Link>
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
                                        <div className=''>
                                            <strong>Art. {index + 1}°</strong>
                                        </div>

                                    </div>
                                    <div className='col-span-9 mx-2 text-justify'>
                                        <strong>{asunto.nombre.toUpperCase()}</strong> {asunto.descripcion}
                                        {
                                            asunto.imagen &&
                                            <div className=''>
                                                <img src={`${URL.createObjectURL(asunto.imagen)}`} style={{ width: '100%', height: asunto.altura + "px" }} />
                                            </div>
                                        }

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
            </div >
        </Navbar >
    )
}

export default Registrar