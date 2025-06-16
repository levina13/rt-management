<?php

namespace Database\Seeders;

use App\Models\Contract;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 15) as $i) {
            Contract::create([
                'house_id' => $i,
                'resident_id' => $i,
                'contract_category' => 'permanen',
                'start_date' => Carbon::now()->subMonths(rand(6, 24)),
                'end_date' => null,
            ]);
        }

        foreach (range(16, 20) as $i) {
            Contract::create([
                'house_id' => $i,
                'resident_id' => $i,
                'contract_category' => 'kontrak',
                'start_date' => Carbon::now()->subMonth(),
                'end_date' => Carbon::now()->addMonths(2),
            ]);
        }
    }
}
