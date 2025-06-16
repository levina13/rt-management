<?php

namespace App\Models;

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
}
