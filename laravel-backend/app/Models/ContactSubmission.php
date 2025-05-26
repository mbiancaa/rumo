<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class ContactSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'nume',
        'prenume',
        'email',
        'telefon',
        'website',
        'mesaj',
        'read'
    ];

    protected $casts = [
        'read' => 'boolean'
    ];

    /**
     * The primary key type is string (UUID).
     */
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * Boot function from Laravel.
     */
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
} 