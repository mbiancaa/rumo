<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactSubmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nume' => $this->nume,
            'prenume' => $this->prenume,
            'email' => $this->email,
            'telefon' => $this->telefon,
            'website' => $this->website,
            'mesaj' => $this->mesaj,
            'read' => $this->read,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
} 