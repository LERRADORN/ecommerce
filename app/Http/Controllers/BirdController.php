<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class BirdController extends Controller
{
    public function bird(Request $request)
    {
        $searchTerm = $request->input('search');

        $query = Product::whereHas('category', function ($query) {
            $query->where('name', 'Bird');
        });

        if ($searchTerm) {
            $query->where('name', 'like', "%$searchTerm%");
        }

        try {
            $birds = $query->get();
            return response()->json($birds);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
