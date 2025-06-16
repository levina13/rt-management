<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = ['expense_category', 'description', 'amount', 'date', 'bukti'];
    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category');
    }
}
