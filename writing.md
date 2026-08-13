---
title: Writing
permalink: /writing/
description: "Essays, field notes, and observations from Vicheka Oeun."
---

<header class="page-intro">
  <p class="eyebrow">The archive</p>
  <h1>Writing</h1>
  <p>Essays, build logs, and notes from the things I’m learning.</p>
</header>

<div class="archive">
  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  {% for year in posts_by_year %}
    <section class="archive-year">
      <h2>{{ year.name }}</h2>
      <div class="archive-posts">
        {% for post in year.items %}
          <article>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
            <div>
              <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
              {% if post.description %}<p>{{ post.description }}</p>{% endif %}
            </div>
          </article>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>

