import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export async function MDXRenderer({ content }: { content: string }) {
  const code = String(await compile(content, { outputFormat: "function-body" }));
  const { default: MDXContent } = await run(code, runtime);
  return <MDXContent />;
}
