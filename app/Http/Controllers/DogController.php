<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class DogController extends Controller
{
    public function dog(Request $request)
    {
        $searchTerm = $request->input('search');

        $query = Product::whereHas('category', function ($query) {
            $query->where('name', 'Dog');
        });

        if ($searchTerm) {
            $query->where('name', 'like', "%$searchTerm%");
        }

        try {
            $dogs = $query->get();
            return response()->json($dogs);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
