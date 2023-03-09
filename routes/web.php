<?php

use App\Http\Controllers\AdminController;
//use App\Http\Controllers\AdminSoftwareController;
//use App\Http\Controllers\AdminEspecificacionEquipoController;
//use App\Http\Controllers\AdminEspecificacionSoftwareController;
//use App\Http\Controllers\AdminTipoEquipoController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TipoEquipoController;
use App\Http\Controllers\UserTipoEquipoController;
//use App\Http\Controllers\SoftwareController;
//use App\Http\Controllers\AdminUsoEquipoController;
use App\Http\Controllers\InfoSoftwareController;

use App\Http\Controllers\AdminSolicitudController;
use App\Http\Controllers\AdminNotificacionController;

use App\Http\Controllers\SecretariaSolicitudController;
use App\Http\Controllers\JefaturaSolicitudController;

//Estado no adeudo especifico
use App\Http\Controllers\ArchivoEstudiantilController;
use App\Http\Controllers\DursController;
use App\Http\Controllers\FacultadesController;
use App\Http\Controllers\OefcController;

use App\Http\Controllers\CartEquipoController;
//use App\Http\Controllers\EspecificacionEquipoController;
//use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\OficinaController;
use App\Http\Controllers\RolController;
//use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSoftwareController;
use App\Http\Controllers\UserSolicitudController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
//
use App\Http\Controllers\DemoController;

//sistema resoluciones
use App\Http\Controllers\ResolucionController;
//
use App\Mail\EnviarConfirmacionMailable;
use Illuminate\Support\Facades\Mail;

