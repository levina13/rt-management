<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = ['house_id', 'resident_id', 'contract_category', 'start_date', 'end_date'];
    public $timestamps = false;


    public function ScopeActive($query)
    {
        return $query->where('start_date', '<=', Carbon::today())
            ->where(function ($q) {
                $q->whereNull('end_date')
                    ->orWhere('end_date', '>=', Carbon::today());
            });
    }

    public function getFeeStatusByCategory($category)
    {
        $periode = Carbon::now()->format('Y-m');
        $fee = $this->fees()
            ->where('fee_category', $category)
            ->where('periode', $periode)
            ->first();

        return $fee && $fee->paid_at ? True : False;
    }

    public function getLastFeePeriodeByCategory($feeCategory)
    {
        $lastPaid = $this->fees()
            ->where('fee_category', $feeCategory)
            ->orderByDesc('periode')
            ->first();
        if ($lastPaid && !empty($lastPaid->periode)) {
            $start = Carbon::createFromFormat('Y-m', $lastPaid->periode)->addMonth();
        } else {
            // Belum pernah bayar, mulai dari awal kontrak
            $start = Carbon::parse($this->start_date)->startOfMonth();
        }

        return $start;
    }

    public function getMaxFeePeriodByCategory($feeCategory)
    {
        $start = $this->getLastFeePeriodeByCategory($feeCategory);

        $end = $this->end_date
            ? Carbon::parse($this->end_date)->startOfMonth()
            : now()->addYear()->startOfMonth();


        $diff = $start->diffInMonths($end);

        return ceil(min($diff, 12));
    }

    // public function

    public function fees()
    {
        return $this->hasMany(Fee::class);
    }

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function house()
    {
        return $this->belongsTo(House::class);
    }
}
