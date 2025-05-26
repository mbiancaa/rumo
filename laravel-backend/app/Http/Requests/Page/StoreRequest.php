<?php

namespace App\Http\Requests\Page;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug',
            'metaTitle' => 'required|string|max:60',
            'metaDescription' => 'required|string|max:150',
            'upperContent' => 'nullable|string',
            'lowerContent' => 'nullable|string',
            'status' => 'nullable|in:draft,published',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Numele paginii este obligatoriu.',
            'slug.required' => 'URL-ul paginii este obligatoriu.',
            'slug.unique' => 'URL-ul paginii este deja în uz.',
            'metaTitle.required' => 'Meta titlul este obligatoriu.',
            'metaTitle.max' => 'Meta titlul nu poate depăși 60 de caractere.',
            'metaDescription.required' => 'Meta descrierea este obligatorie.',
            'metaDescription.max' => 'Meta descrierea nu poate depăși 150 de caractere.',
            'status.in' => 'Statusul paginii trebuie să fie fie draft sau publicat.',
        ];
    }
}
