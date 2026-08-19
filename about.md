---
title: About
permalink: /about/
---

<header class="page-intro about-intro">
  <h1>{{ site.data.about.heading }}</h1>
</header>

<div class="about-grid">
  <div class="prose about-copy">
    <p>{{ site.data.about.intro }}</p>
    <p>{{ site.data.about.personal }}</p>

    <section class="about-section">
      <h2>Work Experience</h2>
      <ul class="entries">
        {% assign jobs = site.work_history | sort: "order" %}
        {% for job in jobs %}
          <li class="entry">
            <div class="entry-head">
              <span class="entry-name">{% if job.company_url %}<a href="{{ job.company_url }}">{{ job.company }}</a>{% else %}{{ job.company }}{% endif %}</span>
              <span class="entry-period">{{ job.period }}</span>
            </div>
            <div class="entry-role">{{ job.role }}</div>
            <p class="entry-desc">{{ job.description }}</p>
          </li>
        {% endfor %}
      </ul>
    </section>

    <section class="about-section">
      <h2>Elsewhere</h2>
      <p>Browse my work on <a href="{{ site.data.about.github }}">GitHub</a>, or find me on <a href="{{ site.data.about.linkedin }}">LinkedIn</a>.</p>
    </section>
  </div>
</div>
