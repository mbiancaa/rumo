<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Page\StoreRequest;
use App\Http\Requests\Page\UpdateRequest;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of all pages (admin only).
     */
    public function index(): JsonResponse
    {
        $pages = Page::select('id', 'slug', 'name', 'status')->get();
        return response()->json($pages);
    }

    /**
     * Display a listing of published pages (public).
     */
    public function getPublishedPages(): JsonResponse
    {
        $pages = Page::where('status', 'published')
            ->select('slug', 'name')
            ->get();
        return response()->json($pages);
    }

    /**
     * Store a newly created page in storage.
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $page = Page::create($request->validated());
        return response()->json($page, 201);
    }

    /**
     * Display the specified page by ID.
     */
    public function show(string $id): JsonResponse
    {
        $page = Page::findOrFail($id);
        return response()->json($page);
    }

    /**
     * Display the specified page by slug.
     */
    public function showBySlug(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)
            ->select(['name', 'slug', 'metaTitle', 'metaDescription', 'upperContent', 'lowerContent', 'status', 'created_at', 'updated_at'])
            ->firstOrFail();
        return response()->json($page);
    }

    /**
     * Update the specified page in storage.
     */
    public function update(UpdateRequest $request, string $id): JsonResponse
    {
        $page = Page::findOrFail($id);
        $page->update($request->validated());
        return response()->json($page);
    }

    /**
     * Remove the specified page from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $page = Page::findOrFail($id);
        $page->delete();
        return response()->json(null, 204);
    }
}
