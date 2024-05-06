<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    public function display()
    {
        $cartItems = Cart::all();
        return response()->json($cartItems);
    }


    // For ADD/POST new data.
    // public function add(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'description' => 'required',
    //         'price' => 'required|numeric',
    //         'stock' => 'required|integer',
    //         'img' => 'required',
    //         'quantity' => 'required|integer',
    //     ]);

    //     $cartItem = Cart::create($request->all());

    //     return response()->json($cartItem, 201);
    // }

    public function update(Request $request, $id)
    {
        $cartItem = Cart::findOrFail($id);

        $request->validate([
            'quantity' => 'required|integer',
        ]);

        $cartItem->update($request->all());

        return response()->json($cartItem, 200);
    }

    public function delete($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        return response()->json(null, 204);
    }
}

