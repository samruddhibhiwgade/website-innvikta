# Advanced Enterprise Implementation Plan - WordPress-Style Master CMS & Email Automation

This document outlines the detailed architecture for the unified administrative dashboard at `/admin/master-dashboard`. This is designed to act as an enterprise-grade WordPress alternative, complete with real-time SEO analysis, a centralized Media Library, drag-and-drop section builders, live preview engines, and subscriber email broadcast analytics.

---

## 1. Unified Dashboard Architecture & Shared Modules

The master dashboard is hosted at `/admin/master-dashboard` and provides unified administration with high-level shared components:

### A. Centralized Media Library Module
Instead of basic one-off uploads, a dedicated **Media Library Tab** will manage all assets:
- **Visual File Grid**: Displays images and videos uploaded to `/uploads/`.
- **Metadata Management**: View/edit alt text, captions, file dimensions, and type.
- **Dynamic Search & Filters**: Filter by file type (Images, Videos) and search by file name/alt keywords.
- **Drop-in Insert**: Click any asset from the Media Library to immediately insert it into the active editor context (Blog, Case Study, or Newsletter) with custom alignment and scaling.

### B. Real-Time SEO & Readability Auditor (Yoast-Style)
A persistent auditor sidebar analyzing content dynamically as the user types:
- **Focus Keyphrase Analysis**: Analyzes keyphrase density inside Title, H1/H2 headings, introduction paragraph, and image alt texts.
- **Readability Index**: Computes sentence lengths, paragraph sizes, and readability grade level.
- **SEO Score Indicators**: Renders real-time visual checklist (Red, Orange, Green pills) indicating optimization health.

---

## 2. Tab-by-Tab Specifications & Advanced Features

### A. Blogs Manager
A rich compositing workspace linking to `blog_api.php`.

#### Editor Input Fields
1. **Header Metadata**: Title, custom SEO slugs, publish date/time scheduler, category tags, draft/published switches, and auto-linking configuration.
2. **Featured Media**: Configures header cover banner using a file selector connected to the Media Library.
3. **Advanced Editor Toolbar**:
   - Headers (`H1` to `H6`), bold, italic, lists, comparison tables, and blockquotes.
   - **Key Takeaways Box**: Visual builder inserting stylized card panels.
   - **Image Placement Helper**: Inserts `<BlogImage src="..." alt="..." width="..." align="..." />` supporting side-by-side floating alignments.
   - **Video Placement Helper**: Inserts `<Video src="..." title="..." width="..." align="..." height="..." />` supporting full video control parameters.

---

### B. Case Studies Designer
A visual, section-based canvas where editors assemble success stories.

#### General Details
- Company Name, custom industry selectors (Healthcare activates orange theme rules, BFSI maps deep slate, etc.), locations, and timelines.
- **Interactive Sidebar Metadata List**: Drag-and-drop list builder to add, remove, and reorder custom key-value details cards (e.g. Target Coverage, Delivery Model, ROI Percentages) without hardcoded count limits.

#### "Measure Security Outcomes" (At a Glance Grid)
- **Visual Grid Builder**: Add, edit, delete, and reorder key outcome columns.
- Renders as a borderless column grid layout with a brand-orange left-border accent (`border-l-2 border-[#f15a24] pl-4`) matching public branding.

#### Advanced Dynamic Sections Builder
Allows building complex layouts by appending component blocks:
1. **Section Heading**: Styled text.
2. **Split Text / Media Block**: Renders standard paragraphs (`text-[15px] md:text-[17px] text-[#334155]`) side-by-side with an image or video with customizable float directions and width styles.
3. **Testimonial Quote Block**: Renders centered blockquotes (`font-medium text-slate-600 italic`) with citation titles and avatars.
4. **Interactive Action CTA Card**: Inserts peach background promo banner (`bg-[#fff7f3]`) with rectangular demo-booking buttons.
5. **Drag-and-Drop Order**: Editors can drag sections up or down to re-order the layout hierarchy dynamically.

---

### C. Platform Updates Log
Controls version release documentation, saved to `platform_updates.json`.

#### Features
- Version code, category classifiers (Threat Defense, Compliance, Insights), release dates, and rich markdown text areas.
- **Homepage Highlight Feature**: Toggle switch to push the specific release into the main homepage hero slot.

---

### D. Newsletter Composer & Email Broadcast Automation
Handles creation of weekly cybersecurity newsletters and automates email dispatch with analytical logging.

#### Composition Fields
1. **Branded Header & Title**: Email-safe headers.
2. **Description & Metadata**: Snippet text for inbox previews.
3. **HTML Email Editor**: Visual block builder for composing email layouts.

#### Newsletter Mailing & Analytics Engine
When published with the **"Mail All Subscribers"** flag:
1. **Next.js to PHP POST Hook**: Invokes `newsletter_api.php` on the backend.
2. **Subscriber Lookup**: Queries `form_submissions` table:
   ```sql
   SELECT DISTINCT email FROM form_submissions WHERE form_type IN ('newsletter', 'newsletter_subscribe');
   ```
3. **Branded Template Compilation**: Generates responsive, inline-styled HTML layouts containing:
   - Innvikta header logo.
   - Dynamic newsletter content block.
   - **Click-Through Tracking URL**: Wraps internal links inside a tracking path redirecting through `track_api.php` to monitor open and click rates:
     `https://innvikta.co.in/resources/weekly-newsletter/[slug]?utm_source=newsletter`
4. **SMTP Mailer Loop**: Sends emails using the pre-configured SMTP details in `config.php` (utilizing `smtpSend` utility).

---

## 3. Database Layer Schema Specifications

### newsletters.json
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "date": "string (formatted)",
  "readTime": "string",
  "author": "string",
  "category": "string",
  "slug": "string",
  "content": "string (html/markdown code)"
}
```

### case-studies.json
```json
{
  "id": "integer",
  "title": "string",
  "imageTitle": "string",
  "subtitle": "string",
  "slug": "string",
  "industry": "string",
  "industryLabel": "string",
  "description": "string",
  "image": "string (url)",
  "location": "string",
  "timeline": "string",
  "atGlance": "array of strings",
  "sidebarChallenge": "string",
  "sidebarDetails": [
    { "label": "string", "val": "string" }
  ],
  "sections": [
    {
      "id": "string (uuid)",
      "type": "content_block / quote / media / cta",
      "heading": "string (optional)",
      "text": "array of paragraphs (optional)",
      "quoteText": "string (optional)",
      "quoteAuthor": "string (optional)",
      "mediaUrl": "string (optional)",
      "mediaType": "image / video",
      "width": "string",
      "align": "string"
    }
  ]
}
```

---

## 4. UI Compatibility & Live Preview Engine

To guarantee 100% design fidelity:
- **Dual-Pane Live Preview**: Shows the exact, compiled page layout side-by-side with the editor. It inherits the Tailwind configuration, utilizing `font-primary` and `font-secondary` font variables, and correctly renders custom shortcodes (like `<BlogImage />`, `<Video />`, and `<BookDemo />`).

---

## 5. Verification Routine
1. **Compilation Check**: Run `npm run build` to verify Next.js compiles.
2. **Subscriber Mailing Check**: Set up a test subscriber, draft a new newsletter, and verify SMTP delivery log success.
