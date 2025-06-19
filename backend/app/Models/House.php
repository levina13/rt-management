<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'house_num',
    ];

    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
    public function currentContract()
    {
        return $this->hasOne(Contract::class)->active();
        // ->active()
        // ->latestOfMany();
    }
    public function currentResident()
    {
        return $this->currentContract?->resident;
    }

    public function residents()
    {
        $residents = $this->hasManyThrough(House::class, Contract::class);
        return $residents;
    }
}
