<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCaseStudyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:case_studies,slug',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'perioada' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'services' => 'required|string|max:255',
            'status' => 'required|in:draft,published',
            'featuredImage' => 'nullable|string',
            'metaTitle' => 'required|string|max:60',
            'metaDescription' => 'required|string|max:150',
            'date' => 'nullable|date'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Titlul este obligatoriu.',
            'title.max' => 'Titlul nu poate depăși 255 de caractere.',
            'slug.required' => 'Slug-ul este obligatoriu.',
            'slug.unique' => 'Acest slug este deja folosit.',
            'content.required' => 'Conținutul este obligatoriu.',
            'excerpt.required' => 'Excerpt-ul este obligatoriu.',
            'perioada.required' => 'Perioada este obligatorie.',
            'industry.required' => 'Industria este obligatorie.',
            'services.required' => 'Serviciile sunt obligatorii.',
            'status.required' => 'Statusul este obligatoriu.',
            'status.in' => 'Statusul trebuie să fie fie "draft" fie "publicat".',
            'metaTitle.required' => 'Meta titlul este obligatoriu.',
            'metaTitle.max' => 'Meta titlul nu poate depăși 60 de caractere.',
            'metaDescription.required' => 'Meta descrierea este obligatorie.',
            'metaDescription.max' => 'Meta descrierea nu poate depăși 150 de caractere.'
        ];
    }
} 