<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = ['house_id', 'resident_id', 'contract_category', 'start_date', 'end_date'];
    public $timestamps = false;

    public function house()
    {
        return $this->belongsTo(House::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function fees()
    {
        return $this->hasMany(Fee::class);
    }
}
