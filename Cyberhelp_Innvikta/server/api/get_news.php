<?php
/**
 * api/get_news.php
 * Returns the latest 9 cyber news articles from the local database.
 */

require __DIR__ . '/../config.php';

setCORSHeaders();

try {
    $db = getDB();
    
    // Check if table exists to avoid SQL error page
    $tableCheck = $db->query("SHOW TABLES LIKE 'cyber_news'")->fetch();
    if (!$tableCheck) {
        throw new Exception("The 'cyber_news' table does not exist. Please run setup_db.php on your server.");
    }

    $stmt = $db->query("
        SELECT id, title, description as summary, content, url, image, published_at as date, source_name as source
        FROM cyber_news
        ORDER BY published_at DESC
        LIMIT 1000
    ");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format the data for the frontend
    foreach ($news as &$item) {
        $item['id'] = 'db-' . $item['id'];
        $item['category'] = 'Latest News';
        $item['date'] = date('F d, Y', strtotime($item['date']));
        // Prepare content structure
        $item['content'] = [
            'description' => $item['content'],
            'source'      => $item['source'],
            'url'         => $item['url'],
            'image'       => $item['image']
        ];
    }

    jsonResponse($news);
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}
