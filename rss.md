---
layout: empty.njk
dest: rss.xml
minify: false
---
{% block content %}<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Christian Fei's Blog</title>
  <link><![CDATA[https://cri.dev]]></link>
  <description>A blog about my programming adventures in Elixir, Node.js and JavaScript</description>
  {%- for post in collections.post | reverse %}
  <item>
    <title><![CDATA[{{ post.data.title }}]]></title>
    <link><![CDATA[{{ post.url | withDomain }}]]></link>
    <pubDate><![CDATA[{{post.data.date | utcdate}}]]></pubDate>
    <guid><![CDATA[{{ post.url | withDomain }}]]></guid>
    <description><![CDATA[{{ post.htmlContent | safe }}]]></description>
  </item>
  {%- endfor %}
</channel>
</rss>{% endblock %}
