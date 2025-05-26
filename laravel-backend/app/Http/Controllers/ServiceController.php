<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index(Request $request): JsonResponse
    {
        $services = Service::whereNull('parent_id')
            ->where('status', 'published')
            ->select(['title', 'slug', 'excerpt', 'image'])
            ->get();

        return response()->json($services);
    }

    public function showById(string $id): JsonResponse
    {
        $service = Service::with('faqs')->findOrFail($id);
        return response()->json(new ServiceResource($service));
    }

    public function showBySlug(string $slug): JsonResponse
    {
        $service = Service::with('faqs')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json(new ServiceResource($service));
    }

    public function store(StoreServiceRequest $request): JsonResponse
    {
        $data = $request->validated();
        $service = Service::create($data);

        if (isset($data['faqs'])) {
            foreach ($data['faqs'] as $faq) {
                $service->faqs()->create($faq);
            }
        }

        return response()->json(new ServiceResource($service->load('faqs')), 201);
    }

    public function update(UpdateServiceRequest $request, string $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $data = $request->validated();

        // Handle image replacement if needed
        if (isset($data['image']) && $data['image'] !== $service->image) {
            // Delete old image
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
        }

        $service->update($data);

        // Update FAQs if provided
        if (isset($data['faqs'])) {
            // Delete existing FAQs
            $service->faqs()->delete();
            // Create new FAQs
            foreach ($data['faqs'] as $faq) {
                $service->faqs()->create($faq);
            }
        }

        return response()->json(new ServiceResource($service->load('faqs')));
    }

    public function destroy(string $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        // Delete all subservices first
        $subServices = Service::where('parent_id', $id)->get();
        foreach ($subServices as $subService) {
            // Delete associated image for each subservice
            if ($subService->image) {
                Storage::disk('public')->delete($subService->image);
            }
            $subService->delete();
        }

        // Delete associated image for main service
        if ($service->image) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return response()->json(null, 204);
    }

    /**
     * Upload a service image.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            try {
                $filename = $this->imageService->upload($request->file('image'), 'services');
                return response()->json(['url' => $filename]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error uploading image: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }

    public function getSubServices(string $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        return response()->json($service->getSubServices());
    }

    public function getHierarchy(): JsonResponse
    {
        // Get all services
        $services = Service::all();
        
        // Get top-level services (where parent_id is null)
        $topLevelServices = $services->whereNull('parent_id');
        
        // For each top-level service, find its subservices
        $servicesWithSubs = $topLevelServices->map(function ($service) use ($services) {
            $subServices = $services->where('parent_id', $service->id);
            return [
                'id' => $service->id,
                'parent_id' => $service->parent_id,
                'title' => $service->title,
                'image' => $service->image,
                'status' => $service->status,
                'sub_services' => $subServices->map(function ($subService) {
                    return [
                        'id' => $subService->id,
                        'parent_id' => $subService->parent_id,
                        'title' => $subService->title,
                        'image' => $subService->image,
                        'status' => $subService->status
                    ];
                })->values()->all()
            ];
        })->values()->all();

        return response()->json($servicesWithSubs);
    }

    public function getFooterServices(): JsonResponse
    {
        // Get all published services
        $services = Service::where('status', 'published')->get();
        
        // Get top-level services (where parent_id is null)
        $topLevelServices = $services->whereNull('parent_id');
        
        // For each top-level service, find its subservices
        $servicesWithSubs = $topLevelServices->map(function ($service) use ($services) {
            $subServices = $services->where('parent_id', $service->id);
            return [
                'title' => $service->title,
                'slug' => $service->slug,
                'sub_services' => $subServices->map(function ($subService) {
                    return [
                        'title' => $subService->title,
                        'slug' => $subService->slug
                    ];
                })->values()->all()
            ];
        })->values()->all();

        return response()->json($servicesWithSubs);
    }
} 