<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Config;

class ImageService
{
    private ImageManager $imageManager;

    /**
     * Maximum image dimensions and quality
     */
    private const MAX_WIDTH = 900;
    private const MAX_HEIGHT = 900;
    private const QUALITY = 75;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * Upload and optimize an image
     *
     * @param UploadedFile $file
     * @param string $context The context of the upload (e.g., 'blog', 'team')
     * @return string The generated filename
     */
    public function upload(UploadedFile $file, string $context = 'uploads'): string
    {
        // Generate unique filename with context prefix
        $filename = $this->generateUniqueFilename($file, $context);
        
        // Create image instance
        $image = $this->imageManager->read($file);

        // Resize image if needed
        $this->resizeImage($image);

        // Optimize and save image
        $path = 'uploads/' . $filename;
        Storage::disk('public')->put($path, $image->toJpeg(self::QUALITY));
        
        return $filename;
    }

    /**
     * Delete an image from storage
     *
     * @param string $path
     * @return bool
     */
    public function delete(string $path): bool
    {
        if (empty($path)) {
            return false;
        }

        // Remove the storage URL prefix if it exists
        $path = str_replace(Storage::disk('public')->url(''), '', $path);
        return Storage::disk('public')->delete($path);
    }

    /**
     * Generate a unique filename for the uploaded file
     *
     * @param UploadedFile $file
     * @param string $context The context of the upload (e.g., 'blog', 'team')
     * @return string
     */
    private function generateUniqueFilename(UploadedFile $file, string $context): string
    {
        $extension = $file->getClientOriginalExtension();
        $uniqueId = Str::random(16);
        return $context . '-' . $uniqueId . '.' . $extension;
    }

    /**
     * Resize image if it exceeds maximum dimensions
     *
     * @param \Intervention\Image\Interfaces\ImageInterface $image
     * @return void
     */
    private function resizeImage($image): void
    {
        $width = $image->width();
        $height = $image->height();

        if ($width > self::MAX_WIDTH || $height > self::MAX_HEIGHT) {
            $image->scaleDown(self::MAX_WIDTH, self::MAX_HEIGHT);
        }
    }
} 