<?php

namespace App\Http\Controllers;

use App\Models\House;
use Illuminate\Http\Request;

class HouseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $houses = House::get();
        return response()->json($houses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $house = new House();
        $house->name = $request->name;
        $house->description = $request->description;
        $house->save();
        return response()->json($house);
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
        $house = House::find($id);
        $house->name = $request->name;
        $house->description = $request->description;
        $house->save();
        return response()->json($house);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
