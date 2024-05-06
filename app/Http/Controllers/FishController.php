<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FishController extends Controller
{
    public function fish(Request $request)
    {
        $searchTerm = $request->input('search');

        $query = Product::whereHas('category', function ($query) {
            $query->where('name', 'Fish');
        });

        if ($searchTerm) {
            $query->where('name', 'like', "%$searchTerm%");
        }

        try {
            $fish = $query->get();
            return response()->json($fish);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
