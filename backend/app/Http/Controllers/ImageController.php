<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function StoreKTP(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Ambil file
        $file = $request->file('image');

        // Generate nama unik
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

        // Simpan di folder 'ktp' di disk 'public'
        $path = $file->storeAs('ktp', $filename, 'public');

        return response()->json([
            'url' => $path,
        ]);
    }
}
