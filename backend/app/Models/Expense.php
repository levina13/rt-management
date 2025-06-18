<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = ['expense_category', 'description', 'amount', 'date'];
    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category');
    }
    public static function getTotalByMonth($year, $month)
    {
        $expenses = self::whereYear('date', $year)
            ->whereMonth('date', $month)
            ->sum('amount');
        return $expenses;
    }
    public static function getTotalPreviousYear($year_now)
    {
        return self::whereRaw('YEAR(date) < ?', [$year_now])->sum('amount');
    }
}
