# Cyber News Automation & Deployment Guide

This guide explains how to set up the automated news system on your production server.

## 1. Database Initialization
After uploading the files to your server, run the database setup script to create the `cyber_news` table:
```bash
php server/setup_db.php
```

## 2. Setting up the Daily 9 AM IST Update
To ensure news is updated every morning at 9:00 AM IST, you need to set up a **Cron Job** on your server.

### Cron Schedule (9:00 AM IST)
9:00 AM IST corresponds to **3:30 AM UTC**. 

Add the following line to your server's crontab (`crontab -e`):
```cron
30 3 * * * /usr/bin/php /var/www/html/server/fetch_news.php >> /var/www/html/server/news_sync.log 2>&1
```
*Note: Replace `/var/www/html/` with the actual path to your website on the server.*

## 3. Deployment Files
The following files/folders must be uploaded to your server:
- `dist/` (The contents of this folder go to your web root)
- `server/` (Full folder with `api/`, `config.php`, `fetch_news.php`, and `setup_db.php`)
- `.env` (Ensure the `VITE_GNEWS_API_KEY` is present)

## 4. How it Works
1.  **fetch_news.php**: This script fetches the latest 9 articles from GNews and stores them in the `cyber_news` table. It skips duplicates automatically.
2.  **api/get_news.php**: This endpoint serves the 9 most recent articles from your database to the website.
3.  **Frontend**: The website now fetches news from your own server instead of calling GNews directly, making it faster and more secure.
