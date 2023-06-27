<?php

use App\Http\Controllers\AdminController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
//
//use App\Http\Controllers\DemoController;

//sistema resoluciones
use App\Http\Controllers\ResolucionController;
use App\Http\Controllers\FormatoController;

use App\Http\Controllers\PlantillaController;
use App\Http\Controllers\DocumentoController;

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

    Route::controller(ResolucionController::class)->group(function (){
        Route::get('/resoluciones-upla/resoluciones', 'index')->name('r.resoluciones');
        Route::get('/resoluciones-upla/resoluciones/registrar','create')->name('r.resoluciones.registrar');
        Route::post('/resoluciones-upla/resoluciones/store','store')->name('r.resoluciones.store');
        //Descargar
        Route::get('/resoluciones-upla/resoluciones/descargar/{id}','descargarResolucion')->name('r.resoluciones.descargar');
        //Ver Documento
        Route::get('/resoluciones-upla/resoluciones/mostrar/{id}', 'verDocumento')->name('r.resoluciones.ver');
    });

    Route::controller(FormatoController::class)->group(function (){
        Route::get('/resoluciones-upla/formatos', 'index')->name('r.formatos');
        //
        Route::get('/resoluciones-upla/formatos/registrar/auspicio-academico','createAuspicioAcademico')->name('r.formatos.registrar.AuspicioAcademico');
        Route::post('/resoluciones-upla/formatos/storeAuspicioAcademico','storeAuspicioAcademico')->name('r.formatos.store.AuspicioAcademico');
        //
        Route::get('/resoluciones-upla/formatos/registrar/cambio-modalidad-ingreso','createCambioModalidadIngreso')->name('r.formatos.registrar.CambioModalidadIngreso');
        //
        Route::get('/resoluciones-upla/formatos/registrar/presupuesto-institucional-apertura','createPia')->name('r.formatos.registrar.Pia');
        //
        Route::get('/resoluciones-upla/formatos/registrar/presupuesto-institucional-apertura-modificado','createPiaModificado')->name('r.formatos.registrar.PiaModificado');
        //
        Route::get('/resoluciones-upla/formatos/registrar/por-navidad','createPorNavidad')->name('r.formatos.registrar.PorNavidad');
        //
        Route::get('/resoluciones-upla/formatos/registrar/por-uniforme','createPorUniforme')->name('r.formatos.registrar.PorUniforme');
        //
        Route::get('/resoluciones-upla/formatos/registrar/propuesta-jefe-of','createPropuestaJefe')->name('r.formatos.registrar.PropuestaJefe');
        //
        Route::get('/resoluciones-upla/formatos/registrar/calendario-academico-general','createCalendarioAcademicoGeneral')->name('r.formatos.registrar.CalendarioAcademicoGeneral');
        //
        Route::get('/resoluciones-upla/formatos/registrar/calendario-academico-internado-medico','createCalendarioAcademicoInternadoMedico')->name('r.formatos.registrar.CalendarioAcademicoInternadoMedico');
        //
        Route::get('/resoluciones-upla/formatos/registrar/cronograma-pagos','createCronogramaPagos')->name('r.formatos.registrar.CronogramaPagos');
        //
        Route::get('/resoluciones-upla/formatos/registrar/presupuesto-admision','createPresupuestoAdmision')->name('r.formatos.registrar.PresupuestoAdmision');
        //
        Route::get('/resoluciones-upla/formatos/registrar/aprobacion-directiva','createAprobacionDirectiva')->name('r.formatos.registrar.AprobacionDirectiva');
        //
        Route::get('/resoluciones-upla/formatos/registrar/aprobacion-expediente-tecnico','createAprobacionExpedienteTecnico')->name('r.formatos.registrar.AprobacionExpedienteTecnico');
        //
        Route::get('/resoluciones-upla/formatos/registrar/aprobacion-bases','createAprobacionBases')->name('r.formatos.registrar.AprobacionBases');
        //
        Route::get('/resoluciones-upla/formatos/registrar/otorgacion-buena-pro','createOtorgacionBuenaPro')->name('r.formatos.registrar.OtorgacionBuenaPro');
    });

    Route::controller(PlantillaController::class)->group(function (){
        Route::get('/resoluciones-upla/plantillas', 'index')->name('r.plantillas');
        Route::get('/resoluciones-upla/plantillas/registrar','create')->name('r.plantillas.registrar');
        //
    });

    Route::controller(DocumentoController::class)->group(function (){
        Route::get('/resoluciones-upla/documentos', 'index')->name('r.documentos');
        Route::get('/resoluciones-upla/documentos/registrar','create')->name('r.documentos.registrar');
        //
    });

    Route::controller(AsuntoController::class)->group(function (){
        Route::get('/resoluciones-upla/asuntos', 'index')->name('r.asuntos');
        //
    });

    Route::controller(AdendaController::class)->group(function (){
        Route::get('/resoluciones-upla/adendas', 'index')->name('r.adendas');
        Route::get('/resoluciones-upla/adendas/registrar','create')->name('r.adendas.registrar');
        //
    });

    Route::controller(ContratoController::class)->group(function (){
        Route::get('/resoluciones-upla/contratos', 'index')->name('r.contratos');
        Route::get('/resoluciones-upla/contratos/registrar','create')->name('r.contratos.registrar');
        //
    });

    Route::controller(ConvenioController::class)->group(function (){
        Route::get('/resoluciones-upla/convenios', 'index')->name('r.convenios');
        Route::get('/resoluciones-upla/convenios/registrar','create')->name('r.convenios.registrar');
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

