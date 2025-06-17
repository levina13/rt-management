<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;

class ExpenseCategoryController extends Controller
{
    public function index()
    {
        $expenseCategory = ExpenseCategory::all();
        return response()->json($expenseCategory);
    }
}
