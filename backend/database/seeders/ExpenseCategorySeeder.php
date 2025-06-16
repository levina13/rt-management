<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExpenseCategory::create(['name' => 'Gaji Satpam']);
        ExpenseCategory::create(['name' => 'Token Listrik Pos']);
        ExpenseCategory::create(['name' => 'Perbaikan Jalan']);
        ExpenseCategory::create(['name' => 'Perbaikan Selokan']);
        ExpenseCategory::create(['name' => 'Lainnya']);
    }
}
