<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contract = Contract::find($id);
        return response()->json($contract);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'resident_id' => 'required',
            'house_id' => 'required',
            'contract_category' => 'required',
            'start_date' => 'required',
        ]);
        $data["end_date"] = $request["end_date"];

        $contract = Contract::find($id);
        $contract->update($data);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
