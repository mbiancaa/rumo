<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featuredImage' => 'nullable|string',
            'categories' => 'required|array',
            'status' => 'required|in:draft,published',
            'metaTitle' => 'nullable|string|max:60',
            'metaDescription' => 'nullable|string|max:150',
            'published_at' => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Titlul este obligatoriu.',
            'title.max' => 'Titlul nu poate depăși 255 de caractere.',
            'slug.required' => 'Slug-ul este obligatoriu.',
            'slug.unique' => 'Acest slug este deja folosit.',
            'content.required' => 'Conținutul este obligatoriu.',
            'categories.required' => 'Cel puțin o categorie trebuie selectată.',
            'status.required' => 'Statusul este obligatoriu.',
            'status.in' => 'Statusul trebuie să fie fie "draft" fie "publicat".',
            'metaTitle.required' => 'Meta titlul este obligatoriu.',
            'metaDescription.required' => 'Meta descrierea este obligatorie.',
            'metaTitle.max' => 'Meta titlul nu poate depăși 60 de caractere.',
            'metaDescription.max' => 'Meta descrierea nu poate depăși 150 de caractere.'
        ];
    }
}
