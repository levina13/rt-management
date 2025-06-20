<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $houses = House::all();


        return response()->json($houses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'house_num' => 'required|string|max:10',
        ]);

        $house = House::create($data);
        return response()->json($house, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $house = House::find($id);
        return response()->json($house);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = $request->validate([
            'house_num' => 'required|string|max:10',
        ]);

        $house = House::find($id);
        $house->update($data);

        return response()->json($house);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function ResidentHistories(string $id)
    {
        $house = House::find($id);
        $contracts = $house->contracts;

        $data = [];
        $data["current_contract"] = $house->currentContract->contract_category;
        foreach ($contracts as $contract) {
            $resident = $contract->resident;
            $data["residents"][] = [
                "contract_id" => $contract->id,
                "name" => $resident->name,
                "phone" => $resident->phone,
                "category" => $contract->contract_category,
                "start_date" => $contract->start_date,
                "end_date" => $contract->end_date,

            ];
        }

        return response()->json($data);
    }

    public function storeResident(Request $request, string $house_id)
    {
        $house = House::find($house_id);

        if ($house->currentContract?->category == "permanen") {
            return response()->json(["message" => "Tidak bisa menambah penghuni, rumah sudah dihuni permanen."], 400);
        } else if ($house->currentContract?->category == "kontrak") {
            if ($request['start_date'] < $house->currentContract['end_date']) return response()->json(["message" => "Tidak bisa menambah penghuni, rumah masih dihuni."], 400);
        }
        $data = $request->validate([
            'resident_id' => 'required',
            'contract_category' => 'required',
            'start_date' => 'required'
        ]);
        $data["end_date"] = $request["end_date"];
        $data["house_id"] = $house_id;


        $contract = Contract::create($data);
        return response()->json($contract, 201);
    }
}
