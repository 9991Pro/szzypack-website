import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mt-12 mb-6 text-dark-900" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-dark-900" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold mt-8 mb-3 text-dark-900" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="leading-relaxed mb-4 text-gray-700" {...props}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-primary-700 underline decoration-primary-300 hover:decoration-primary-700 transition"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary-500 pl-4 italic my-6 text-gray-600"
        {...props}
      >
        {children}
      </blockquote>
    ),
    img: ({ alt, src, ...props }) => (
      <img
        src={src}
        alt={alt || ""}
        className="rounded-lg my-6 w-full"
        loading="lazy"
        {...props}
      />
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 text-primary-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table
          className="w-full border-collapse border border-gray-200 text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-200 px-4 py-2" {...props}>
        {children}
      </td>
    ),
    ...components,
  };
}
