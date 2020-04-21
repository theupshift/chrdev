---
layout: rss.njk
dest: rss.xml
minify: false
---
{% block content %}
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Christian Fei's Blog</title>
    <subtitle>A blog about my programming adventures</subtitle>
    <link>https://cri.dev/rss.xml</link>
    <updated>{{ '' | today }}</updated>
    <id>rss.xml</id>
    <author>
      <name>Christian Fei</name>
      <email>crifei93@gmail.com</email>
    </author>
    {%- for post in collections.post | reverse %}
    <entry>
      <title>{{ post.data.title }}</title>
      <link>{{ post.url | withDomain }}</link>
      <updated>{{ post.data.date | isoday }}</updated>
      <id>{{ post.url }}</id>
      <content><![CDATA[{{post.text}}]]></content>
    </entry>
    {%- endfor %}
  </channel>
</rss>
{% endblock %}
