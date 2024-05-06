<?php
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DogController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\FishController;
use App\Http\Controllers\BirdController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;


// use App\Http\Middleware\Cors;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/products', [ProductController::class, 'product']);

Route::get('products/dog', [DogController::class, 'dog']);

Route::get('products/cat', [CatController::class, 'cat']);

Route::get('products/fish', [FishController::class, 'fish']);

Route::get('products/bird', [BirdController::class, 'bird']);

Route::get('/faqs', [FaqsController::class, 'faq']);


Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);


Route::get('/cart', [CartController::class, 'display']);
// Route::post('/cart', [CartController::class, 'add']);
Route::put('/cart/{id}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'delete']);







