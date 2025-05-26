<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if ($request->boolean('hierarchical')) {
            return [
                'id' => $this->id,
                'parent_id' => $this->parent_id,
                'title' => $this->title,
                'image' => $this->image,
                'status' => $this->status,
                'sub_services' => $this->when($this->children->isNotEmpty(), function () {
                    return ServiceResource::collection($this->children);
                }, [])
            ];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'heroText' => $this->heroText,
            'excerpt' => $this->excerpt,
            'heading' => $this->heading,
            'content' => $this->content,
            'metaTitle' => $this->metaTitle,
            'metaDescription' => $this->metaDescription,
            'status' => $this->status,
            'parent_id' => $this->parent_id,
            'image' => $this->image,
            'faqs' => ServiceFaqResource::collection($this->whenLoaded('faqs')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 