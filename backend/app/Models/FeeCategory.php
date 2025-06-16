<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeeCategory extends Model
{
    protected $fillable = ['nama', 'amount'];
    public $timestamps = false;

    public function fees()
    {
        return $this->hasMany(Fee::class, 'fee_category');
    }
}
