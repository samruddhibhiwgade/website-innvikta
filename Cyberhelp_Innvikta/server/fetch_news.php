<?php
/**
 * fetch_news.php
 * Run via CRON or manually to sync news from GNews to Local DB.
 * Usage: php server/fetch_news.php
 */

require __DIR__ . '/config.php';

// The API key is usually in a .env file for the frontend, 
// but for PHP we can either read that .env or define it here/in config.php.
// Given the setup, I'll try to read it from the .env file in the root.
$envFile = __DIR__ . '/../.env';
$apiKey = '';
if (file_exists($envFile)) {
    $lines = file($envFile);
    foreach ($lines as $line) {
        if (strpos(trim($line), 'VITE_GNEWS_API_KEY=') === 0) {
            $apiKey = substr(trim($line), strlen('VITE_GNEWS_API_KEY='));
            break;
        }
    }
}

if (!$apiKey) {
    die("Error: API Key not found in .env\n");
}

// We fetch 100 articles to increase the pool of potential news,
// but we will only save the first 6 "new" ones we find.
$query = urlencode('"cyber fraud" OR "cybercrime alert" OR "online scam"');
$url = "https://gnews.io/api/v4/search?q={$query}&lang=en&max=100&sortby=publishedAt&apikey={$apiKey}";

echo "Fetching latest news pool from GNews (searching 100 articles)...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if (!isset($data['articles'])) {
    die("Error: Could not fetch news. " . ($data['errors'][0] ?? 'Unknown error'));
}

$db = getDB();
$stmt = $db->prepare("
    INSERT IGNORE INTO cyber_news 
    (title, description, content, url, image, published_at, source_name)
    VALUES (:title, :description, :content, :url, :image, :published_at, :source_name)
");

$newCount = 0;
$targetNew = 6; // We want to add exactly 6 new ones per run

foreach ($data['articles'] as $article) {
    if ($newCount >= $targetNew) break; // STOP once we have reached our target

    // Format publishedAt to MySQL datetime
    $publishedAt = date('Y-m-d H:i:s', strtotime($article['publishedAt']));
    
    $success = $stmt->execute([
        ':title'        => $article['title'],
        ':description'  => $article['description'],
        ':content'      => $article['content'] ?? '',
        ':url'          => $article['url'],
        ':image'        => $article['image'] ?? '',
        ':published_at' => $publishedAt,
        ':source_name'  => $article['source']['name']
    ]);

    if ($success && $stmt->rowCount() > 0) {
        $newCount++;
    }
}

echo "Successfully added $newCount new articles to the database.\n";
