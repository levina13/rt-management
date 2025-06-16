<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseCategory extends Model
{
    protected $fillable = ['name'];
    public $timestamps = false;

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'expense_category');
    }
}
