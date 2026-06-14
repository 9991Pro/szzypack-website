import type { ProductSpecifications } from "@/lib/products";

const labelMap: Record<string, string> = {
  material: "Material Structure",
  sizes: "Available Sizes",
  thickness: "Thickness",
  moq: "MOQ",
  leadTime: "Lead Time",
  printing: "Printing",
  closure: "Closure",
  finishing: "Finishing",
};

export function SpecTable({ specs }: { specs: ProductSpecifications }) {
  const entries = Object.entries(specs).filter(([, v]) => v);
  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value], i) => (
            <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-medium text-gray-700 w-1/3">
                {labelMap[key] || key}
              </td>
              <td className="px-4 py-3 text-gray-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
