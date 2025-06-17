<?php

use App\Http\Controllers\HouseController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PaymentTransactionController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\TableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('houses', HouseController::class);
Route::apiResource('residents', ResidentController::class);


// Get Table
Route::get('/house-table', [TableController::class, 'HouseTable']);
Route::get('/resident-table', [TableController::class, 'ResidentTable']);
Route::get('/fee-history-table', [TableController::class, 'FeeHistoryTable']);

// POST
Route::post('/upload-ktp', [ImageController::class, 'StoreKTP']);
Route::post('/fees', [PaymentTransactionController::class, 'store']);

// GET Max-month for pay
Route::get('/fees/max-months/{houseId}/{category}', [PaymentTransactionController::class, 'getMaxMonths']);
