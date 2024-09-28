<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->foreignIdFor(User::class)->nullable()->constrained();
            $table->string('type', 10)->nullable();
            $table->string('issn-isbn')->nullable();
            $table->string('doi')->nullable();
            $table->string('magazine_name')->nullable();
            $table->string('authors')->nullable();
            $table->dateTime('publication_date')->nullable();
            $table->string('period')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
