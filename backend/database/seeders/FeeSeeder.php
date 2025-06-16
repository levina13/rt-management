<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Fee;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $periode = Carbon::now()->subMonth()->format('Y-m');

        // Untuk semua kontrak aktif
        $contracts = Contract::all();

        foreach ($contracts as $contract) {
            foreach ([1, 2] as $category) { // 1 = Satpam, 2 = Kebersihan
                Fee::create([
                    'contract_id' => $contract->id,
                    'fee_category' => $category,
                    'periode' => $periode,
                    'paid_at' => rand(0, 1) ? Carbon::now()->subDays(rand(1, 10)) : null,
                ]);
            }
        }
    }
}
