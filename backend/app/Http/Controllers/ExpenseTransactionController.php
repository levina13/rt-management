<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpenseTransactionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'expense_category' => 'required',
            'description' => 'required',
            'amount' => 'required',
        ], [
            'expense_category.required' => 'Pilih Kategori pengeluaran.',
            'description.required' => 'Deskripsi pengeluaran harus diisi.',
            'amount.required' => 'Jumlah pengeluaran harus diisi.',

        ]);

        $insertData = [
            'expense_category' => $validated['expense_category'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'date' => now()
        ];

        Expense::insert($insertData);
        return response()->json([
            'message' => 'Pengeluaran berhasil disimpan',
        ]);
    }
}
