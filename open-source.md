---
title: Open Source
permalink: /open-source/
description: "Open-source contributions by Vicheka Oeun."
---

<header class="page-intro">
  <p class="eyebrow">Community work</p>
  <h1>Open source</h1>
  <p>Contributions to software built in the open.</p>
</header>

<div class="project-list">
  {% assign contributions = site.open_source | sort: "order" %}
  {% for contribution in contributions %}
    <article class="project-card">
      <div class="project-number">0{{ forloop.index }}</div>
      <div>
        <p class="eyebrow">{{ contribution.role }}</p>
        <h2><a href="{{ contribution.url | relative_url }}">{{ contribution.title }}</a></h2>
        <p>{{ contribution.description }}</p>
        <a href="{{ contribution.url | relative_url }}">Read contribution details →</a>
      </div>
    </article>
  {% else %}
    <p class="empty-state">No contributions have been added yet.</p>
  {% endfor %}
</div>

