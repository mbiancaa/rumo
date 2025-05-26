<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCaseStudyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('case_studies')->ignore($this->route('id')),
            ],
            'content' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'perioada' => 'sometimes|required|string|max:255',
            'industry' => 'sometimes|required|string|max:255',
            'services' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|in:draft,published',
            'featuredImage' => 'sometimes|nullable|string',
            'metaTitle' => 'sometimes|required|string|max:60',
            'metaDescription' => 'sometimes|required|string|max:150',
            'date' => 'sometimes|nullable|date'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Titlul este obligatoriu.',
            'title.max' => 'Titlul nu poate depăși 255 de caractere.',
            'slug.unique' => 'Acest slug este deja folosit.',
            'content.required' => 'Conținutul este obligatoriu.',
            'excerpt.required' => 'Excerpt-ul este obligatoriu.',
            'perioada.required' => 'Perioada este obligatorie.',
            'industry.required' => 'Industria este obligatorie.',
            'services.required' => 'Serviciile sunt obligatorii.',
            'status.required' => 'Statusul este obligatoriu.',
            'status.in' => 'Statusul trebuie să fie fie "draft" fie "publicat".',
            'featuredImage' => 'Image URL is sometimes nullable and sometimes a string.',
            'metaTitle.required' => 'Meta titlul este obligatoriu.',
            'metaTitle.max' => 'Meta titlul nu poate depăși 60 de caractere.',
            'metaDescription.required' => 'Meta descrierea este obligatorie.',
            'metaDescription.max' => 'Meta descrierea nu poate depăși 150 de caractere.'
        ];
    }
} 