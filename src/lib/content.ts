import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.resolve("content");

export interface ContentFile<T = Record<string, unknown>> {
  data: T;
  content: string;
  slug: string;
  filePath: string;
}

export async function getContentFiles<T = Record<string, unknown>>(
  directory: string,
): Promise<ContentFile<T>[]> {
  const dir = path.join(CONTENT_ROOT, directory);

  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = data.slug || file.replace(/\.mdx?$/, "");
      return {
        data: data as T,
        content,
        slug,
        filePath: path.join(directory, file),
      };
    })
    .sort((a, b) => {
      const aDate = (a.data as Record<string, unknown>).date;
      const bDate = (b.data as Record<string, unknown>).date;
      if (aDate && bDate) {
        return new Date(bDate as string).getTime() - new Date(aDate as string).getTime();
      }
      const aOrder = (a.data as Record<string, unknown>).order;
      const bOrder = (b.data as Record<string, unknown>).order;
      if (aOrder != null && bOrder != null) {
        return (aOrder as number) - (bOrder as number);
      }
      return 0;
    });
}

export async function getContentFile<T = Record<string, unknown>>(
  directory: string,
  slug: string,
): Promise<ContentFile<T> | null> {
  const files = await getContentFiles<T>(directory);
  return files.find((f) => f.slug === slug) || null;
}
