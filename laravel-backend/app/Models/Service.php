<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'heroText',
        'excerpt',
        'heading',
        'image',
        'content',
        'metaTitle',
        'metaDescription',
        'status',
        'parent_id'
    ];

    protected $casts = [
        'status' => 'string',
        'parent_id' => 'string'
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

    /**
     * Get the sub-services for this service.
     */
    public function subServices()
    {
        return $this->hasMany(Service::class, 'parent_id');
    }

    /**
     * Get the parent service.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'parent_id');
    }

    /**
     * Get the FAQs for this service.
     */
    public function faqs(): HasMany
    {
        return $this->hasMany(ServiceFaq::class);
    }

    /**
     * Get the children services.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Service::class, 'parent_id');
    }

    /**
     * Get all services in hierarchical format.
     */
    public static function getHierarchy()
    {
        $services = self::all();
        $topLevelServices = $services->whereNull('parent_id');
        
        return $topLevelServices->map(function ($service) use ($services) {
            $subServices = $services->where('parent_id', $service->id);
            return [
                'id' => $service->id,
                'parent_id' => $service->parent_id,
                'title' => $service->title,
                'image' => $service->image,
                'status' => $service->status,
                'sub_services' => $subServices->map(function ($subService) {
                    return [
                        'id' => $subService->id,
                        'parent_id' => $subService->parent_id,
                        'title' => $subService->title,
                        'image' => $subService->image,
                        'status' => $subService->status
                    ];
                })->values()->all()
            ];
        });
    }

    /**
     * Get sub-services for a given service.
     */
    public function getSubServices()
    {
        return $this->children()->with('faqs')->get();
    }
} 