<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    protected $fillable = ['contract_id', 'fee_category', 'periode', 'paid_at'];
    public $timestamps = false;

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function category()
    {
        return $this->belongsTo(FeeCategory::class, 'fee_category');
    }
}
