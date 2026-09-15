# aethraintelligence.com

The website of Aethra Intelligence and Prometheus. Plain HTML, CSS and a little
JavaScript: no build step, no dependencies, no `node_modules`. GitHub Pages serves
the files exactly as they are in this repository.

## Structure

```
.
├── index.html                  Homepage
├── blog/
│   ├── index.html              List of articles
│   └── <slug>/index.html       One article per folder -> /blog/<slug>/
├── authors/<name>/index.html   One page per author -> /authors/<name>/
├── privacy/index.html          Privacy page
├── 404.html                    "Page not found" (GitHub Pages uses it automatically)
├── templates/article.html      Starting point for a new article (not linked, noindex)
├── assets/
│   ├── css/site.css            All styles
│   ├── js/site.js              Header and mobile menu
│   ├── fonts/                  Onest, served from this site
│   ├── img/                    Logo and social preview image
│   └── screenshots/            App screenshots (see below)
├── sitemap.xml                 List of pages for search engines
├── feed.xml                    RSS feed of the blog
├── robots.txt                  Crawler rules (search engines and AI assistants allowed)
├── llms.txt                    Plain-text summary of the site for AI assistants
├── favicon.svg, *.png, site.webmanifest
├── CNAME                       Custom domain for GitHub Pages
├── .nojekyll                   Tells GitHub Pages to serve files as they are
└── .github/workflows/links.yml Checks for broken links on every push
```

Paths between pages are relative (`../../assets/css/site.css`), so the site works
both on the domain and when `index.html` is opened straight from disk. Two rules
keep it that way:

- In `blog/<slug>/index.html` and `authors/<name>/index.html` paths start with
  `../../`; in `blog/index.html` and `privacy/index.html` with `../`; in the root
  with nothing (`assets/...`, `./#install`).
- `404.html` is the exception: GitHub Pages shows it at any address, so its paths
  start with `/`. It only looks right on the live site or through a local server:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Publishing on GitHub Pages with the domain

1. Push this folder as the root of its own repository.
2. **Settings -> Pages -> Build and deployment:** Source *Deploy from a branch*,
   branch `main`, folder `/ (root)`.
3. **Settings -> Pages -> Custom domain:** `aethraintelligence.com` (the `CNAME` file
   already says so). Wait for the DNS check, then tick **Enforce HTTPS**.
4. DNS records at your domain registrar or at Cloudflare:

   | Type  | Name  | Value                 |
   |-------|-------|-----------------------|
   | A     | `@`   | `185.199.108.153`     |
   | A     | `@`   | `185.199.109.153`     |
   | A     | `@`   | `185.199.110.153`     |
   | A     | `@`   | `185.199.111.153`     |
   | AAAA  | `@`   | `2606:50c0:8000::153` |
   | AAAA  | `@`   | `2606:50c0:8001::153` |
   | AAAA  | `@`   | `2606:50c0:8002::153` |
   | AAAA  | `@`   | `2606:50c0:8003::153` |
   | CNAME | `www` | `https://github.com/AethraIntelligence`      |

   On Cloudflare, set these records to **DNS only** (grey cloud) until GitHub has
   issued the certificate. GitHub redirects `www` to the main domain by itself.
5. Recommended: **GitHub -> Settings -> Pages -> Add a domain** (account level) to
   verify the domain, so nobody else can point it at their own Pages site.

## Publishing an article

1. Copy `templates/article.html` to `blog/<slug>/index.html`. The slug is the
   address: short, lowercase, words joined with hyphens, containing the phrase
   people search for (`local-ai-assistant-guide`).
2. Replace every `{{PLACEHOLDER}}` and **delete the `noindex` line** at the top.
   - `<title>`: under 60 characters, main phrase first.
   - `description`: 120-160 characters, says what the reader gets.
   - Write the "In short" box as a direct answer. AI assistants and search
     snippets quote exactly this kind of paragraph.
   - Headings phrased the way people ask: "What is...", "How to...", "... vs ...".
   - Link to at least one other article or a homepage section, and link back to
     the new article from an older one.
