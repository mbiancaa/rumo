<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreCaseStudyRequest;
use App\Http\Requests\UpdateCaseStudyRequest;
use App\Services\ImageService;

class CaseStudyController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = CaseStudy::query();
        
        // Filter by status if publishedOnly is true
        if ($request->boolean('publishedOnly')) {
            $query->where('status', 'published');
        }
        
        // Filter by industry if provided
        if ($request->has('industry')) {
            $query->where('industry', $request->industry);
        }
        
        // Get paginated results
        $page = $request->input('page', 1);
        $perPage = $request->input('limit', 6);
        $total = $query->count();
        $caseStudies = $query->select(['id', 'created_at', 'status', 'title', 'excerpt', 'slug', 'featuredImage'])
                      ->orderBy('created_at', 'desc')
                      ->skip(($page - 1) * $perPage)
                      ->take($perPage)
                      ->get();
        
        return response()->json([
            'caseStudies' => $caseStudies,
            'currentPage' => (int)$page,
            'totalPages' => ceil($total / $perPage),
            'totalCaseStudies' => $total
        ]);
    }

    public function show(string $identifier): JsonResponse
    {
        $caseStudy = CaseStudy::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
        return response()->json($caseStudy);
    }

    public function store(StoreCaseStudyRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        // Generate slug if not provided
        if (!isset($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        // If featuredImage is a full URL, extract just the filename
        if (isset($validated['featuredImage']) && $validated['featuredImage']) {
            $validated['featuredImage'] = basename($validated['featuredImage']);
        }

        $caseStudy = CaseStudy::create($validated);
        return response()->json($caseStudy, 201);
    }

    public function update(UpdateCaseStudyRequest $request, string $id): JsonResponse
    {
        $caseStudy = CaseStudy::findOrFail($id);
        
        $validated = $request->validated();

        // If featuredImage is a full URL, extract just the filename
        if (isset($validated['featuredImage']) && $validated['featuredImage']) {
            $validated['featuredImage'] = basename($validated['featuredImage']);
        }

        $caseStudy->update($validated);
        return response()->json($caseStudy);
    }

    public function destroy(string $id): JsonResponse
    {
        $caseStudy = CaseStudy::findOrFail($id);
        $caseStudy->delete();
        return response()->json(null, 204);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            try {
                $filename = $this->imageService->upload($request->file('image'), 'case-studies');
                return response()->json(['filename' => $filename]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error uploading image: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }

    /**
     * Get the first six case studies for header navigation.
     */
    public function getHeaderCaseStudies()
    {
        $caseStudies = CaseStudy::select(['id', 'title', 'slug'])
            ->where('status', 'published')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        return response()->json($caseStudies);
    }
} 