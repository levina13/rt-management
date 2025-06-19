<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseTransactionController;
use App\Http\Controllers\FeeCategoryController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PaymentTransactionController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\TableController;
use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('houses', HouseController::class);
Route::apiResource('residents', ResidentController::class);
Route::apiResource('expense-categories', ExpenseCategoryController::class);
Route::apiResource('fee-categories', FeeCategoryController::class);


// Get Table
Route::get('/house-table', [TableController::class, 'HouseTable']);
Route::get('/resident-table', [TableController::class, 'ResidentTable']);
Route::get('/fee-history-table', [TableController::class, 'FeeHistoryTable']);
Route::get('/expense-history-table', [TableController::class, 'ExpenseHistoryTable']);
Route::get('/houses/{id}/residents', [HouseController::class, 'ResidentHistories']);

// GET
Route::get('/fees/max-months/{houseId}/{category}', [PaymentTransactionController::class, 'getMaxMonths']);
Route::get('/dashboard/card-data', [DashboardController::class, 'TotalExpensePayment']);
Route::get('/dashboard/chart-data/{year}', [DashboardController::class, 'GraphDataByYear']);
Route::get('/dashboard/table-data/{year}/{month}', [DashboardController::class, 'ExpensePaymentByMonth']);



// POST
Route::post('/upload-ktp', [ImageController::class, 'StoreKTP']);
Route::post('/fees', [PaymentTransactionController::class, 'store']);
Route::post('/expenses', [ExpenseTransactionController::class, 'store']);
Route::post('/houses/{house_id}/residents', [HouseController::class, 'storeResident']);
