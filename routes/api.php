<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function(){
    Route::post('login','login');
    Route::post('register','register');
});

Route::get('/get_all_product', [ProductController::class, 'get_all_product']);
Route::post('/add_product', [ProductController::class, 'add_product']);
Route::get('/get_edit_product/{id}', [ProductController::class, 'get_edit_product']);
Route::post('/update_product/{id}', [ProductController::class, 'update_product']);
Route::get('/delete_product/{id}', [ProductController::class, 'delete_product']);
Route::get('/get_all_category', [CategoryController::class, 'get_all_category']);
