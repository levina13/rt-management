<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = ['name', 'ktp', 'phone', 'is_married', 'start_date', 'end_date'];
    public $timestamps = false;
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }
}
