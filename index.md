---
layout: default
title: Home
---

<h1>Welcome to My Blog!</h1>
<p>Here are my recent posts:</p>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <p>{{ post.excerpt }}</p>
    </li>
  {% endfor %}
</ul>