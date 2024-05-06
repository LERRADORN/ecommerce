<?php

namespace App\Http\Controllers;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqsController extends Controller
{
    public function faq()
    {
        $faqs = Faq::all(); // Retrieve all FAQs from the database
        return response()->json($faqs);
    }//
}
