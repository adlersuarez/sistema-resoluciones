<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SoloUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        switch(auth::user()->id_rol){
			case ('1'):
                return redirect('/tramite-documentario');// si es admin redirige a la interfaz inicial de admin
			    break;	
            case ('2'):
                return $next($request);//si es usuario continua con la interfaz usuario
                break;
            default:
                return redirect('/');
        }
    }
}
