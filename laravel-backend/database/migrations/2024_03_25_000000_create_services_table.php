<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('hero_text');
            $table->text('excerpt');
            $table->string('heading');
            $table->text('content');
            $table->string('meta_title');
            $table->text('meta_description');
            $table->string('status')->default('draft');
            $table->string('parent_id')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')
                  ->references('id')
                  ->on('services')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
}; 