import { getContentFiles, getContentFile, type ContentFile } from "@/lib/content";

export interface BlogPost {
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  image?: string;
  featured?: boolean;
}

export interface BlogPostWithContent extends ContentFile<BlogPost> {}

export async function getAllBlogPosts(): Promise<BlogPostWithContent[]> {
  return getContentFiles<BlogPost>("blog");
}

export async function getBlogPost(
  slug: string
): Promise<BlogPostWithContent | null> {
  return getContentFile<BlogPost>("blog", slug);
}

export async function getFeaturedBlogPosts(): Promise<BlogPostWithContent[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) => p.data.featured);
}

export async function getBlogPostsByTag(
  tag: string
): Promise<BlogPostWithContent[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((p) =>
    p.data.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllBlogPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const normalized = tag.toLowerCase();
      tagMap.set(normalized, (tagMap.get(normalized) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
