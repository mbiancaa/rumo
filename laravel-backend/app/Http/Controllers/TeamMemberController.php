<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use App\Http\Requests\TeamMemberRequest;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeamMemberController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    /**
     * Display a listing of the team members.
     */
    public function index()
    {
        $members = TeamMember::select(['id', 'name', 'title', 'keyword', 'image', 'description'])
            ->orderBy('created_at')
            ->get();
        return response()->json($members);
    }

    /**
     * Display the specified team member.
     */
    public function show($id)
    {
        $member = TeamMember::select(['id', 'name', 'title', 'keyword', 'image', 'description'])
            ->find($id);
        
        if (!$member) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        return response()->json($member);
    }

    /**
     * Store a newly created team member.
     */
    public function store(TeamMemberRequest $request)
    {
        $member = TeamMember::create($request->validated());
        return response()->json($member, 201);
    }

    /**
     * Update the specified team member.
     */
    public function update(TeamMemberRequest $request, $id)
    {
        $member = TeamMember::find($id);
        
        if (!$member) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        // If image is being updated, delete the old image
        if ($request->has('image') && $member->image !== $request->image) {
            $this->imageService->delete($member->image);
        }

        $member->update($request->validated());
        return response()->json($member);
    }

    /**
     * Remove the specified team member.
     */
    public function destroy($id)
    {
        $member = TeamMember::find($id);
        
        if (!$member) {
            return response()->json(['message' => 'Team member not found'], 404);
        }

        // Delete the associated image
        $this->imageService->delete($member->image);

        $member->delete();
        return response()->json(['message' => 'Team member removed']);
    }

    /**
     * Upload a team member image.
     */
    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048' // 2MB max
        ], [
            'image.required' => 'Imaginea este obligatorie',
            'image.image' => 'Fișierul trebuie să fie o imagine',
            'image.mimes' => 'Doar .png, .jpg, .jpeg și .gif sunt permise',
            'image.max' => 'Dimensiunea maximă a imaginii este de 2MB'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        if (!$request->hasFile('image')) {
            return response()->json(['message' => 'No file uploaded'], 400);
        }

        try {
            $imageUrl = $this->imageService->upload($request->file('image'), 'team');
            return response()->json(['url' => $imageUrl]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error uploading image: ' . $e->getMessage()], 500);
        }
    }
} 