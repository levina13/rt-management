<?php

namespace Database\Seeders;

use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::create([
            'expense_category' => 1,
            'description' => 'Gaji satpam bulan Mei 2025',
            'amount' => 1000000,
            'date' => Carbon::now()->subMonth()->endOfMonth()->toDateString(),
            'bukti' => 'bukti_gaji.jpg',
        ]);

        Expense::create([
            'expense_category' => 2,
            'description' => 'Token listrik pos bulan Mei 2025',
            'amount' => 250000,
            'date' => Carbon::now()->subMonth()->endOfMonth()->toDateString(),
            'bukti' => 'bukti_token.jpg',
        ]);
    }
}
