---
layout: default
title: Home
---

<h2>Here are my recent posts:</h2>
<ul>
    {% if paginator %}
      {% for post in paginator.posts %}
        <li>
            <h2><a href="{{ post.url | prepend: site.baseurl | replace: '//', '/' }}">{{ post.title }}</a></h2>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date_to_string }}</time>
            <p>{{ post.content | strip_html | truncatewords:50 }}</p>
        </li>
      {% endfor %}
    {% else %}
      <p>No posts to display.</p>
    {% endif %}
</ul>

{% if paginator.total_pages > 3 %}
<div class="pagination">
    {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}">&laquo; Previous</a>
    {% endif %}
    <span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
    {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Next &raquo;</a>
    {% endif %}
</div>
{% endif %}