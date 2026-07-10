<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        jsonResponse(['error' => 'No file uploaded or upload error.'], 400);
    }

    $file = $_FILES['file'];
    $filename = preg_replace('/[^a-zA-Z0-9.]/', '_', $file['name']);
    
    // Validate file is an image (optional but recommended)
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    $mimeType = mime_content_type($file['tmp_name']);
    
    if (!in_array($mimeType, $allowedMimeTypes)) {
        jsonResponse(['error' => 'Invalid file type. Only images are allowed.'], 400);
    }

    $uploadDir = __DIR__ . '/uploads/blog/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filePath = $uploadDir . $filename;
    
    // Prevent overwriting files by appending timestamp if needed
    if (file_exists($filePath)) {
        $filename = time() . '_' . $filename;
        $filePath = $uploadDir . $filename;
    }

    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        // Return relative path. The Next.js API will prefix it with NEXT_PUBLIC_PHP_BACKEND_URL
        $fileUrl = '/uploads/blog/' . $filename;

        jsonResponse(['success' => true, 'url' => $fileUrl]);
    } else {
        jsonResponse(['error' => 'Failed to move uploaded file.'], 500);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);
