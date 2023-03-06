<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SoloAdmin
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
                return $next($request); // si es admin continua con la interfaz admin
			    break;	
            case ('2'):
                return redirect('/inicio'); // si es usuario redirige a la interfaz inicial de usuario
                break;
            default:
                return redirect('/');
        }
    }
}
