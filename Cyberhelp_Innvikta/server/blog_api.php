<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM blogs ORDER BY published_at DESC");
    $blogs = $stmt->fetchAll();
    
    $posts = [];
    foreach ($blogs as $blog) {
        $slug = str_replace('.md', '', $blog['filename']);
        $categories = $blog['categories'] ? json_decode($blog['categories'], true) : [];
        
        $posts[] = [
            'filename' => $blog['filename'],
            'slug' => $slug,
            'frontmatter' => [
                'title' => $blog['title'],
                'image' => $blog['image'],
                'author' => [
                    'name' => $blog['author_name'] ?: 'Admin',
                    'avatar' => '/images/author/derick.jpg'
                ],
                'date' => $blog['published_at'] ? date('c', strtotime($blog['published_at'])) : null,
                'draft' => (bool)$blog['draft'],
                'categories' => $categories,
                'metaDescription' => $blog['meta_description'] ?: ""
            ],
            'content' => $blog['content']
        ];
    }
    jsonResponse(['posts' => $posts]);
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || !isset($data['title']) || !isset($data['content'])) {
        jsonResponse(['error' => 'Title and content are required'], 400);
    }

    $title = $data['title'];
    $slug = strtolower(preg_replace('/[^a-z0-9]+/', '-', $title));
    $slug = trim($slug, '-');
    
    $new_filename = $slug . '.md';
    $old_filename = !empty($data['filename']) ? $data['filename'] : '';

    if ($old_filename && $old_filename !== $new_filename) {
        $stmt = $db->prepare("UPDATE blogs SET filename = :new_filename WHERE filename = :old_filename");
        $stmt->execute([':new_filename' => $new_filename, ':old_filename' => $old_filename]);
    }

    $filename = $new_filename;

    $categories = !empty($data['categories']) ? $data['categories'] : ['Security'];
    if (!is_array($categories)) {
        $categories = [$categories];
    }

    $authorName = !empty($data['authorName']) ? $data['authorName'] : 'Admin';
    $image = !empty($data['image']) ? $data['image'] : '/images/blog/01.jpg';
    $draft = isset($data['draft']) ? (int)$data['draft'] : 0;
    $metaDescription = $data['metaDescription'] ?? '';
    
    $date = !empty($data['date']) ? $data['date'] : date('Y-m-d H:i:s');
    $publishedAt = date('Y-m-d H:i:s', strtotime($date));

    $stmt = $db->prepare("
        INSERT INTO blogs (filename, title, content, categories, author_name, image, draft, meta_description, published_at)
        VALUES (:filename, :title, :content, :categories, :author_name, :image, :draft, :meta_description, :published_at)
        ON DUPLICATE KEY UPDATE 
            title = VALUES(title),
            content = VALUES(content),
            categories = VALUES(categories),
            author_name = VALUES(author_name),
            image = VALUES(image),
            draft = VALUES(draft),
            meta_description = VALUES(meta_description),
            published_at = VALUES(published_at)
    ");

    $success = $stmt->execute([
        ':filename' => $filename,
        ':title' => $title,
        ':content' => $data['content'],
        ':categories' => json_encode($categories),
        ':author_name' => $authorName,
        ':image' => $image,
        ':draft' => $draft,
        ':meta_description' => $metaDescription,
        ':published_at' => $publishedAt
    ]);

    if ($success) {
        jsonResponse(['success' => true, 'filename' => $filename]);
    } else {
        jsonResponse(['error' => 'Failed to save blog'], 500);
    }
}

if ($method === 'DELETE') {
    $filename = $_GET['filename'] ?? '';
    if (!$filename) {
        jsonResponse(['error' => 'Filename is required'], 400);
    }

    $stmt = $db->prepare("DELETE FROM blogs WHERE filename = :filename");
    $success = $stmt->execute([':filename' => $filename]);

    if ($success && $stmt->rowCount() > 0) {
        jsonResponse(['success' => true]);
    } else {
        jsonResponse(['error' => 'File not found'], 404);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);
