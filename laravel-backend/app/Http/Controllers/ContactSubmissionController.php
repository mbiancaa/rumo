<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use App\Models\Blog;
use App\Models\CaseStudy;
use App\Models\Service;
use App\Models\Page;
use App\Http\Requests\StoreContactSubmissionRequest;
use App\Http\Resources\ContactSubmissionResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ContactSubmissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ContactSubmission::query();
        
        // Get paginated results
        $page = $request->input('page', 1);
        $perPage = $request->input('limit', 10);
        $total = $query->count();
        $submissions = $query->orderBy('created_at', 'desc')
                           ->skip(($page - 1) * $perPage)
                           ->take($perPage)
                           ->get();
        
        return response()->json([
            'submissions' => ContactSubmissionResource::collection($submissions),
            'currentPage' => (int)$page,
            'totalPages' => ceil($total / $perPage),
            'totalSubmissions' => $total
        ]);
    }

    public function store(StoreContactSubmissionRequest $request): JsonResponse
    {
        $submission = ContactSubmission::create($request->validated());
        return response()->json(new ContactSubmissionResource($submission), 201);
    }

    public function update(Request $request, string $uuid): JsonResponse
    {
        $submission = ContactSubmission::where('id', $uuid)->firstOrFail();
        
        $validated = $request->validate([
            'read' => 'required|boolean'
        ]);

        $submission->update($validated);
        return response()->json(new ContactSubmissionResource($submission));
    }

    public function destroy(string $uuid): JsonResponse
    {
        $submission = ContactSubmission::where('id', $uuid)->firstOrFail();
        $submission->delete();
        return response()->json(null, 204);
    }

    public function dashboard(): JsonResponse
    {
        $stats = [
            'articles' => Blog::where('status', 'published')->count(),
            'caseStudies' => CaseStudy::where('status', 'published')->count(),
            'services' => Service::where('status', 'published')->count(),
            'pages' => Page::where('status', 'published')->count(),
        ];

        // Only include submissions for admin users
        if (Auth::user() && Auth::user()->role === 'admin') {
            $stats['submissions'] = ContactSubmission::where('read', false)
                ->orderBy('created_at', 'desc')
                ->take(3)
                ->get();
        }

        return response()->json($stats);
    }
} 