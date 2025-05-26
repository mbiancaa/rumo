<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization is handled by middleware
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'heroText' => 'required|string',
            'excerpt' => 'required|string',
            'heading' => 'required|string|max:255',
            'content' => 'required|string',
            'metaTitle' => 'required|string|max:60',
            'metaDescription' => 'required|string|max:150',
            'status' => 'required|in:draft,published',
            'parent_id' => 'nullable|exists:services,id',
            'image' => 'required|string',
            'faqs' => 'array',
            'faqs.*.question' => 'required|string',
            'faqs.*.answer' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Titlul este obligatoriu.',
            'heroText.required' => 'Textul hero este obligatoriu.',
            'excerpt.required' => 'Extrasul este obligatoriu.',
            'heading.required' => 'Titlul principal este obligatoriu.',
            'image.required' => 'Imaginea este obligatorie.',
            'content.required' => 'Conținutul este obligatoriu.',
            'metaTitle.required' => 'Meta titlul este obligatoriu.',
            'metaDescription.required' => 'Meta descrierea este obligatorie.',
            'status.required' => 'Statusul este obligatoriu.',
            'status.in' => 'Statusul trebuie să fie draft sau published.',
            'parent_id.exists' => 'Serviciul părinte nu există.',
            'faqs.*.question.required' => 'Întrebarea este obligatorie.',
            'faqs.*.answer.required' => 'Răspunsul este obligatoriu.'
        ];
    }
} 