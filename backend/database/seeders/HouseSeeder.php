<?php

namespace Database\Seeders;

use App\Models\House;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $houses = [];

        foreach (range(1, 20) as $i) {
            House::create([
                'house_num' => "R{$i}",
            ]);
        }
    }
}
