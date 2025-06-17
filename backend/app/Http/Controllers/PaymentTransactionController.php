<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Fee;
use App\Models\House;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentTransactionController extends Controller
{
    public function getMaxMonths($houseId, $category)
    {
        $category = $category;
        // $category = 'satpam';
        $house = House::with('currentContract')->findOrFail($houseId);
        $contract = $house->currentContract;


        $max_fee_period = $contract->getMaxFeePeriodByCategory($category);


        return response()->json(['max_months' => $max_fee_period]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'house_id' => 'required',
            'fee_category' => 'required|string',
            'fee_count' => 'required',
        ]);
        $fee_count = $validated['fee_count'];
        $contract = Contract::where('house_id', $validated['house_id'])->active()->first();
        $fee_category = $validated['fee_category'];
        $now = now();

        if (!$contract) {
            return response()->json(['message' => 'Kontrak tidak ditemukan.'], 404);
        }
        if ($fee_count > $contract->getMaxFeePeriodByCategory($fee_category)) {
            return response()->json(['message' => 'Jumlah Fee terlalu banyak.'], 400);
        }

        $periode_start = $contract->getLastFeePeriodeByCategory($fee_category);

        $insertData = [];

        for ($i = 1; $i <= $fee_count; $i++) {
            $periode = $periode_start->copy()->addMonths($i)->format('Y-m');

            $insertData[] = [
                'contract_id' => $contract->resident->id,
                'fee_category' => $fee_category,
                'periode' => $periode,
                'paid_at' => $now,
            ];
        }
        Fee::insert($insertData);

        return response()->json([
            'message' => 'Pembayaran iuran berhasil disimpan',
            'count' => count($insertData),
        ]);
    }
}
