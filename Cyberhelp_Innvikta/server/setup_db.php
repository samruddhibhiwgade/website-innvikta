<?php
/**
 * setup_db.php
 * Run ONCE on the server: php server/setup_db.php
 * Creates all tables and seeds them from ALL 6 JSON data files.
 */

require __DIR__ . '/config.php';

$db = getDB();

// ─────────────────────────────────────────────────────────────────────────────
// 1. CREATE TABLES
// ─────────────────────────────────────────────────────────────────────────────

$db->exec("
CREATE TABLE IF NOT EXISTS fraud_types (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fraud_type  VARCHAR(150) NOT NULL UNIQUE,
    category    VARCHAR(50)  NOT NULL DEFAULT 'other',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS fraud_questions (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fraud_type_id INT UNSIGNED NOT NULL,
    question      TEXT NOT NULL,
    sort_order    TINYINT UNSIGNED DEFAULT 0,
    FOREIGN KEY (fraud_type_id) REFERENCES fraud_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS bank_helplines (
    id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(150) NOT NULL UNIQUE,
    sector           ENUM('public','private','specialized') NOT NULL DEFAULT 'public',
    fraud_helpline   VARCHAR(100),
    general_helpline VARCHAR(100),
    email            VARCHAR(200),
    color            VARCHAR(20),
    website          VARCHAR(255),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS state_nodal_officers (
    id                     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    state                  VARCHAR(100) NOT NULL UNIQUE,
    zone                   VARCHAR(50),
    nodal_name             VARCHAR(200),
    nodal_rank             VARCHAR(100),
    nodal_email            VARCHAR(200),
    grievance_name         VARCHAR(200),
    grievance_rank         VARCHAR(100),
    grievance_phone        VARCHAR(50),
    grievance_email        VARCHAR(200),
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS district_cyber_cells (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    state             VARCHAR(100) NOT NULL,
    district          VARCHAR(150) NOT NULL,
    cyber_cell_phone  VARCHAR(100),
    cyber_cell_email  VARCHAR(200),
    address           TEXT,
    efiling_link      VARCHAR(300),
    efir_available    TINYINT(1) DEFAULT 0,
    citizen_portal    TEXT,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_state_district (state, district)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS social_media_grievance (
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    platform          VARCHAR(100) NOT NULL UNIQUE,
    grievance_officer VARCHAR(200),
    email             VARCHAR(200),
    report_url        VARCHAR(300),
    icon              VARCHAR(50),
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS national_contacts (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    authority   VARCHAR(200),
    url         VARCHAR(300),
    helpline    VARCHAR(100),
    email       VARCHAR(200),
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS regional_contacts (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    region       VARCHAR(100) NOT NULL,
    cell_name    VARCHAR(200),
    jurisdiction VARCHAR(200),
    contact_no   VARCHAR(100),
    email        VARCHAR(200),
    address      TEXT,
    whatsapp     JSON,
    office_hours VARCHAR(100),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$db->exec("
CREATE TABLE IF NOT EXISTS complaints (
    id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fraud_type       VARCHAR(150) NOT NULL,
    triage_category  VARCHAR(50),
    timeframe        VARCHAR(50),
    bank_name        VARCHAR(150),
    answers_json     JSON,
    details          TEXT,
    user_name        VARCHAR(200),
    user_contact     VARCHAR(200),
    priority         VARCHAR(20),
    email_sent       TINYINT(1) DEFAULT 0,
    submitted_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

// If the table already existed without user columns, add them (safe — ignores error if column exists)
try { $db->exec("ALTER TABLE complaints ADD COLUMN user_name VARCHAR(200) AFTER details"); } catch (Exception $e) {}
try { $db->exec("ALTER TABLE complaints ADD COLUMN user_contact VARCHAR(200) AFTER user_name"); } catch (Exception $e) {}
try { $db->exec("ALTER TABLE complaints ADD COLUMN clicks_json JSON AFTER priority"); } catch (Exception $e) {}

$db->exec("
CREATE TABLE IF NOT EXISTS cyber_news (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT,
    content      TEXT,
    url          VARCHAR(255) NOT NULL UNIQUE,
    image        TEXT,
    published_at DATETIME,
    source_name  VARCHAR(100),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

echo "All tables created.\n\n";

// ─────────────────────────────────────────────────────────────────────────────
// 2. SEED: fraud_types + fraud_questions  (fraudTypes.json)
// ─────────────────────────────────────────────────────────────────────────────

$categoryMap = [
    'UPI Fraud'                              => 'financial',
    'Debit / Credit Card / SIM Swap Fraud'  => 'financial',
    'Internet Banking Related Fraud'         => 'financial',
    'E-Wallet Related Fraud'                 => 'financial',
    'Fraud Call / Vishing'                   => 'financial',
    'Cyber Bullying / Stalking / Sexting'    => 'harassment',
    'Fake / Impersonating Profile'           => 'harassment',
    'Cheating by Impersonation'              => 'harassment',
    'Profile Hacking / Identity Theft'       => 'identity',
    'Online Job Fraud'                       => 'financial',
    'Demat / Depository Fraud / Other Cyber' => 'investment',
    'Online Gambling'                        => 'financial',
    'Provocative Speech for Unlawful Acts'   => 'harassment',
    'Cryptocurrency Fraud'                   => 'investment',
    'Email Phishing'                         => 'hacking',
    'Cyber Terrorism'                        => 'hacking',
    'Online Matrimonial Fraud'               => 'harassment',
    'Other Cyber Crimes'                     => 'harassment',
];

$fraudJson   = json_decode(file_get_contents(__DIR__ . '/../src/data/fraudTypes.json'), true);
$stmtFraud   = $db->prepare('INSERT IGNORE INTO fraud_types (fraud_type, category) VALUES (:ft, :cat)');
$stmtQ       = $db->prepare('INSERT INTO fraud_questions (fraud_type_id, question, sort_order) VALUES (:fid, :q, :s)');
$stmtGetId   = $db->prepare('SELECT id FROM fraud_types WHERE fraud_type = :ft');

foreach ($fraudJson['fraud_types'] as $ft) {
    $name = $ft['fraud_type'];
    $stmtFraud->execute([':ft' => $name, ':cat' => $categoryMap[$name] ?? 'other']);
    $stmtGetId->execute([':ft' => $name]);
    $fid = $stmtGetId->fetchColumn();
    $db->exec("DELETE FROM fraud_questions WHERE fraud_type_id = $fid");
    foreach ($ft['additional_questions'] as $i => $q) {
        $stmtQ->execute([':fid' => $fid, ':q' => $q, ':s' => $i]);
    }
}
echo count($fraudJson['fraud_types']) . " fraud types + their questions seeded (fraudTypes.json).\n";

// ─────────────────────────────────────────────────────────────────────────────
// 3. SEED: bank_helplines  (bankHelplines.json)
// ─────────────────────────────────────────────────────────────────────────────
$bankJson   = json_decode(file_get_contents(__DIR__ . '/../src/data/bankHelplines.json'), true);
$stmtBank   = $db->prepare(
    'INSERT INTO bank_helplines (name, sector, fraud_helpline, general_helpline, email, color, website)
     VALUES (:name, :sector, :fraud, :general, :email, :color, :website)
     ON DUPLICATE KEY UPDATE website = VALUES(website)'
);
$sectorMap  = ['public_sector' => 'public', 'private_sector' => 'private', 'specialized_banks' => 'specialized'];
$bankCount  = 0;
foreach ($sectorMap as $key => $label) {
    foreach (($bankJson[$key] ?? []) as $b) {
        $stmtBank->execute([
            ':name'    => $b['name']             ?? '',
            ':sector'  => $label,
            ':fraud'   => $b['fraud_helpline']   ?? null,
            ':general' => $b['general_helpline'] ?? null,
            ':email'   => $b['email']            ?? null,
            ':color'   => $b['color']            ?? null,
            ':website' => $b['website']          ?? null,
        ]);
        $bankCount++;
    }
}
echo "$bankCount banks seeded (bankHelplines.json).\n";

// ─────────────────────────────────────────────────────────────────────────────
// 4. SEED: state_nodal_officers  (stateNodalOfficers.json)
// ─────────────────────────────────────────────────────────────────────────────

$stateJson  = json_decode(file_get_contents(__DIR__ . '/../src/data/stateNodalOfficers.json'), true);
$stmtState  = $db->prepare(
    'INSERT IGNORE INTO state_nodal_officers
        (state, zone, nodal_name, nodal_rank, nodal_email, grievance_name, grievance_rank, grievance_phone, grievance_email)
     VALUES
        (:state, :zone, :nname, :nrank, :nemail, :gname, :grank, :gphone, :gemail)'
);
foreach ($stateJson as $s) {
    $stmtState->execute([
        ':state'  => $s['state']                    ?? '',
        ':zone'   => $s['zone']                     ?? null,
        ':nname'  => $s['nodal']['name']             ?? null,
        ':nrank'  => $s['nodal']['rank']             ?? null,
        ':nemail' => $s['nodal']['email']            ?? null,
        ':gname'  => $s['grievance']['name']         ?? null,
        ':grank'  => $s['grievance']['rank']         ?? null,
        ':gphone' => $s['grievance']['phone']        ?? null,
        ':gemail' => $s['grievance']['email']        ?? null,
    ]);
}
echo count($stateJson) . " state nodal officers seeded (stateNodalOfficers.json).\n";

// ─────────────────────────────────────────────────────────────────────────────
// 5. SEED: district_cyber_cells  (districtDirectory.json)
// ─────────────────────────────────────────────────────────────────────────────

$districtJson  = json_decode(file_get_contents(__DIR__ . '/../src/data/districtDirectory.json'), true);
$stmtDistrict  = $db->prepare(
    'INSERT IGNORE INTO district_cyber_cells
        (state, district, cyber_cell_phone, cyber_cell_email, address, efiling_link, efir_available, citizen_portal)
     VALUES
        (:state, :district, :phone, :email, :address, :efiling, :efir, :portal)'
);
$districtCount = 0;
foreach ($districtJson as $entry) {
    $state      = $entry['state']           ?? '';
    $efiling    = $entry['efiling_link']    ?? null;
    $efir       = $entry['efir_available']  ? 1 : 0;
    $portal     = $entry['citizen_portal']  ?? null;
    foreach (($entry['districts'] ?? []) as $d) {
        $stmtDistrict->execute([
            ':state'    => $state,
            ':district' => $d['district']          ?? '',
            ':phone'    => $d['cyber_cell_phone']  ?? null,
            ':email'    => $d['cyber_cell_email']  ?? null,
            ':address'  => $d['address']           ?? null,
            ':efiling'  => $efiling,
            ':efir'     => $efir,
            ':portal'   => $portal,
        ]);
        $districtCount++;
    }
}
echo "$districtCount district cyber cells seeded (districtDirectory.json).\n";

// ─────────────────────────────────────────────────────────────────────────────
// 6. SEED: social_media_grievance  (socialMediaGrievance.json)
// ─────────────────────────────────────────────────────────────────────────────

$socialJson  = json_decode(file_get_contents(__DIR__ . '/../src/data/socialMediaGrievance.json'), true);
$stmtSocial  = $db->prepare(
    'INSERT IGNORE INTO social_media_grievance (platform, grievance_officer, email, report_url, icon)
     VALUES (:platform, :officer, :email, :url, :icon)'
);
foreach ($socialJson as $s) {
    $stmtSocial->execute([
        ':platform' => $s['platform']          ?? '',
        ':officer'  => $s['grievance_officer'] ?? null,
        ':email'    => $s['email']             ?? null,
        ':url'      => $s['report_url']        ?? null,
        ':icon'     => $s['icon']              ?? null,
    ]);
}
echo count($socialJson) . " social media grievance officers seeded (socialMediaGrievance.json).\n";

// ─────────────────────────────────────────────────────────────────────────────
// 7. SEED: national_contacts + regional_contacts  (contactDatabase.json)
// ─────────────────────────────────────────────────────────────────────────────

$contactJson  = json_decode(file_get_contents(__DIR__ . '/../src/data/contactDatabase.json'), true);

// National portals
$stmtNational = $db->prepare(
    'INSERT IGNORE INTO national_contacts (name, authority, url, helpline, email, description)
     VALUES (:name, :auth, :url, :helpline, :email, :desc)'
);
foreach (($contactJson['national_portals'] ?? []) as $np) {
    $stmtNational->execute([
        ':name'    => $np['name']        ?? '',
        ':auth'    => $np['authority']   ?? null,
        ':url'     => $np['url']         ?? null,
        ':helpline'=> $np['helpline']    ?? null,
        ':email'   => $np['email']       ?? null,
        ':desc'    => $np['description'] ?? null,
    ]);
}
echo count($contactJson['national_portals'] ?? []) . " national contacts seeded.\n";

// Regional Pune contacts
$stmtRegion = $db->prepare(
    'INSERT IGNORE INTO regional_contacts (region, cell_name, jurisdiction, contact_no, email, address, whatsapp, office_hours)
     VALUES (:region, :cell, :juris, :contact, :email, :address, :whatsapp, :hours)'
);
foreach (($contactJson['pune_region'] ?? []) as $r) {
    $stmtRegion->execute([
        ':region'   => 'Pune',
        ':cell'     => $r['cell_name']    ?? null,
        ':juris'    => $r['jurisdiction'] ?? null,
        ':contact'  => $r['contact_no']   ?? null,
        ':email'    => $r['email']        ?? null,
        ':address'  => $r['address']      ?? null,
        ':whatsapp' => isset($r['whatsapp']) ? json_encode($r['whatsapp']) : null,
        ':hours'    => $r['office_hours'] ?? null,
    ]);
}
echo count($contactJson['pune_region'] ?? []) . " regional contacts seeded.\n";

echo "\n==========================================================\n";
echo "  Setup complete! All 9 tables created and seeded.\n";
echo "==========================================================\n";
echo "\nTables populated:\n";
echo "  fraud_types         - " . count($fraudJson['fraud_types']) . " records\n";
echo "  fraud_questions     - all questions for each fraud type\n";
echo "  bank_helplines      - $bankCount records\n";
echo "  state_nodal_officers- " . count($stateJson) . " records\n";
echo "  district_cyber_cells- $districtCount records\n";
echo "  social_media_grievance - " . count($socialJson) . " records\n";
echo "  national_contacts   - " . count($contactJson['national_portals'] ?? []) . " records\n";
echo "  regional_contacts   - " . count($contactJson['pune_region'] ?? []) . " records\n";
echo "  complaints          - (empty — filled by users)\n";
