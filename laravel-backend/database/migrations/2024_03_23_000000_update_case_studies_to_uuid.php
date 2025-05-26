<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        // First, add a temporary UUID column
        Schema::table('case_studies', function (Blueprint $table) {
            $table->uuid('uuid')->nullable()->after('id');
        });

        // Generate UUIDs for existing records
        DB::table('case_studies')->orderBy('id')->each(function ($caseStudy) {
            DB::table('case_studies')
                ->where('id', $caseStudy->id)
                ->update(['uuid' => Str::uuid()]);
        });

        // Drop the old primary key and ID column
        Schema::table('case_studies', function (Blueprint $table) {
            $table->dropPrimary('case_studies_id_primary');
            $table->dropColumn('id');
        });

        // Rename UUID column to ID and make it primary
        Schema::table('case_studies', function (Blueprint $table) {
            $table->renameColumn('uuid', 'id');
            $table->primary('id');
        });
    }

    public function down(): void
    {
        // This migration cannot be reversed as it involves data transformation
        throw new \Exception('This migration cannot be reversed.');
    }
}; 