---
title: Projects
permalink: /projects/
description: "Selected software projects by Vicheka Oeun."
---

<header class="page-intro">
  <p class="eyebrow">Things I’ve made</p>
  <h1>Selected projects</h1>
  <p>Experiments in systems, infrastructure, security, and useful software.</p>
</header>

<div class="project-list">
  {% assign sorted_projects = site.projects | sort: "order" %}
  {% for project in sorted_projects %}
    <article class="project-card">
      <div class="project-number">0{{ forloop.index }}</div>
      <div>
        <p class="eyebrow">{{ project.stack }}</p>
        <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
        <p>{{ project.description }}</p>
        <a href="{{ project.url | relative_url }}">Read project details →</a>
      </div>
    </article>
  {% endfor %}
</div>
