<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featuredImage',
        'categories',
        'status',
        'metaTitle',
        'metaDescription',
        'published_at',
    ];

    protected $casts = [
        'categories' => 'array',
        'published_at' => 'datetime',
    ];

    /**
     * The primary key type is string (UUID).
     */
    protected $keyType = 'string';
    public $incrementing = false;

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
