---
title: About
permalink: /about/
---

<header class="page-intro about-intro">
  <p class="eyebrow">Hello, I’m Vic</p>
  <h1>{{ site.data.content.about_heading }}</h1>
</header>

<div class="about-grid">
  <div class="prose about-copy">
    <p>{{ site.data.content.about_intro }}</p>

    <p>{{ site.data.content.about_work }}</p>

    <p>{{ site.data.content.about_personal }}</p>

    <h2>Elsewhere</h2>
    <p>Browse my work on <a href="https://github.com/{{ site.author.github }}">GitHub</a>, or find me on <a href="https://www.linkedin.com/in/{{ site.author.linkedin }}/">LinkedIn</a>.</p>
  </div>
</div>
