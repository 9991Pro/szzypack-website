import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllBlogPosts();
  const siteUrl = "https://www.szzypack.com";

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <author>${post.data.author}</author>
      ${post.data.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SZZYPack Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Expert guides on flexible packaging — bag selection, MOQ tips, artwork preparation, sustainability, and industry trends.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
