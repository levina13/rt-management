<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use App\Models\House;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TableController extends Controller
{
    public function HouseTable()
    {
        $houses = House::all();

        $data = $houses->map(function ($house) {
            $current_contract = $house->currentContract;
            $resident = $current_contract?->resident;

            $feeSatpam = False;
            $feeKebersihan = False;

            if ($current_contract) {
                $feeSatpam = $current_contract->getFeeStatusByCategory('satpam');
                $feeKebersihan = $current_contract->getFeeStatusByCategory('kebersihan');
            }

            return [
                'id' => $house->id,
                'house_num' => $house->house_num,
                'is_occupied' => $resident ? true : false,
                'resident' => $resident ?  $resident->name : null,
                'phone' => $resident ? $resident->phone : null,
                'fee_satpam' => $feeSatpam,
                'fee_kebersihan' => $feeKebersihan
            ];
        });
        return response()->json($data);
    }

    public function ResidentTable()
    {
        $residents = Resident::all();

        $data = $residents->map(function ($resident) {
            $current_contract = $resident->currentContract;
            $house = $current_contract?->house;

            return [
                'id' => $resident->id,
                'name' => $resident->name,
                'house_num' => $house?->house_num,
                'phone' => $resident->phone,
                'is_married' => $resident->is_married,
                'status' => $current_contract ? $current_contract->contract_category : 'Tidak Aktif',
                'start_date' => $current_contract ? $current_contract->start_date : '-',
                'end_date' => $current_contract ? $current_contract->end_date : '-',
                'ktp' => asset(Storage::url($resident->ktp)),
            ];
        });
        return response()->json($data);
    }

    public function FeeHistoryTable()
    {
        $feeHistories = Fee::all();
        $data = $feeHistories->map(function ($feeHistory) {
            $contract = $feeHistory->contract;
            // $periode = Carbon::$fee->periode->subMonth()->format('Y-m');
            return [
                'id' => $feeHistory->id,
                'house_num' => $contract->house->house_num,
                'resident_name' => $contract->resident?->name,
                'resident_phone' => $contract->resident->phone,
                'fee_category' => $feeHistory->fee_category,
                'periode' => $feeHistory->periode,
                'paid_at' => $feeHistory->paid_at,
            ];
        });
        return response()->json($data);
    }
}
