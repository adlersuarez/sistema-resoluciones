<?php

namespace App\Http\Controllers;

use App\Models\CartEquipo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartEquipoController extends Controller
{
    public function carritoIndex(){
        $cardItems = CartEquipo::with(['tipoequipo','usoequipo'])->where(['ID_User'=>auth()->user()->id])->get();
        return Inertia::render('User/Carrito',[
            'cardEquipo' => CartEquipo::where(['ID_User'=>auth()->user()->id])->get(),
            'cardItem' => $cardItems
        ]);
    }
    public function addToCartEquipo(Request $request,$id){
        $cantidad = $request->quantity;
        $uso = $request->uso;
        $data = ['ID_User'=>auth()->user()->id,
        'ID_Tipo_Equipo'=>$id,
        'ID_Uso_Equipo'=>$uso,
        'Cantidad'=>$cantidad];
        CartEquipo::updateOrCreate($data);
        return redirect()->route('carritoindex');
    }

    public function removeItemEquipo($id){
        $cart = CartEquipo::find($id);
        if($cart){
            $cart->delete();
        }
    }
    public function removeAllEquipo(){
        $cart = CartEquipo::where(['ID_User'=>auth()->user()->id]);
        if($cart){
            $cart->delete();
        }
    }
}
