<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Houses
        Schema::create('houses', function (Blueprint $table) {
            $table->tinyIncrements("id");
            $table->string('house_num', 10)->unique();
        });

        // Fee Categories
        Schema::create('fee_categories', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('nama', 50);
            $table->unsignedInteger('amount');
        });

        // Residents
        Schema::create('residents', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name', 100);
            $table->string('ktp', 255);
            $table->string('phone', 20);
            $table->boolean('is_married');
        });


        // Contracts
        Schema::create('contracts', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedTinyInteger('house_id');
            $table->foreign('house_id')->references('id')->on('houses');
            $table->unsignedSmallInteger('resident_id');
            $table->foreign('resident_id')->references('id')->on('residents');
            $table->enum('contract_category', ['permanen', 'kontrak']);
            $table->date('start_date');
            $table->date('end_date')->nullable();
        });


        // Fees
        Schema::create('fees', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedMediumInteger('contract_id');
            $table->foreign('contract_id')->references('id')->on('contracts');
            $table->unsignedTinyInteger('fee_category');
            $table->foreign('fee_category')->references('id')->on('fee_categories')->onDelete('cascade');
            $table->string('periode', 7); // format: YYYY-MM
            $table->date('paid_at')->nullable();
        });


        // Expense Categories
        Schema::create('expense_categories', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 50);
        });

        // Expenses
        Schema::create('expenses', function (Blueprint $table) {
            $table->mediumIncrements('id');
            $table->unsignedTinyInteger('expense_category');
            $table->foreign('expense_category')->references('id')->on('expense_categories');
            $table->text('description');
            $table->unsignedInteger('amount');
            $table->date('date');
            $table->string('bukti', 255); // path to image
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses');
        Schema::dropIfExists('expense_categories');
        Schema::dropIfExists('contracts');
        Schema::dropIfExists('contract_categories');
        Schema::dropIfExists('fees');
        Schema::dropIfExists('residents');
        Schema::dropIfExists('fee_categories');
        Schema::dropIfExists('houses');
    }
};
