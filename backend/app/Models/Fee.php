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

    public static function getTotalByMonth($year, $month)
    {
        $fees = self::join('fee_categories', 'fees.fee_category', '=', 'fee_categories.id')
            ->whereYear('fees.paid_at', $year)
            ->whereMonth('fees.paid_at', $month)
            ->sum('fee_categories.amount');
        return $fees;
    }
    public static function getTotalPreviousYear($year_now)
    {
        return self::join('fee_categories', 'fees.fee_category', '=', 'fee_categories.id')
            ->whereRaw('YEAR(fees.paid_at) < ?', [$year_now])->sum('fee_categories.amount');
    }
}
