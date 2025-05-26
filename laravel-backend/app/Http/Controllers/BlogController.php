<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreBlogRequest;
use Illuminate\Http\JsonResponse;
use App\Services\ImageService;

class BlogController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = Blog::query();
        
        // Filter by status if publishedOnly is true
        if ($request->boolean('publishedOnly')) {
            $query->where('status', 'published');
        }
        
        // Filter by category if provided
        if ($request->has('category')) {
            $query->whereJsonContains('categories', $request->category);
        }
        
        // Get paginated results
        $page = $request->input('page', 1);
        $perPage = $request->input('limit', 6);
        $total = $query->count();
        $blogs = $query->select(['id', 'title', 'slug', 'excerpt', 'featuredImage', 'categories', 'created_at', 'status'])
                      ->orderBy('created_at', 'desc')
                      ->skip(($page - 1) * $perPage)
                      ->take($perPage)
                      ->get();
        
        return response()->json([
            'blogs' => $blogs,
            'currentPage' => (int)$page,
            'totalPages' => ceil($total / $perPage),
            'totalBlogs' => $total
        ]);
    }

    public function show(string $identifier): JsonResponse
    {
        $blog = Blog::where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->firstOrFail();
        return response()->json($blog);
    }

    public function store(StoreBlogRequest $request): JsonResponse
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

        $blog = Blog::create($validated);
        return response()->json($blog, 201);
    }

    public function update(Request $request, string $uuid): JsonResponse
    {
        $blog = Blog::where('id', $uuid)->firstOrFail();
        
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:blogs,slug,' . $uuid . ',id',
            'content' => 'sometimes|required|string',
            'excerpt' => 'sometimes|nullable|string',
            'featuredImage' => 'sometimes|nullable|string',
            'categories' => 'sometimes|required|array',
            'status' => 'sometimes|required|in:draft,published',
            'metaTitle' => 'sometimes|nullable|string|max:255',
            'metaDescription' => 'sometimes|nullable|string',
            'published_at' => 'sometimes|nullable|date',
        ]);

        // If featuredImage is a full URL, extract just the filename
        if (isset($validated['featuredImage']) && $validated['featuredImage']) {
            $validated['featuredImage'] = basename($validated['featuredImage']);
        }

        $blog->update($validated);
        return response()->json($blog);
    }

    public function destroy(string $uuid): JsonResponse
    {
        $blog = Blog::where('id', $uuid)->firstOrFail();
        $blog->delete();
        return response()->json(null, 204);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            try {
                $filename = $this->imageService->upload($request->file('image'), 'blog');
                return response()->json(['filename' => $filename]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error uploading image: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }
} 