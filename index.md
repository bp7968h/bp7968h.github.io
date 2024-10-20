---
layout: default
title: Home
---

<h2>Here are my recent posts:</h2>
<ul>
    {% if site.posts %}
      {% for post in site.posts %}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a></h2>
            <div class="post-info">
              <small class="post-date">{{ post.date | date: "%-d %B %Y" }}</small>
              {% if post.categories %}
                <div class="categories">
                  {% for category in post.categories %}
                    <span class="category-chip">{{ category }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
            <p>{{ post.content | strip_html | truncatewords:50 }}</p>
        </li>
      {% endfor %}
    {% else %}
      <p>No posts to display.</p>
    {% endif %}
</ul>