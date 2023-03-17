<?php

use App\Http\Controllers\AdminController;
//use App\Http\Controllers\AdminSoftwareController;
//use App\Http\Controllers\AdminEspecificacionEquipoController;
//use App\Http\Controllers\AdminEspecificacionSoftwareController;
//use App\Http\Controllers\AdminTipoEquipoController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
//use App\Http\Controllers\TipoEquipoController;
//use App\Http\Controllers\UserTipoEquipoController;
//use App\Http\Controllers\SoftwareController;
//use App\Http\Controllers\AdminUsoEquipoController;
//use App\Http\Controllers\InfoSoftwareController;

//use App\Http\Controllers\AdminSolicitudController;
//use App\Http\Controllers\AdminNotificacionController;

//use App\Http\Controllers\SecretariaSolicitudController;
//use App\Http\Controllers\JefaturaSolicitudController;

//Estado no adeudo especifico
//use App\Http\Controllers\ArchivoEstudiantilController;
//use App\Http\Controllers\DursController;
//use App\Http\Controllers\FacultadesController;
//use App\Http\Controllers\OefcController;

//use App\Http\Controllers\CartEquipoController;
//use App\Http\Controllers\EspecificacionEquipoController;
//use App\Http\Controllers\NotificacionController;
//use App\Http\Controllers\OficinaController;
//use App\Http\Controllers\RolController;
//use App\Http\Controllers\SolicitudController;
//use App\Http\Controllers\UserController;
//use App\Http\Controllers\UserSoftwareController;
//use App\Http\Controllers\UserSolicitudController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
//
//use App\Http\Controllers\DemoController;

//sistema resoluciones
use App\Http\Controllers\ResolucionController;

use App\Http\Controllers\AdendaController;
use App\Http\Controllers\AsuntoController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\ConvenioController;

use App\Http\Controllers\TipoController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\CuentaUsuarioController;
//
use App\Mail\EnviarConfirmacionMailable;
use Illuminate\Support\Facades\Mail;

