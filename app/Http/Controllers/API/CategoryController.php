<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function get_all_category(){
        $category = Category::all();
        return response()->json([
            "categories" => $category
        ], 200);
    }
}
