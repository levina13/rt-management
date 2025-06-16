<?php

namespace Database\Seeders;

use App\Models\Resident;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 20) as $i) {
            Resident::create([
                'name' => "Warga {$i}",
                'ktp' => "ktp_{$i}.jpg",
                'phone' => "0812345678{$i}",
                'is_married' => rand(0, 1),
            ]);
        }
    }
}