//RUTA INICIO
Route::get('/', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

// //

//RUTAS SOLO ADMIN
Route::middleware(['auth','verified','soloadmin'])->group(function () {
    /* Route::get('/tramite-documentario',[AdminController::class,'index']
     )->name('admin');

     Route::get('/tramite-documentario/exportReporte',[AdminController::class,'generarReporte']
     )->name('reporte'); */

    Route::controller(AdminController::class)->group(function (){
       Route::get('/tramite-documentario', 'index')->name('admin');
       Route::get('/tramite-documentario/exportReporte', 'generarReporte')->name('reporte');
    });


    Route::controller(AdminSolicitudController::class)->group(function (){
        Route::get('/tramite-documentario/solicitudes', 'index')->name('d.solicituds');
        //Route::get('/tramite-documentario/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        //
        Route::get('/tramite-documentario/pagos/{id}', 'show')->name('d.solicituds.show');
        //
        Route::post('/tramite-documentario/solicitudes/aceptar/{id}', 'aceptar_solicitud')->name('d.solicituds.aceptar_solicitud');
        Route::get('/tramite-documentario/solicitudes/rechazar/{id}', 'rechazar_solicitud')->name('d.solicituds.rechazar_solicitud');
        //
        Route::post('/tramite-documentario/solicitudes/validar_constancia/{id}', 'validar_constancia')->name('d.solicituds.validar_constancia');
        Route::get('/tramite-documentario/solicitudes/rechazar_constancia/{id}', 'rechazar_constancia')->name('d.solicituds.rechazar_constancia');

        Route::get('/tramite-documentario/solicitudes/ver/{id}', 'viewDocument')->name('d.solicituds.ver');
        //
        Route::get('/tramite-documentario/exportWord/{id}', 'wordExport')->name('d.solicituds.wordExport');

        Route::get('/tramite-documentario/generarConstancia/{id}', 'generarConstanciaPDF')->name('d.solicituds.generarConstanciaPDF');


        Route::get('/tramite-documentario/inicio/{id}', 'viewDocument')->name('d.solicituds.ver');

        Route::get('/tramite-documentario/solicitudes/estado/{id}', 'mostrarEstado')->name('d.solicituds.estado');

        Route::get('/tramite-documentario/solicitud/estado/{id}', 'mostrarEstadoPendRech')->name('d.solicituds.estadoPR');

    });

    Route::controller(SecretariaSolicitudController::class)->group(function (){
        Route::get('/tramite-documentario/secretaria/solicitudes', 'index')->name('d.solicitud.secretaria');

        Route::put('/tramite-documentario/secretaria/solicitudes/aceptar/{id}', 'aceptar_solicitud')->name('d.solicitud.secretaria.aceptar_solicitud');
        Route::put('/tramite-documentario/secretaria/solicitudes/rechazar/{id}', 'rechazar_solicitud')->name('d.solicitud.secretaria.rechazar_solicitud');
        //Route::put('/tramite-documentario/secretaria/solicitudes/comentario/{id}', 'agregar_comentario')->name('d.solicitud.secretaria.agregar_comentario');
        //Route::get('/tramite-documentario/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        Route::get('/tramite-documentario/secretaria/solicitudes/mostrar/{id}', 'show')->name('d.solicituds.secretaria.show');
    });

    Route::controller(JefaturaSolicitudController::class)->group(function (){
        Route::get('/tramite-documentario/jefatura/solicitudes', 'index')->name('d.solicitud.jefatura');

        //Route::get('/tramite-documentario/especificacionEquipo/{id}', 'show')->name('d.solicituds.show');
        Route::put('/tramite-documentario/jefatura/validar_constancia/{id}', 'validar_constancia')->name('d.solicitud.jefatura.validar_constancia');

        //Route::get('/tramite-documentario/jefatura/rechazar_constancia/{id}', 'rechazar_constancia')->name('d.solicitud.jefatura.rechazar_constancia');

        Route::post('/tramite-documentario/jefatura/generar_barcode/{id}', 'generarBarcode')->name('d.solicitud.jefatura.generar_barcode');

        Route::get('/tramite-documentario/jefatura/generarConstancia/{id}', 'generarConstanciaPDF')->name('d.solicituds.jefatura.generarConstanciaPDF');

        Route::get('/tramite-documentario/jefatura/inicio/AE/{id}', 'viewRequisitoAE')->name('d.solicituds.requisito.revisarAE');
        Route::get('/tramite-documentario/jefatura/inicio/FAC/{id}', 'viewRequisitoFac')->name('d.solicituds.requisito.revisarFac');
        Route::get('/tramite-documentario/jefatura/inicio/OEF/{id}', 'viewRequisitoOEF')->name('d.solicituds.requisito.revisarOEF');
        Route::get('/tramite-documentario/jefatura/inicio/PAI/{id}', 'viewRequisitoPAI')->name('d.solicituds.requisito.revisarPAI');

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
        Route::get('/tramite-documentario/noti','index')->name('notificacion.index');
    }); */
    Route::controller(ResolucionController::class)->group(function (){
        Route::get('/tramite-documentario/resoluciones', 'index')->name('r.resoluciones');
        Route::get('/tramite-documentario/resoluciones/registrar','create')->name('r.resoluciones.registrar');
    });

    Route::controller(RolController::class)->group(function (){
        Route::get('/tramite-documentario/roles','index')->name('d.roles.index');
        Route::get('/tramite-documentario/roles/create','create')->name('d.roles.create');
        Route::post('/tramite-documentario/roles/store','store')->name('d.roles.store');
        Route::get('/tramite-documentario/roles/edit/{id}','edit')->name('d.roles.edit');
        Route::put('/tramite-documentario/roles/update/{id}','update')->name('d.roles.update');
        Route::delete('/tramite-documentario/roles/{id}','destroy')->name('d.roles.destroy');
    });

    Route::controller(OficinaController::class)->group(function (){
        Route::get('/tramite-documentario/oficinas','index')->name('d.oficinas.index');
        Route::get('/tramite-documentario/oficinas/create','create')->name('d.oficinas.create');
        Route::post('/tramite-documentario/oficinas/store','store')->name('d.oficinas.store');
        Route::get('/tramite-documentario/oficinas/edit/{id}','edit')->name('d.oficinas.edit');
        Route::put('/tramite-documentario/oficinas/update/{id}','update')->name('d.oficinas.update');
        Route::delete('/tramite-documentario/oficinas/{id}','destroy')->name('d.oficinas.destroy');
    });
    Route::controller(UserController::class)->group(function (){
        Route::get('/tramite-documentario/usuarios','index')->name('d.usuarios.index');
        Route::get('/tramite-documentario/usuarios/create','create')->name('d.usuarios.create');
        Route::post('/tramite-documentario/usuarios/store','store')->name('d.usuarios.store');
        Route::get('/tramite-documentario/usuarios/edit/{id}','edit')->name('d.usuarios.edit');
        Route::put('/tramite-documentario/usuarios/update/{id}','update')->name('d.usuarios.update');
        Route::delete('/tramite-documentario/usuarios/{id}','destroy')->name('d.usuarios.destroy');
        Route::get('/tramite-documentario/usuarios/excel','exportExcel')->name('excel');
    });




    //Route::get('/tramite-documentario/especificacion/{id}', [EspecificacionEquipoController::class,'show'])->name('d.especificacion.show');

});

//RUTAS SOLO USER
Route::middleware(['auth', 'verified','solouser'])->group(function () {

    Route::get('/inicio', [UsuarioController::class,'index'])//tipoequipocontroller
        ->name('user');

    Route::get('/inicio/{id}',[UsuarioController::class,'show'])//tipoequipocontroller
        ->name('inicio.show');


    
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

    });

});

require __DIR__.'/auth.php';

