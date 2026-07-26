<?php
require __DIR__ . '/config.php';
setCORSHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$type = $_GET['type'] ?? '';

if (!in_array($type, ['cases', 'updates', 'newsletters'])) {
    jsonResponse(['error' => 'Invalid type parameter'], 400);
}

// ─────────────────────────────────────────────────────────────────────────────
// GET Request (Read All)
// ─────────────────────────────────────────────────────────────────────────────
if ($method === 'GET') {
    if ($type === 'cases') {
        $stmt = $db->query("SELECT * FROM case_studies ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $meta = $row['metadata_json'] ? json_decode($row['metadata_json'], true) : [];
            unset($row['metadata_json']);
            
            // Map table snake_case/distinct names back to Next.js API properties
            $item = [
                'id' => (int)$row['id'],
                'slug' => $row['slug'],
                'title' => $row['title'],
                'subtitle' => $row['subtitle'],
                'industry' => $row['industry'],
                'industryLabel' => $row['industry_label'],
                'description' => $row['description'],
                'image' => $row['image'],
                'location' => $row['location'],
                'timeline' => $row['timeline'],
                'pdfUrl' => $row['pdf_url'],
                'heroImage' => $row['hero_image'],
                'archived' => (bool)$row['archived']
            ];
            
            $result[] = array_merge($item, $meta);
        }
        jsonResponse($result);
    } 
    elseif ($type === 'updates') {
        $stmt = $db->query("SELECT * FROM platform_updates ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[] = [
                'id' => (int)$row['id'],
                'slug' => $row['slug'],
                'title' => $row['title'],
                'category' => $row['category'],
                'date' => $row['date_text'],
                'desc' => $row['desc_text'],
                'image' => $row['image'],
                'graphicText' => $row['graphic_text'],
                'archived' => (bool)$row['archived']
            ];
        }
        jsonResponse($result);
    } 
    elseif ($type === 'newsletters') {
        $stmt = $db->query("SELECT * FROM newsletters ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        $result = [];
        foreach ($rows as $row) {
            $result[] = [
                'id' => (int)$row['id'],
                'slug' => $row['slug'],
                'title' => $row['title'],
                'description' => $row['description'],
                'content' => $row['content'],
                'date' => $row['date_text'],
                'readTime' => $row['read_time'],
                'author' => $row['author'],
                'category' => $row['category'],
                'image' => $row['image'],
                'showCta' => (bool)$row['show_cta'],
                'ctaTitle' => $row['cta_title'],
                'ctaDescription' => $row['cta_description'],
                'ctaButtonText' => $row['cta_button_text'],
                'ctaButtonUrl' => $row['cta_button_url'],
                'archived' => (bool)$row['archived']
            ];
        }
        jsonResponse($result);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST Request (Create or Update)
// ─────────────────────────────────────────────────────────────────────────────
if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        jsonResponse(['error' => 'Invalid JSON input'], 400);
    }

    if ($type === 'cases') {
        if (empty($data['title'])) {
            jsonResponse(['error' => 'Title is required'], 400);
        }
        $slug = !empty($data['slug']) ? $data['slug'] : strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
        $slug = trim($slug, '-');

        // Extract metadata fields to serialize
        $metaFields = [
            'atGlance' => $data['atGlance'] ?? [],
            'summaryTitle' => $data['summaryTitle'] ?? '',
            'textAlignment' => $data['textAlignment'] ?? 'justify',
            'summaryParagraphs' => $data['summaryParagraphs'] ?? [],
            'challengeTitle' => $data['challengeTitle'] ?? '',
            'challengeParagraphs' => $data['challengeParagraphs'] ?? [],
            'solutionTitle' => $data['solutionTitle'] ?? 'Solution Section',
            'solutionParagraphs' => $data['solutionParagraphs'] ?? [],
            'sidebarChallenge' => $data['sidebarChallenge'] ?? '',
            'sidebarDetails' => $data['sidebarDetails'] ?? [],
            'quoteText' => $data['quoteText'] ?? '',
            'quoteAuthor' => $data['quoteAuthor'] ?? '',
            'customSections' => $data['customSections'] ?? [],
            'cultureTitle' => $data['cultureTitle'] ?? 'Building a Stronger Security Culture',
            'cultureParagraphs' => $data['cultureParagraphs'] ?? [],
            'cultureImage' => $data['cultureImage'] ?? '/images/about-bg.jpeg',
            'ctaTitle' => $data['ctaTitle'] ?? '',
            'ctaDescription' => $data['ctaDescription'] ?? '',
            'ctaButtonText' => $data['ctaButtonText'] ?? '',
            'ctaButtonUrl' => $data['ctaButtonUrl'] ?? ''
        ];

        $stmt = $db->prepare("
            INSERT INTO case_studies (
                id, slug, title, subtitle, industry, industry_label, description, 
                image, location, timeline, pdf_url, hero_image, archived, metadata_json
            ) VALUES (
                :id, :slug, :title, :subtitle, :industry, :industry_label, :description,
                :image, :location, :timeline, :pdf_url, :hero_image, :archived, :metadata_json
            ) ON DUPLICATE KEY UPDATE 
                slug = VALUES(slug),
                title = VALUES(title),
                subtitle = VALUES(subtitle),
                industry = VALUES(industry),
                industry_label = VALUES(industry_label),
                description = VALUES(description),
                image = VALUES(image),
                location = VALUES(location),
                timeline = VALUES(timeline),
                pdf_url = VALUES(pdf_url),
                hero_image = VALUES(hero_image),
                archived = VALUES(archived),
                metadata_json = VALUES(metadata_json)
        ");

        $id = !empty($data['id']) ? (int)$data['id'] : null;
        $success = $stmt->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':title' => $data['title'],
            ':subtitle' => $data['subtitle'] ?? '',
            ':industry' => $data['industry'] ?? 'BFSI',
            ':industry_label' => $data['industryLabel'] ?? 'Banking & Finance',
            ':description' => $data['description'] ?? '',
            ':image' => $data['image'] ?? '',
            ':location' => $data['location'] ?? '',
            ':timeline' => $data['timeline'] ?? '',
            ':pdf_url' => $data['pdfUrl'] ?? '',
            ':hero_image' => $data['heroImage'] ?? '',
            ':archived' => isset($data['archived']) ? (int)$data['archived'] : 0,
            ':metadata_json' => json_encode($metaFields)
        ]);

        if ($success) {
            jsonResponse(['success' => true]);
        } else {
            jsonResponse(['error' => 'Failed to save case study'], 500);
        }
    } 
    elseif ($type === 'updates') {
        if (empty($data['title'])) {
            jsonResponse(['error' => 'Title is required'], 400);
        }
        $slug = !empty($data['slug']) ? $data['slug'] : strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
        $slug = trim($slug, '-');

        $stmt = $db->prepare("
            INSERT INTO platform_updates (
                id, slug, title, category, date_text, desc_text, image, graphic_text, archived
            ) VALUES (
                :id, :slug, :title, :category, :date_text, :desc_text, :image, :graphic_text, :archived
            ) ON DUPLICATE KEY UPDATE
                slug = VALUES(slug),
                title = VALUES(title),
                category = VALUES(category),
                date_text = VALUES(date_text),
                desc_text = VALUES(desc_text),
                image = VALUES(image),
                graphic_text = VALUES(graphic_text),
                archived = VALUES(archived)
        ");

        $id = !empty($data['id']) ? (int)$data['id'] : null;
        $success = $stmt->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':title' => $data['title'],
            ':category' => $data['category'] ?? 'PRODUCT',
            ':date_text' => $data['date'] ?? '',
            ':desc_text' => $data['desc'] ?? '',
            ':image' => $data['image'] ?? '',
            ':graphic_text' => $data['graphicText'] ?? '',
            ':archived' => isset($data['archived']) ? (int)$data['archived'] : 0
        ]);

        if ($success) {
            jsonResponse(['success' => true]);
        } else {
            jsonResponse(['error' => 'Failed to save platform update'], 500);
        }
    } 
    elseif ($type === 'newsletters') {
        if (empty($data['title'])) {
            jsonResponse(['error' => 'Title is required'], 400);
        }
        $slug = !empty($data['slug']) ? $data['slug'] : strtolower(preg_replace('/[^a-z0-9]+/', '-', $data['title']));
        $slug = trim($slug, '-');

        $stmt = $db->prepare("
            INSERT INTO newsletters (
                id, slug, title, description, content, date_text, read_time, author, 
                category, image, show_cta, cta_title, cta_description, cta_button_text, cta_button_url, archived
            ) VALUES (
                :id, :slug, :title, :description, :content, :date_text, :read_time, :author,
                :category, :image, :show_cta, :cta_title, :cta_description, :cta_button_text, :cta_button_url, :archived
            ) ON DUPLICATE KEY UPDATE
                slug = VALUES(slug),
                title = VALUES(title),
                description = VALUES(description),
                content = VALUES(content),
                date_text = VALUES(date_text),
                read_time = VALUES(read_time),
                author = VALUES(author),
                category = VALUES(category),
                image = VALUES(image),
                show_cta = VALUES(show_cta),
                cta_title = VALUES(cta_title),
                cta_description = VALUES(cta_description),
                cta_button_text = VALUES(cta_button_text),
                cta_button_url = VALUES(cta_button_url),
                archived = VALUES(archived)
        ");

        $id = !empty($data['id']) ? (int)$data['id'] : null;
        $success = $stmt->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':title' => $data['title'],
            ':description' => $data['description'] ?? '',
            ':content' => $data['content'] ?? '',
            ':date_text' => $data['date'] ?? '',
            ':read_time' => $data['readTime'] ?? '5 min read',
            ':author' => $data['author'] ?? 'Compliance Team',
            ':category' => $data['category'] ?? 'Insights',
            ':image' => $data['image'] ?? '',
            ':show_cta' => isset($data['showCta']) ? (int)$data['showCta'] : 1,
            ':cta_title' => $data['ctaTitle'] ?? '',
            ':cta_description' => $data['ctaDescription'] ?? '',
            ':cta_button_text' => $data['ctaButtonText'] ?? '',
            ':cta_button_url' => $data['ctaButtonUrl'] ?? '',
            ':archived' => isset($data['archived']) ? (int)$data['archived'] : 0
        ]);

        if ($success) {
            jsonResponse(['success' => true]);
        } else {
            jsonResponse(['error' => 'Failed to save newsletter'], 500);
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// DELETE Request (Remove Item)
// ─────────────────────────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
    if ($id <= 0) {
        jsonResponse(['error' => 'Valid ID is required'], 400);
    }

    $table = '';
    if ($type === 'cases') $table = 'case_studies';
    elseif ($type === 'updates') $table = 'platform_updates';
    elseif ($type === 'newsletters') $table = 'newsletters';

    $stmt = $db->prepare("DELETE FROM $table WHERE id = :id");
    $success = $stmt->execute([':id' => $id]);

    if ($success && $stmt->rowCount() > 0) {
        jsonResponse(['success' => true]);
    } else {
        jsonResponse(['error' => 'Item not found'], 404);
    }
}

jsonResponse(['error' => 'Method not allowed'], 405);
