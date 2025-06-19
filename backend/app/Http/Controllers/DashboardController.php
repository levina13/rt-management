<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Fee;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function TotalExpensePayment()
    {
        $expenses = Expense::sum('amount');
        $payments = Fee::join(
            'fee_categories',
            'fees.fee_category',
            '=',
            'fee_categories.id'
        )
            ->sum('fee_categories.amount');
        $balance = $payments - $expenses;
        $data = [
            "total_expenses" => $expenses,
            "total_payments" => $payments,
            "balance" => $balance
        ];
        return response()->json($data);
    }

    public function GraphDataByYear($year)
    {
        // return Fee::all();

        $data = [];
        $balance = Fee::getTotalPreviousYear($year) - Expense::getTotalPreviousYear($year);
        $monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        for ($month = 1; $month <= 12; $month++) {
            $expense = Expense::getTotalByMonth($year, $month);
            $income = Fee::getTotalByMonth($year, $month);
            $balance += ($income - $expense);

            $data[] = [
                'month' => $monthNames[$month - 1],
                'income' => $income,
                'expense' => $expense,
                'balance' => $balance,
            ];
        }

        return response()->json($data);
    }

    public function ExpensePaymentByMonth($year, $month)
    {
        $data = [];


        $expenses = Expense::whereYear('date', $year)
            ->whereMonth('date', $month)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->description,
                    'type' => 'Pengeluaran',
                    'date' => $item->date,
                    'amount' => $item->amount,
                ];
            });
        $payments = Fee::whereYear('fees.paid_at', $year)
            ->whereMonth('fees.paid_at', $month)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => 'Iuran ' . $item->category?->name . ' - Rumah ' . ($item->contract->house->house_num ?? 'Tidak diketahui') . ' - Periode ' . $item->periode,
                    'type' => 'Pemasukan',
                    'date' => $item->paid_at,
                    'amount' => $item->category?->amount,
                ];
            });
        $transactions = $expenses->concat($payments)->sortBy('date')->values();

        return response()->json($transactions);
    }
}
