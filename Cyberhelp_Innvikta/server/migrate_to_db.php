<?php
/**
 * migrate_to_db.php
 * Switch CMS content storage from local JSON files to the MySQL database.
 * Run once on the server: php Cyberhelp_Innvikta/server/migrate_to_db.php
 */

require __DIR__ . '/config.php';
$db = getDB();

echo "Starting CMS Database Migration...\n";

// ─────────────────────────────────────────────────────────────────────────────
// 1. ADD ARCHIVED COLUMN TO BLOGS TABLE IF NOT EXISTS
// ─────────────────────────────────────────────────────────────────────────────
try {
    $db->exec("ALTER TABLE blogs ADD COLUMN archived TINYINT(1) DEFAULT 0 AFTER draft");
    echo "✓ Added 'archived' column to blogs table.\n";
} catch (Exception $e) {
    echo "• Note: 'archived' column in blogs table already exists or could not be added: " . $e->getMessage() . "\n";
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CREATE NEW TABLES
// ─────────────────────────────────────────────────────────────────────────────

// Case Studies
$db->exec("
CREATE TABLE IF NOT EXISTS case_studies (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) DEFAULT '',
    industry VARCHAR(100) DEFAULT 'BFSI',
    industry_label VARCHAR(100) DEFAULT '',
    description TEXT,
    image VARCHAR(255) DEFAULT '',
    location VARCHAR(100) DEFAULT '',
    timeline VARCHAR(100) DEFAULT '',
    pdf_url VARCHAR(255) DEFAULT '',
    hero_image VARCHAR(255) DEFAULT '',
    archived TINYINT(1) DEFAULT 0,
    metadata_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
echo "✓ Verified case_studies table.\n";

// Platform Updates
$db->exec("
CREATE TABLE IF NOT EXISTS platform_updates (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'PRODUCT',
    date_text VARCHAR(100) DEFAULT '',
    desc_text TEXT,
    image VARCHAR(255) DEFAULT '',
    graphic_text VARCHAR(255) DEFAULT '',
    archived TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
echo "✓ Verified platform_updates table.\n";

// Newsletters
$db->exec("
CREATE TABLE IF NOT EXISTS newsletters (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    date_text VARCHAR(100) DEFAULT '',
    read_time VARCHAR(50) DEFAULT '5 min read',
    author VARCHAR(100) DEFAULT 'Compliance Team',
    category VARCHAR(100) DEFAULT 'Insights',
    image VARCHAR(255) DEFAULT '',
    show_cta TINYINT(1) DEFAULT 1,
    cta_title VARCHAR(255) DEFAULT '',
    cta_description TEXT,
    cta_button_text VARCHAR(100) DEFAULT '',
    cta_button_url VARCHAR(255) DEFAULT '',
    archived TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");
echo "✓ Verified newsletters table.\n";


// ─────────────────────────────────────────────────────────────────────────────
// 3. SEED DATA FROM JSON FILES
// ─────────────────────────────────────────────────────────────────────────────

$contentDir = __DIR__ . '/../../content';

// A. Migrate Case Studies
$casesFile = $contentDir . '/case-studies.json';
if (file_exists($casesFile)) {
    $casesData = json_decode(file_exists($casesFile) ? file_get_contents($casesFile) : '[]', true);
    if (is_array($casesData)) {
        $stmt = $db->prepare("
            INSERT INTO case_studies (
                id, slug, title, subtitle, industry, industry_label, description,
                image, location, timeline, pdf_url, hero_image, archived, metadata_json
            ) VALUES (
                :id, :slug, :title, :subtitle, :industry, :industry_label, :description,
                :image, :location, :timeline, :pdf_url, :hero_image, :archived, :metadata_json
            ) ON DUPLICATE KEY UPDATE 
                slug = VALUES(slug), title = VALUES(title), subtitle = VALUES(subtitle),
                industry = VALUES(industry), industry_label = VALUES(industry_label),
                description = VALUES(description), image = VALUES(image), location = VALUES(location),
                timeline = VALUES(timeline), pdf_url = VALUES(pdf_url), hero_image = VALUES(hero_image),
                archived = VALUES(archived), metadata_json = VALUES(metadata_json)
        ");
        
        $count = 0;
        foreach ($casesData as $item) {
            if (empty($item['title'])) continue;
            $slug = $item['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/', '-', $item['title']));
            $slug = trim($slug, '-');
            
            // Collect metadata fields
            $metaFields = [
                'atGlance' => $item['atGlance'] ?? [],
                'summaryTitle' => $item['summaryTitle'] ?? '',
                'textAlignment' => $item['textAlignment'] ?? 'justify',
                'summaryParagraphs' => $item['summaryParagraphs'] ?? [],
                'challengeTitle' => $item['challengeTitle'] ?? '',
                'challengeParagraphs' => $item['challengeParagraphs'] ?? [],
                'solutionTitle' => $item['solutionTitle'] ?? 'Solution Section',
                'solutionParagraphs' => $item['solutionParagraphs'] ?? [],
                'sidebarChallenge' => $item['sidebarChallenge'] ?? '',
                'sidebarDetails' => $item['sidebarDetails'] ?? [],
                'quoteText' => $item['quoteText'] ?? '',
                'quoteAuthor' => $item['quoteAuthor'] ?? '',
                'customSections' => $item['customSections'] ?? [],
                'cultureTitle' => $item['cultureTitle'] ?? 'Building a Stronger Security Culture',
                'cultureParagraphs' => $item['cultureParagraphs'] ?? [],
                'cultureImage' => $item['cultureImage'] ?? '/images/about-bg.jpeg',
                'ctaTitle' => $item['ctaTitle'] ?? '',
                'ctaDescription' => $item['ctaDescription'] ?? '',
                'ctaButtonText' => $item['ctaButtonText'] ?? '',
                'ctaButtonUrl' => $item['ctaButtonUrl'] ?? ''
            ];
            
            $stmt->execute([
                ':id' => $item['id'] ?? null,
                ':slug' => $slug,
                ':title' => $item['title'],
                ':subtitle' => $item['subtitle'] ?? '',
                ':industry' => $item['industry'] ?? 'BFSI',
                ':industry_label' => $item['industryLabel'] ?? 'Banking & Finance',
                ':description' => $item['description'] ?? '',
                ':image' => $item['image'] ?? '',
                ':location' => $item['location'] ?? '',
                ':timeline' => $item['timeline'] ?? '',
                ':pdf_url' => $item['pdfUrl'] ?? '',
                ':hero_image' => $item['heroImage'] ?? '',
                ':archived' => isset($item['archived']) ? (int)$item['archived'] : 0,
                ':metadata_json' => json_encode($metaFields)
            ]);
            $count++;
        }
        echo "✓ Migrated $count Case Studies from JSON to MySQL.\n";
    }
}

// B. Migrate Platform Updates
$updatesFile = $contentDir . '/platform-updates.json';
if (file_exists($updatesFile)) {
    $updatesData = json_decode(file_get_contents($updatesFile), true);
    if (is_array($updatesData)) {
        $stmt = $db->prepare("
            INSERT INTO platform_updates (
                id, slug, title, category, date_text, desc_text, image, graphic_text, archived
            ) VALUES (
                :id, :slug, :title, :category, :date_text, :desc_text, :image, :graphic_text, :archived
            ) ON DUPLICATE KEY UPDATE
                slug = VALUES(slug), title = VALUES(title), category = VALUES(category),
                date_text = VALUES(date_text), desc_text = VALUES(desc_text), image = VALUES(image),
                graphic_text = VALUES(graphic_text), archived = VALUES(archived)
        ");
        
        $count = 0;
        foreach ($updatesData as $item) {
            if (empty($item['title'])) continue;
            $slug = $item['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/', '-', $item['title']));
            $slug = trim($slug, '-');
            
            $stmt->execute([
                ':id' => $item['id'] ?? null,
                ':slug' => $slug,
                ':title' => $item['title'],
                ':category' => $item['category'] ?? 'PRODUCT',
                ':date_text' => $item['date'] ?? '',
                ':desc_text' => $item['desc'] ?? '',
                ':image' => $item['image'] ?? '',
                ':graphic_text' => $item['graphicText'] ?? '',
                ':archived' => isset($item['archived']) ? (int)$item['archived'] : 0
            ]);
            $count++;
        }
        echo "✓ Migrated $count Platform Updates from JSON to MySQL.\n";
    }
}

// C. Migrate Newsletters
$newsFile = $contentDir . '/newsletters.json';
if (file_exists($newsFile)) {
    $newsData = json_decode(file_get_contents($newsFile), true);
    if (is_array($newsData)) {
        $stmt = $db->prepare("
            INSERT INTO newsletters (
                id, slug, title, description, content, date_text, read_time, author, 
                category, image, show_cta, cta_title, cta_description, cta_button_text, cta_button_url, archived
            ) VALUES (
                :id, :slug, :title, :description, :content, :date_text, :read_time, :author,
                :category, :image, :show_cta, :cta_title, :cta_description, :cta_button_text, :cta_button_url, :archived
            ) ON DUPLICATE KEY UPDATE
                slug = VALUES(slug), title = VALUES(title), description = VALUES(description),
                content = VALUES(content), date_text = VALUES(date_text), read_time = VALUES(read_time),
                author = VALUES(author), category = VALUES(category), image = VALUES(image),
                show_cta = VALUES(show_cta), cta_title = VALUES(cta_title), cta_description = VALUES(cta_description),
                cta_button_text = VALUES(cta_button_text), cta_button_url = VALUES(cta_button_url),
                archived = VALUES(archived)
        ");
        
        $count = 0;
        foreach ($newsData as $item) {
            if (empty($item['title'])) continue;
            $slug = $item['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/', '-', $item['title']));
            $slug = trim($slug, '-');
            
            $stmt->execute([
                ':id' => $item['id'] ?? null,
                ':slug' => $slug,
                ':title' => $item['title'],
                ':description' => $item['description'] ?? '',
                ':content' => $item['content'] ?? '',
                ':date_text' => $item['date'] ?? '',
                ':read_time' => $item['readTime'] ?? '5 min read',
                ':author' => $item['author'] ?? 'Compliance Team',
                ':category' => $item['category'] ?? 'Insights',
                ':image' => $item['image'] ?? '',
                ':show_cta' => isset($item['showCta']) ? (int)$item['showCta'] : 1,
                ':cta_title' => $item['ctaTitle'] ?? '',
                ':cta_description' => $item['ctaDescription'] ?? '',
                ':cta_button_text' => $item['ctaButtonText'] ?? '',
                ':cta_button_url' => $item['ctaButtonUrl'] ?? '',
                ':archived' => isset($item['archived']) ? (int)$item['archived'] : 0
            ]);
            $count++;
        }
        echo "✓ Migrated $count Newsletters from JSON to MySQL.\n";
    }
}

echo "CMS Database Migration completed successfully!\n";
