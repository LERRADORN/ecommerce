<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CatController extends Controller
{
    public function cat(Request $request)
    {
        $searchTerm = $request->input('search');

        $query = Product::whereHas('category', function ($query) {
            $query->where('name', 'Cat');
        });

        if ($searchTerm) {
            $query->where('name', 'like', "%$searchTerm%");
        }

        try {
            $cats = $query->get();
            return response()->json($cats);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
