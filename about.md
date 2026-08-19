---
title: About
permalink: /about/
---

<div class="about">
  <div class="about-hero">
    <div class="about-hero-body">
      <h1>{{ site.data.about.name }}</h1>
      <ul class="about-links">
        <li><a href="{{ site.data.about.github }}">github.com/{{ site.author.github }}</a></li>
        <li><a href="{{ site.data.about.linkedin }}">linkedin.com/in/{{ site.author.linkedin }}</a></li>
      </ul>
    </div>
  </div>

  <section class="about-section">
    <h2>About</h2>
    <div class="about-summary">
      <p>{{ site.data.about.intro }}</p>
      <p>{{ site.data.about.personal }}</p>
    </div>
  </section>

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
    <h2>Activities</h2>
    <ul class="entries">
      {% assign activities = site.open_source | sort: "order" %}
      {% for activity in activities %}
        <li class="entry">
          <div class="entry-head">
            <span class="entry-name">{% if activity.repository %}<a href="{{ activity.repository }}">{{ activity.title }}</a>{% else %}{{ activity.title }}{% endif %}</span>
            {% if activity.date %}<span class="entry-period">{{ activity.date | date: "%b %Y" }} – Present</span>{% endif %}
          </div>
          <div class="entry-role">{{ activity.role | default: "Contributor" }}</div>
          <p class="entry-desc">{% if activity.description %}{{ activity.description }}{% else %}{{ activity.content | strip_html | strip }}{% endif %}</p>
        </li>
      {% endfor %}
    </ul>
  </section>

  <section class="about-section">
    <h2>Education</h2>
    <ul class="entries">
      {% assign schools = site.education | sort: "order" %}
      {% for school in schools %}
        <li class="entry">
          <div class="entry-head">
            <span class="entry-name">{% if school.school_url %}<a href="{{ school.school_url }}">{{ school.school }}</a>{% else %}{{ school.school }}{% endif %}</span>
            <span class="entry-period">{{ school.period }}</span>
          </div>
          {% if school.program %}<div class="entry-role">{{ school.program }}</div>{% endif %}
          {% if school.description %}<p class="entry-desc">{{ school.description }}</p>{% endif %}
        </li>
      {% endfor %}
    </ul>
  </section>
</div>
