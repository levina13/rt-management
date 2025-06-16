<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            HouseSeeder::class,
            ResidentSeeder::class,
            ContractSeeder::class,
            FeeCategorySeeder::class,
            FeeSeeder::class,
            ExpenseCategorySeeder::class,
            ExpenseSeeder::class,
        ]);
    }
}
