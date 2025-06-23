<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $residents = Resident::all();

        return response()->json($residents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'is_married' => 'required|boolean',
            'ktp' => 'required|string|max:255', // jika pakai upload file
        ], [
            "name.required" => "Nama harus diisi.",
            "name.max" => "Nama terlalu panjang.",
            "phone.required" => "Nomor Telepon harus diisi",
            "phone.max" => "Nomor telepon terlalu panjang.",
            "is_married.required" => "Status Pernikahan harus diisi",
            "ktp.required" => "KTP harus diisi."

        ]);

        // Simpan data
        $resident = Resident::create($validated);
        return response()->json($resident, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $resident = Resident::find($id);
        $resident->ktp_url = asset(Storage::url($resident->ktp));
        return response()->json($resident);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'is_married' => 'required|boolean',
            'ktp' => 'required|string|max:255', // jika pakai upload file
        ]);

        $resident = Resident::find($id);

        $resident->update($validated);

        return response()->json($resident);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
