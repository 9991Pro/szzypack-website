import { create, insert } from "@orama/orama";

export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "product" | "blog" | "case" | "page";
  tags?: string;
}

let db: Awaited<ReturnType<typeof create>> | null = null;

async function getDb() {
  if (db) return db;

  db = await create({
    schema: {
      title: "string",
      description: "string",
      href: "string",
      type: "enum",
      tags: "string",
    } as const,
  });

  return db;
}

export async function buildSearchIndex(documents: SearchDocument[]): Promise<void> {
  const db = await getDb();
  for (const doc of documents) {
    await insert(db, doc);
  }
}

export async function search(query: string): Promise<SearchDocument[]> {
  const db = await getDb();
  const { search: oramaSearch } = await import("@orama/orama");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = await oramaSearch(db as any, {
    term: query,
    properties: ["title", "description", "tags"],
  });

  return results.hits.map((hit) => hit.document as unknown as SearchDocument);
}

// Build-time: index all content
// Called from a server component or page

export async function searchIndex() {
  const { getContentFiles } = await import("@/lib/content");

  const [products, blogs, cases] = await Promise.all([
    getContentFiles<{ title: string; description?: string; tags?: string[] }>("products"),
    getContentFiles<{ title: string; description?: string; tags?: string[] }>("blog"),
    getContentFiles<{ title: string; description?: string; industry?: string }>("cases"),
  ]);

  const documents: SearchDocument[] = [];

  for (const p of products) {
    documents.push({
      id: p.slug,
      title: p.data.title,
      description: p.data.description || "",
      href: `/products/${p.slug}`,
      type: "product",
      tags: p.data.tags?.join(" "),
    });
  }

  for (const b of blogs) {
    documents.push({
      id: b.slug,
      title: b.data.title,
      description: b.data.description || "",
      href: `/blog/${b.slug}`,
      type: "blog",
      tags: b.data.tags?.join(" "),
    });
  }

  for (const c of cases) {
    documents.push({
      id: c.slug,
      title: c.data.title,
      description: c.data.description || "",
      href: `/cases/${c.slug}`,
      type: "case",
      tags: c.data.industry,
    });
  }

  await buildSearchIndex(documents);
  return documents;
}