3. Set the author (see [Authors](#authors)), then add the article in these places, newest first:
   - `blog/index.html`: an `<li>` at the top of the list (and in its JSON-LD `blogPost`);
   - `index.html`: replace the oldest card in the "From the blog" section;
   - `feed.xml`: an `<item>` at the top, and update `lastBuildDate`;
   - `sitemap.xml`: a `<url>` with today's `lastmod`, and `llms.txt`: a line under Blog.
4. Preview locally, push. The link check runs on GitHub.
5. In Google Search Console, **URL inspection -> Request indexing** for the new address.

## Authors

Each author has one page, `authors/<name-surname>/index.html`, and it is the only
place their bio, photo and links are kept in full. Articles point to it.

**A new author:** copy `authors/denys-zhodik/` to `authors/<name-surname>/`, change
the name, bio, LinkedIn link, initials and the `@id`, and add the page to
`sitemap.xml` and `llms.txt`.

**Setting the author of an article** means four spots in the article, all marked
with `{{AUTHOR_NAME}}` / `{{AUTHOR_SLUG}}` in the template:

1. `<meta name="author">`;
2. `"author"` in the JSON-LD (the `@id` and `url` of the author page);
3. the byline under the title;
4. the author card at the end, copied from the comment at the bottom of the author's page.

Then add the article to the "Articles" list on the author's page and put
`<dc:creator>` in its `feed.xml` item. A photo goes in `assets/img/authors/`
(square, at least 200×200); the author page says where to put the `<img>`.

When you change an article later, update `dateModified` / `article:modified_time`
in the article and `lastmod` in `sitemap.xml`.

## Screenshots

The Prometheus section on the homepage shows five screenshots from
`assets/screenshots/` (WebP, 1600×1000, 16:10, macOS menu bar cropped out):

| File              | What it shows                                               |
|-------------------|-------------------------------------------------------------|
| `01-ask.webp`       | A new task: the goal field and the Workforce list           |
| `02-result.webp`    | A finished answer with its PDF open in the preview beside it |
| `03-approval.webp`  | An approval request before overwriting a file               |
| `04-plugins.webp`   | Settings -> Plugins with GitHub, Gmail, Google Drive, Notion |
| `05-documents.webp` | Settings -> Documents with an indexed document              |

To replace one, take the screenshot in the desktop window (light theme, a real but
non-private task), save it under the same name in 16:10, keep it under about
200 KB (`cwebp -q 82 in.png -o out.webp`) and update its alt text in `index.html`.

## Brand

One logo for Aethra Intelligence and Prometheus, in `assets/brand/`. All files are
square (1:1).

| File                                  | Use                                                   |
|---------------------------------------|-------------------------------------------------------|
| `logo.svg`, `logo-white.svg`          | The master: black / white vector, transparent, no margin |
| `logo-black-{512,1024,2048}.png`      | Black on transparent, for documents and light backgrounds |
| `logo-white-{512,1024,2048}.png`      | White on transparent, for dark or photo backgrounds   |
| `avatar-white-1024.png`               | Profile picture: GitHub, LinkedIn, X                  |
| `avatar-sky-1024.png`, `avatar-black-1024.png` | Alternative profile pictures                 |
| `app-icon-1024.png`                   | Source for the Prometheus desktop icons (`npx tauri icon`) |

Site icons in the root (`favicon.svg`, `favicon.ico`, `favicon-32.png`,
`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `assets/img/logo-512.png`
and `og-default.png` are made from the same master.

## After launch

- **Google Search Console** and **Bing Webmaster Tools**: add the domain, submit
  `https://aethraintelligence.com/sitemap.xml`. Bing's index also feeds ChatGPT
  search and Copilot.
- Check structured data with Google's **Rich Results Test** and social previews with
  opengraph.xyz after the first deploy.
- Run **PageSpeed Insights** on the homepage and an article.
- Set up the address `support@aethraintelligence.com` (Cloudflare Email Routing is free),
  since the site links to it.
