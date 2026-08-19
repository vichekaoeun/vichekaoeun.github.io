# Vic Does Things

A Markdown-powered Jekyll blog hosted on GitHub Pages.

## Publish a post

### Without touching code

1. Visit [Pages CMS](https://app.pagescms.org).
2. Sign in with the GitHub account that owns this repository.
3. Select `vichekaoeun/vichekaoeun.github.io`.
4. Open **Blog posts**, **Projects**, **Open source**, **About page**, **Work history**, or **Education**.
5. Edit using the form and rich-text editor, then press **Save**.

Images can be uploaded from the editor. Saving commits the changes to GitHub, and GitHub Pages republishes the site automatically.

### Using Markdown

1. Copy one of the files in `_posts/`.
2. Rename it `YYYY-MM-DD-your-post-title.md`.
3. Update the short settings block at the top and write below it in Markdown.
4. Commit and push. GitHub Pages publishes it automatically.

```yaml
---
title: "Your post title"
description: "One sentence shown on the home and archive pages."
category: Engineering
image: /assets/images/your-image.jpg
image_alt: "A useful description of the image"
image_caption: "Optional caption"
---
```

Put post images in `assets/images/`, then use them anywhere in Markdown:

```md
![Useful alt text](/assets/images/your-image.jpg)
```

## Update the site

- Site name, description, email, and social profiles: `_config.yml`
- Writing archive/home page: `index.md`
- About page: `about.md`
- Detailed project pages: `_projects/*.md`
- Open-source contributions: `_open_source/*.md`
- Editable About page: `_data/about.yml`
- Editable work history: `_work_history/*.md`
- Editable education: `_education/*.md`

Open-source entries work like project posts. In Pages CMS, create an entry under **Open source**, add a date and write-up, then paste a direct link to your pull request, issue, or commits. The page also links to your overall GitHub contribution graph.
- Colors, type, and layout: `assets/css/main.css`

## Preview locally

```sh
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`.
