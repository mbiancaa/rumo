<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->renameColumn('hero_text', 'heroText');
            $table->renameColumn('meta_title', 'metaTitle');
            $table->renameColumn('meta_description', 'metaDescription');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->renameColumn('heroText', 'hero_text');
            $table->renameColumn('metaTitle', 'meta_title');
            $table->renameColumn('metaDescription', 'meta_description');
        });
    }
}; 