//RUTA INICIO
Route::get('/', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

// //

//RUTAS SOLO ADMIN
Route::middleware(['auth','verified','soloadmin'])->group(function () {
    /* Route::get('/resoluciones-upla',[AdminController::class,'index']
     )->name('admin');

     Route::get('/resoluciones-upla/exportReporte',[AdminController::class,'generarReporte']
     )->name('reporte'); */

    Route::controller(AdminController::class)->group(function (){
       Route::get('/resoluciones-upla', 'index')->name('admin');
       //Route::get('/resoluciones-upla/exportReporte', 'generarReporte')->name('reporte');
    });


    /*Route::controller(AdminSolicitudController::class)->group(function (){
        Route::get('/resoluciones-upla/solicitudes', 'index')->name('d.solicituds');
        //Route::get('/resoluciones-upla/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        //
        Route::get('/resoluciones-upla/pagos/{id}', 'show')->name('d.solicituds.show');
        //
        Route::post('/resoluciones-upla/solicitudes/aceptar/{id}', 'aceptar_solicitud')->name('d.solicituds.aceptar_solicitud');
        Route::get('/resoluciones-upla/solicitudes/rechazar/{id}', 'rechazar_solicitud')->name('d.solicituds.rechazar_solicitud');
        //
        Route::post('/resoluciones-upla/solicitudes/validar_constancia/{id}', 'validar_constancia')->name('d.solicituds.validar_constancia');
        Route::get('/resoluciones-upla/solicitudes/rechazar_constancia/{id}', 'rechazar_constancia')->name('d.solicituds.rechazar_constancia');

        Route::get('/resoluciones-upla/solicitudes/ver/{id}', 'viewDocument')->name('d.solicituds.ver');
        //
        Route::get('/resoluciones-upla/exportWord/{id}', 'wordExport')->name('d.solicituds.wordExport');

        Route::get('/resoluciones-upla/generarConstancia/{id}', 'generarConstanciaPDF')->name('d.solicituds.generarConstanciaPDF');


        Route::get('/resoluciones-upla/inicio/{id}', 'viewDocument')->name('d.solicituds.ver');

        Route::get('/resoluciones-upla/solicitudes/estado/{id}', 'mostrarEstado')->name('d.solicituds.estado');

        Route::get('/resoluciones-upla/solicitud/estado/{id}', 'mostrarEstadoPendRech')->name('d.solicituds.estadoPR');

    });

    Route::controller(SecretariaSolicitudController::class)->group(function (){
        Route::get('/resoluciones-upla/secretaria/solicitudes', 'index')->name('d.solicitud.secretaria');

        Route::put('/resoluciones-upla/secretaria/solicitudes/aceptar/{id}', 'aceptar_solicitud')->name('d.solicitud.secretaria.aceptar_solicitud');
        Route::put('/resoluciones-upla/secretaria/solicitudes/rechazar/{id}', 'rechazar_solicitud')->name('d.solicitud.secretaria.rechazar_solicitud');
        //Route::put('/resoluciones-upla/secretaria/solicitudes/comentario/{id}', 'agregar_comentario')->name('d.solicitud.secretaria.agregar_comentario');
        //Route::get('/resoluciones-upla/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        Route::get('/resoluciones-upla/secretaria/solicitudes/mostrar/{id}', 'show')->name('d.solicituds.secretaria.show');
    });

    Route::controller(JefaturaSolicitudController::class)->group(function (){
        Route::get('/resoluciones-upla/jefatura/solicitudes', 'index')->name('d.solicitud.jefatura');

        //Route::get('/resoluciones-upla/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        Route::put('/resoluciones-upla/jefatura/validar_constancia/{id}', 'validar_constancia')->name('d.solicitud.jefatura.validar_constancia');

        //Route::get('/resoluciones-upla/jefatura/rechazar_constancia/{id}', 'rechazar_constancia')->name('d.solicitud.jefatura.rechazar_constancia');

        Route::post('/resoluciones-upla/jefatura/generar_barcode/{id}', 'generarBarcode')->name('d.solicitud.jefatura.generar_barcode');

        Route::get('/resoluciones-upla/jefatura/generarConstancia/{id}', 'generarConstanciaPDF')->name('d.solicituds.jefatura.generarConstanciaPDF');

        Route::get('/resoluciones-upla/jefatura/inicio/AE/{id}', 'viewRequisitoAE')->name('d.solicituds.requisito.revisarAE');
        Route::get('/resoluciones-upla/jefatura/inicio/FAC/{id}', 'viewRequisitoFac')->name('d.solicituds.requisito.revisarFac');
        Route::get('/resoluciones-upla/jefatura/inicio/OEF/{id}', 'viewRequisitoOEF')->name('d.solicituds.requisito.revisarOEF');
        Route::get('/resoluciones-upla/jefatura/inicio/PAI/{id}', 'viewRequisitoPAI')->name('d.solicituds.requisito.revisarPAI');

    });

    Route::controller(ArchivoEstudiantilController::class)->group(function (){
        Route::get('/archivo-estudiantil/no-adeudo/pendiente', 'index')->name('d.archivoEstudiantil');
        Route::get('/archivo-estudiantil/no-adeudo/mostrar/{id}', 'show')->name('d.archivoEstudiantil.mostrar');
        Route::get('/archivo-estudiantil/no-adeudo/validado', 'estado_validado')->name('d.archivoEstudiantil.validado');
        Route::put('/archivo-estudiantil/no-adeudo/validar/{id}', 'validar_ArchivoEstudiantil')->name('d.archivoEstudiantil.validarAE');
        Route::put('/archivo-estudiantil/no-adeudo/notificar/{id}', 'notificar_estudianteAE')->name('d.archivoEstudiantil.notificarAE');
    });

    Route::controller(DursController::class)->group(function (){
        Route::get('/durs/no-adeudo/pendiente', 'index')->name('d.durs');

        Route::get('/durs/no-adeudo/mostrar/{id}', 'show')->name('d.durs.mostrar');
        Route::get('/durs/no-adeudo/validado', 'estado_validado')->name('d.durs.validado');
        Route::put('/durs/no-adeudo/validar/{id}', 'validar_Durs')->name('d.durs.validarPai');
        //Route::put('/durs/no-adeudo/notificar/{id}', 'notificar_estudiantePai')->name('d.durs.notificarPai');
    });

    Route::controller(FacultadesController::class)->group(function (){
        Route::get('/facultades/no-adeudo/pendiente', 'index')->name('d.facultades');

        Route::get('/facultades/no-adeudo/mostrar/{id}', 'show')->name('d.facultades.mostrar');
        Route::get('/facultades/no-adeudo/validado', 'estado_validado')->name('d.facultades.validado');
        Route::put('/facultades/no-adeudo/validar/{id}', 'validar_Fac')->name('d.facultades.validarFac');
        //Route::put('/facultades/no-adeudo/notificar/{id}', 'notificar_estudianteAE')->name('d.facultades.notificarFac');
    });

    Route::controller(OefcController::class)->group(function (){
        Route::get('/oefc/no-adeudo/pendiente', 'index')->name('d.oefc');

        Route::get('/oefc/no-adeudo/mostrar/{id}', 'show')->name('d.oefc.mostrar');
        Route::get('/oefc/no-adeudo/validado', 'estado_validado')->name('d.oefc.validado');
        Route::put('/oefc/no-adeudo/validar/{id}', 'validar_Oefc')->name('d.oefc.validarOefc');
        //Route::put('/oefc/no-adeudo/notificar/{id}', 'notificar_estudianteOEF')->name('d.oefc.notificarOefc');
    });

    /* Route::controller(AdminNotificacionController::class)->group(function (){
        Route::get('/resoluciones-upla/noti','index')->name('notificacion.index');
    }); */
    Route::controller(ResolucionController::class)->group(function (){
        Route::get('/resoluciones-upla/resoluciones', 'index')->name('r.resoluciones');
        Route::get('/resoluciones-upla/resoluciones/registrar','create')->name('r.resoluciones.registrar');
        Route::post('/resoluciones-upla/resoluciones/store','store')->name('r.resoluciones.store');
        //Descargar
        Route::get('/resoluciones-upla/resoluciones/descargar/{id}','descargarResolucion')->name('r.resoluciones.descargar');
    });

    Route::controller(AdendaController::class)->group(function (){
        Route::get('/resoluciones-upla/adendas', 'index')->name('r.adendas');
        //
    });

    Route::controller(AsuntoController::class)->group(function (){
        Route::get('/resoluciones-upla/asuntos', 'index')->name('r.asuntos');
        //
    });

    Route::controller(ContratoController::class)->group(function (){
        Route::get('/resoluciones-upla/contratos', 'index')->name('r.contratos');
        //
    });

    Route::controller(ConvenioController::class)->group(function (){
        Route::get('/resoluciones-upla/convenios', 'index')->name('r.convenios');
        //
    });

    Route::controller(TipoController::class)->group(function (){
        //Tipo Resolucion
        Route::get('/resoluciones-upla/tipos/resoluciones', 'indexResolucion')->name('t.tipoResolucion');
        Route::put('/resoluciones-upla/tipos/resoluciones/update/{id}','updateResolucion')->name('t.tipoResolucion.update');
        Route::post('/resoluciones-upla/tipos/resoluciones/store','createResolucion')->name('t.tipoResolucion.create');
        Route::delete('/resoluciones-upla/tipos/resoluciones/delete/{id}','deleteResolucion')->name('t.tipoResolucion.delete');

        //Tipo Sesion
        Route::get('/resoluciones-upla/tipos/sesiones', 'indexSesion')->name('t.tipoSesion');
        Route::put('/resoluciones-upla/tipos/sesiones/update/{id}','updateSesion')->name('t.tipoSesion.update');
        Route::post('/resoluciones-upla/tipos/sesiones/store','createSesion')->name('t.tipoSesion.create');
        Route::delete('/resoluciones-upla/tipos/sesiones/delete/{id}','deleteSesion')->name('t.tipoSesion.delete');

        //Tipo Persona
        Route::get('/resoluciones-upla/tipos/personas', 'indexPersona')->name('t.tipoPersona');
        Route::put('/resoluciones-upla/tipos/personas/update/{id}','updatePersona')->name('t.tipoPersona.update');
        Route::post('/resoluciones-upla/tipos/personas/store','createPersona')->name('t.tipoPersona.create');
        Route::delete('/resoluciones-upla/tipos/personas/delete/{id}','deletePersona')->name('t.tipoPersona.delete');
    });

    Route::controller(PersonalController::class)->group(function (){
        //Administrativos
        Route::get('/resoluciones-upla/personal/administrativos', 'indexAdministrador')->name('p.personalAdministrador');
        Route::put('/resoluciones-upla/personal/administrativos/update/{id}','updateAdministrador')->name('p.personalAdministrador.update');
        Route::post('/resoluciones-upla/personal/administrativos/store','createAdministrador')->name('p.personalAdministrador.create');
        Route::delete('/resoluciones-upla/personal/administrativos/delete/{id}','deleteAdministrador')->name('p.personalAdministrador.delete');

        //Docentes
        Route::get('/resoluciones-upla/personal/docentes', 'indexDocente')->name('p.personalDocente');
        Route::put('/resoluciones-upla/personal/docentes/update/{id}','updateDocente')->name('p.personalDocente.update');
        Route::post('/resoluciones-upla/personal/docentes/store','createDocente')->name('p.personalDocente.create');
        Route::delete('/resoluciones-upla/personal/docentes/delete/{id}','deleteDocente')->name('p.personalDocente.delete');

        //Estudiantes
        Route::get('/resoluciones-upla/personal/estudiantes', 'indexEstudiante')->name('p.personalEstudiante');
    });

    Route::controller(CuentaUsuarioController::class)->group(function (){
        //Lista Usuarios
        Route::get('/resoluciones-upla/usuarios', 'indexUser')->name('u.usuarioCuenta');
        Route::put('/resoluciones-upla/usuarios/update/{id}','updateUser')->name('u.usuarioCuenta.update');
        Route::post('/resoluciones-upla/usuarios/store','createUser')->name('u.usuarioCuenta.create');
        Route::delete('/resoluciones-upla/usuarios/delete/{id}','deleteUser')->name('u.usuarioCuenta.delete');

        //Usuario personal
        Route::get('/resoluciones-upla/usuario/personal', 'indexUserPersonal')->name('u.usuarioPersonal');
        Route::put('/resoluciones-upla/usuarios/update','updateUserPersonal')->name('u.usuarioPersonal.update');
    });

    /*Route::controller(RolController::class)->group(function (){
        Route::get('/resoluciones-upla/roles','index')->name('d.roles.index');
        Route::get('/resoluciones-upla/roles/create','create')->name('d.roles.create');
        Route::post('/resoluciones-upla/roles/store','store')->name('d.roles.store');
        Route::get('/resoluciones-upla/roles/edit/{id}','edit')->name('d.roles.edit');
        Route::put('/resoluciones-upla/roles/update/{id}','update')->name('d.roles.update');
        Route::delete('/resoluciones-upla/roles/{id}','destroy')->name('d.roles.destroy');
    });

    Route::controller(OficinaController::class)->group(function (){
        Route::get('/resoluciones-upla/oficinas','index')->name('d.oficinas.index');
        Route::get('/resoluciones-upla/oficinas/create','create')->name('d.oficinas.create');
        Route::post('/resoluciones-upla/oficinas/store','store')->name('d.oficinas.store');
        Route::get('/resoluciones-upla/oficinas/edit/{id}','edit')->name('d.oficinas.edit');
        Route::put('/resoluciones-upla/oficinas/update/{id}','update')->name('d.oficinas.update');
        Route::delete('/resoluciones-upla/oficinas/{id}','destroy')->name('d.oficinas.destroy');
    });
    Route::controller(UserController::class)->group(function (){
        Route::get('/resoluciones-upla/usuarios','index')->name('d.usuarios.index');
        Route::get('/resoluciones-upla/usuarios/create','create')->name('d.usuarios.create');
        Route::post('/resoluciones-upla/usuarios/store','store')->name('d.usuarios.store');
        Route::get('/resoluciones-upla/usuarios/edit/{id}','edit')->name('d.usuarios.edit');
        Route::put('/resoluciones-upla/usuarios/update/{id}','update')->name('d.usuarios.update');
        Route::delete('/resoluciones-upla/usuarios/{id}','destroy')->name('d.usuarios.destroy');
        Route::get('/resoluciones-upla/usuarios/excel','exportExcel')->name('excel');
    });




    //Route::get('/resoluciones-upla/especificacion/{id}', [EspecificacionEquipoController::class,'show'])->name('d.especificacion.show');*/

});

//RUTAS SOLO USER
Route::middleware(['auth', 'verified','solouser'])->group(function () {

    Route::get('/inicio', [UsuarioController::class,'index'])//tipoequipocontroller
        ->name('user');

    /*Route::get('/inicio/{id}',[UsuarioController::class,'show'])//tipoequipocontroller
        ->name('inicio.show');*/


    /*
    Route::controller(UserSolicitudController::class)->group(function(){
        Route::get('/user/solicitud/tramitar','show')->name('cargarsolicitud');
        Route::post('/user/fut','store')->name('guardarsolicitud');
        Route::get('/user/solicitud','index')->name('mostrarsolicituds');
        Route::get('/user/solicitud','mostrarSolicitud')->name('verSolicitud');
        Route::get('/user/solicitud/vista/{id}','vistaSolicitud')->name('vistaSolicitud');
        Route::get('/user/solicitud/generarFUT/{id}','generarSolicitudFUT')->name('generarFUT');
        Route::get('/user/solicitud/descargarFUT/{id}','downloadFUT')->name('downloadPDFFUT');
        Route::put('/user/solicitud/cargarBoucher/{id}','cargarBoucher')->name('subirBoucher');
        Route::get('/user/documentos','verDocumentos')->name('mostrarDocumentos');
        Route::put('/user/documentos/subirDocumento/{id_persona}','subirDocumentos')->name('actulizarDocumentos');

    });*/

});

require __DIR__.'/auth.php';

