---
title:
description: "The personal blog of Vicheka Oeun — software, systems, books, films, and other curiosities."
---

<section class="home-hero">
  <p class="eyebrow">A personal notebook, published</p>
  <p class="hero-intro">{{ site.data.content.home_intro }}</p>
</section>

<section class="home-section">
  <div class="section-heading">
    <h2>Latest writing</h2>
    <a href="{{ '/writing/' | relative_url }}">View all <span aria-hidden="true">→</span></a>
  </div>

  <div class="post-list">
    {% for post in site.posts limit: 5 %}
      <article class="post-row{% if forloop.first %} featured{% endif %}">
        <div class="post-row-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
          {% if post.category %}<span>{{ post.category }}</span>{% endif %}
        </div>
        <div>
          <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        </div>
        <a class="row-arrow" href="{{ post.url | relative_url }}" aria-label="Read {{ post.title }}">↗</a>
      </article>
    {% endfor %}
  </div>
</section>

<aside class="home-note">
  <span class="note-mark" aria-hidden="true">✳</span>
  <div>
    <p class="eyebrow">A note from Vic</p>
    <p>{{ site.data.content.home_note }}</p>
  </div>
  <a href="{{ '/about/' | relative_url }}">More about me →</a>
</aside>
