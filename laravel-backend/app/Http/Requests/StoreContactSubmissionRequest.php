<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Public route
    }

    public function rules(): array
    {
        return [
            'nume' => 'required|string|max:255',
            'prenume' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefon' => 'required|string|max:20|regex:/^[0-9+\-\s()]*$/',
            'website' => 'nullable|url|max:255',
            'mesaj' => 'required|string|min:10'
        ];
    }

    public function messages(): array
    {
        return [
            'nume.required' => 'Numele este obligatoriu.',
            'prenume.required' => 'Prenumele este obligatoriu.',
            'email.required' => 'Email-ul este obligatoriu.',
            'email.email' => 'Adresa de email nu este validă.',
            'telefon.required' => 'Numărul de telefon este obligatoriu.',
            'telefon.regex' => 'Numărul de telefon nu este valid.',
            'website.url' => 'Adresa website-ului nu este validă.',
            'mesaj.required' => 'Mesajul este obligatoriu.',
            'mesaj.min' => 'Mesajul trebuie să aibă cel puțin 10 caractere.'
        ];
    }
} 