<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Image Upload Settings
    |--------------------------------------------------------------------------
    |
    | This file contains the configuration settings for image uploads
    |
    */

    'max_width' => env('IMAGE_MAX_WIDTH', 900),
    'max_height' => env('IMAGE_MAX_HEIGHT', 900),
    'quality' => env('IMAGE_QUALITY', 75),
    'allowed_types' => ['jpeg', 'jpg', 'png', 'gif'],
    'max_size' => env('IMAGE_MAX_SIZE', 2048), // 2MB in KB
]; 