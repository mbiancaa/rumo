<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogRequest extends FormRequest
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
            'title' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('blogs')->ignore($this->route('id')),
            ],
            'content' => 'sometimes|required|string',
            'excerpt' => 'sometimes|nullable|string',
            'featuredImage' => 'sometimes|nullable|string',
            'categories' => 'sometimes|required|array',
            'status' => 'sometimes|required|in:draft,published',
            'metaTitle' => 'sometimes|nullable|string|max:60',
            'metaDescription' => 'sometimes|nullable|string|max:150',
            'published_at' => 'sometimes|nullable|date',
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
