<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CaseStudyController;
use App\Http\Controllers\ContactSubmissionController;
use App\Http\Controllers\ServiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware([
    'auth:api',
    config('jetstream.auth_middleware'),
    'verified'
])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Public page routes
Route::get('/pages/published', [PageController::class, 'getPublishedPages']);
Route::get('/pages/{slug}', [PageController::class, 'showBySlug']);

// Protected routes
Route::middleware(['auth:api'])->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // User management routes
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    // Protected page management routes
    Route::get('/pages', [PageController::class, 'index']); // Admin route - returns all pages
    Route::post('/pages', [PageController::class, 'store']);
    Route::put('/pages/{id}', [PageController::class, 'update']);
    Route::delete('/pages/{id}', [PageController::class, 'destroy']);
    Route::get('/pages/id/{id}', [PageController::class, 'show']);
});

// Team Member Routes
Route::prefix('team')->group(function () {
    // Public routes
    Route::get('/', [TeamMemberController::class, 'index']);
    Route::get('/{id}', [TeamMemberController::class, 'show']);

    // Protected routes
    Route::middleware(['auth:api'])->group(function () {
        Route::post('/', [TeamMemberController::class, 'store']);
        Route::put('/{id}', [TeamMemberController::class, 'update']);
        Route::delete('/{id}', [TeamMemberController::class, 'destroy']);
        Route::post('/upload', [TeamMemberController::class, 'uploadImage']);
    });
});

// Blog routes
Route::prefix('blog')->group(function () {
    // Public routes
    Route::get('/', [BlogController::class, 'index']);
    Route::get('/{identifier}', [BlogController::class, 'show']);

    // Protected routes
    Route::middleware(['auth:api'])->group(function () {
        Route::post('/', [BlogController::class, 'store']);
        Route::put('/{uuid}', [BlogController::class, 'update']);
        Route::delete('/{uuid}', [BlogController::class, 'destroy']);
        Route::post('/upload', [BlogController::class, 'uploadImage']);
    });
});

// Case Studies routes
Route::prefix('case-studies')->group(function () {
    // Public routes
    Route::get('/header', [CaseStudyController::class, 'getHeaderCaseStudies']);
    Route::get('/', [CaseStudyController::class, 'index']);
    Route::get('/{identifier}', [CaseStudyController::class, 'show']);

    // Protected routes
    Route::middleware(['auth:api'])->group(function () {
        Route::post('/', [CaseStudyController::class, 'store']);
        Route::put('/{uuid}', [CaseStudyController::class, 'update']);
        Route::delete('/{uuid}', [CaseStudyController::class, 'destroy']);
        Route::post('/upload', [CaseStudyController::class, 'uploadImage']);
    });
});

// Contact Submissions routes
Route::prefix('contact-submissions')->group(function () {
    Route::post('/', [ContactSubmissionController::class, 'store']);
    Route::get('/dashboard', [ContactSubmissionController::class, 'dashboard'])->middleware(['auth:api']);
    Route::get('/', [ContactSubmissionController::class, 'index'])->middleware(['auth:api']);
    Route::put('/{uuid}', [ContactSubmissionController::class, 'update'])->middleware(['auth:api']);
    Route::delete('/{uuid}', [ContactSubmissionController::class, 'destroy'])->middleware(['auth:api']);
});

// Services routes
Route::prefix('services')->group(function () {
    // Public routes
    Route::get('/', [ServiceController::class, 'index']);
    Route::get('/hierarchy', [ServiceController::class, 'getHierarchy']);
    Route::get('/footer', [ServiceController::class, 'getFooterServices']);
    Route::get('/{slug}', [ServiceController::class, 'showBySlug']);

    // Protected routes
    Route::middleware(['auth:api'])->group(function () {
        Route::get('/id/{id}', [ServiceController::class, 'showById']);
        Route::post('/', [ServiceController::class, 'store']);
        Route::put('/{id}', [ServiceController::class, 'update']);
        Route::delete('/{id}', [ServiceController::class, 'destroy']);
        Route::post('/upload', [ServiceController::class, 'uploadImage']);
    });
});

