# yourname.github.io

A clean, minimalist blog built with [Astro](https://astro.build), using a monospaced type system and full light/dark mode. Posts are plain Markdown files. Deployment is fully automated via GitHub Actions.

---

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Project structure](#project-structure)
3. [Local development](#local-development)
4. [Writing posts](#writing-posts)
5. [Customising the site](#customising-the-site)
6. [Hosting on GitHub Pages — step by step](#hosting-on-github-pages)
7. [Custom domain (optional)](#custom-domain-optional)
8. [Updating the site](#updating-the-site)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js 18 or 20** — download from [nodejs.org](https://nodejs.org)
- **npm** (ships with Node)
- **Git** — download from [git-scm.com](https://git-scm.com)
- A **GitHub account** — free at [github.com](https://github.com)

Check your versions:

```bash
node -v   # should print v18.x or v20.x
npm -v    # should print 9.x or 10.x
git --version
```

---

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD pipeline
├── public/
│   └── favicon.svg             ← Static assets (images, fonts, etc.)
├── src/
│   ├── components/
│   │   ├── Header.astro        ← Site header + subscribe bar + nav
│   │   ├── Footer.astro        ← Site footer
│   │   └── PostCard.astro      ← Post list item
│   ├── content/
│   │   ├── config.ts           ← Content collection schema
│   │   └── blog/
│   │       └── *.md            ← Your blog posts go here
│   ├── layouts/
│   │   ├── Base.astro          ← HTML shell + theme toggle
│   │   └── Post.astro          ← Individual post layout
│   ├── pages/
│   │   ├── index.astro         ← Home (post list)
│   │   ├── about.astro         ← About page
│   │   ├── projects.astro      ← Projects page
│   │   ├── 404.astro           ← Not-found page
│   │   ├── feed.xml.ts         ← RSS feed (auto-generated)
│   │   ├── blog/
│   │   │   └── [slug].astro    ← Dynamic post route
│   │   └── tags/
│   │       ├── index.astro     ← All tags
│   │       └── [tag].astro     ← Posts by tag
│   └── styles/
│       └── global.css          ← Full design system (tokens, components)
├── astro.config.mjs            ← Astro configuration
├── package.json
└── tsconfig.json
```

---

## Local development

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. The site hot-reloads on every file save.

```bash
# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## Writing posts

Every file in `src/content/blog/` becomes a post. Create a new `.md` file:

```
src/content/blog/my-new-post.md
```

The filename becomes the URL slug: `/blog/my-new-post`

### Required frontmatter

Every post needs a frontmatter block at the top:

```markdown
---
title: "Your Post Title"
date: 2025-12-01
description: "A one or two sentence summary shown in the post list and RSS feed."
tags: ["tag-one", "tag-two"]
---

Your post content starts here...
```

### All frontmatter fields

| Field         | Type      | Required | Description                                              |
|---------------|-----------|----------|----------------------------------------------------------|
| `title`       | string    | ✅ yes   | Post title                                               |
| `date`        | YYYY-MM-DD| ✅ yes   | Publication date (used for sorting)                      |
| `description` | string    | ✅ yes   | Short summary (shown in list + RSS)                      |
| `tags`        | string[]  | no       | Array of tags. Creates `/tags/<tag>` pages automatically |
| `draft`       | boolean   | no       | Set `true` to hide a post from the site (default: false) |
| `featured`    | boolean   | no       | Set `true` to pin as the hero post on the home page      |

### Markdown features

Standard Markdown plus:

- **Code blocks** with syntax highlighting (via Shiki):
  ````markdown
  ```typescript
  const greet = (name: string) => `hello, ${name}`;
  ```
  ````
- **Tables**, **blockquotes**, **footnotes**
- MDX (`.mdx` extension) for embedding Astro/HTML components in posts

---

## Customising the site

### 1. Your name and links

Edit these files and replace placeholder values:

| File | What to change |
|------|---------------|
| `src/components/Header.astro` | Site name, tagline, GitHub/LinkedIn/Email/RSS URLs |
| `src/components/Footer.astro` | Name, GitHub URL, email |
| `src/pages/index.astro` | About blurb on home page |
| `src/pages/about.astro` | Full about page content |
| `src/pages/projects.astro` | Projects array |
| `astro.config.mjs` | `site:` URL (your GitHub Pages URL) |

### 2. Colours and typography

All design tokens live at the top of `src/styles/global.css`:

```css
:root {
  --bg:       #f9f7f4;   /* page background */
  --fg:       #1a1916;   /* primary text    */
  --fg-muted: #7a7672;   /* secondary text  */
  --border:   #d8d4ce;   /* dividers        */
  --font:     'JetBrains Mono', 'Courier New', monospace;
}
```

Change any value here and it propagates everywhere. Dark mode overrides are in the `[data-theme="dark"]` block immediately below.

### 3. Nav links

Edit the `links` array in `src/components/Header.astro`:

```javascript
const links = [
  { href: '/',         label: 'writing'  },
  { href: '/tags',     label: 'tags'     },
  { href: '/projects', label: 'projects' },
  { href: '/about',    label: 'about'    },
];
```

---

## Hosting on GitHub Pages

Follow these steps exactly. The whole process takes about 10 minutes.

### Step 1 — Create the GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name the repository **exactly** one of:
   - `yourusername.github.io` — to publish at `https://yourusername.github.io` ✅ recommended
   - Any other name (e.g. `blog`) — publishes at `https://yourusername.github.io/blog`
3. Set visibility to **Public** (required for free GitHub Pages)
4. Do **not** initialise with a README (you already have one)
5. Click **Create repository**

> If you use a repo name other than `<username>.github.io`, you must also set `base: '/repo-name/'` in `astro.config.mjs`.

### Step 2 — Update the site URL

Open `astro.config.mjs` and set `site` to your real URL:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  // or: 'https://yourusername.github.io/repo-name'
  ...
});
```

### Step 3 — Push the code to GitHub

In your terminal, inside the project folder:

```bash
# Initialise git (skip if already done)
git init

# Stage all files
git add .

# Create the first commit
git commit -m "initial commit"

# Point to your GitHub repo (replace URL with yours)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git push -u origin main
```

### Step 4 — Enable GitHub Pages in repo settings

1. On GitHub, open your repository
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** in the left sidebar
4. Under **Build and deployment → Source**, select **GitHub Actions**
5. No further changes needed — the workflow file is already in `.github/workflows/deploy.yml`

### Step 5 — Trigger the first deployment

The workflow runs automatically on every push to `main`. Since you just pushed, it should already be running.

To check:
1. Click the **Actions** tab in your repository
2. You should see a workflow run called **Deploy to GitHub Pages**
3. Click it to watch live logs
4. When both the `build` and `deploy` jobs show a green ✅, your site is live

### Step 6 — Visit your site

Go to `https://yourusername.github.io` (or your custom repo URL).

It may take 1–2 minutes after the workflow completes for DNS to propagate.

---

## Custom domain (optional)

To use `www.yourdomain.com` or `blog.yourdomain.com` instead of `yourusername.github.io`:

### 1. Add a CNAME file

Create `public/CNAME` with your domain on a single line (no `https://`):

```
yourdomain.com
```

### 2. Update astro.config.mjs

```javascript
site: 'https://yourdomain.com',
```

### 3. Configure DNS

At your domain registrar, add one of:

| Record type | Name  | Value                          | Use when                     |
|-------------|-------|--------------------------------|------------------------------|
| `CNAME`     | `www` | `yourusername.github.io`       | using `www.yourdomain.com`   |
| `A`         | `@`   | `185.199.108.153` (×4 records) | using apex `yourdomain.com`  |

GitHub's four A record IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

### 4. Set the custom domain in GitHub

In **Settings → Pages → Custom domain**, enter your domain and click Save. GitHub will issue a free TLS certificate automatically (takes a few minutes).

---

## Updating the site

### Add a new post

```bash
# Create the file
touch src/content/blog/my-post.md

# Edit it, then commit and push
git add src/content/blog/my-post.md
git commit -m "add: my new post"
git push
```

GitHub Actions deploys automatically. Your post is live in ~1–2 minutes.

### Edit existing content

Make your changes, then:

```bash
git add -A
git commit -m "update: fixed typo in boredom post"
git push
```

### Manual deploy trigger

Go to **Actions → Deploy to GitHub Pages → Run workflow** to trigger a deploy without a code change.

---

## Troubleshooting

**Build fails with "cannot find module" error**
```bash
npm install   # reinstall dependencies
git add package-lock.json
git commit -m "fix: update lockfile"
git push
```

**Site shows 404 after deployment**
- Check Settings → Pages → Source is set to **GitHub Actions** (not a branch)
- Verify the `deploy` job completed successfully in the Actions tab
- If using a non-root repo, confirm `base` is set in `astro.config.mjs`

**Posts not appearing**
- Confirm frontmatter has `title`, `date`, and `description`
- Check `draft: true` is not set
- Date format must be `YYYY-MM-DD`

**Theme flashes on load**
- This is prevented by the inline script in `Base.astro`. If you see a flash, ensure you have not added `async` or `defer` to that script tag.

**RSS feed returning 404**
- The feed is at `/feed.xml` — confirm `site:` is set correctly in `astro.config.mjs`

---

## Tech stack

| Layer       | Tool                                                     |
|-------------|----------------------------------------------------------|
| Framework   | [Astro 4](https://astro.build)                           |
| Content     | Markdown / MDX via Astro Content Collections             |
| Styling     | Vanilla CSS with custom properties                       |
| Font        | [JetBrains Mono](https://www.jetbrains.com/lp/mono/)     |
| Syntax hl.  | [Shiki](https://shiki.style) (bundled with Astro)        |
| RSS         | [@astrojs/rss](https://docs.astro.build/en/guides/rss/)  |
| Sitemap     | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) |
| CI/CD       | GitHub Actions                                           |
| Hosting     | GitHub Pages                                             |

---

*MIT licence — fork freely.*
