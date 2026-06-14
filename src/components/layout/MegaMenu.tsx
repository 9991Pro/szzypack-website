import Link from "next/link";
import { cn } from "@/lib/utils";

const productCategories = [
  {
    title: "By Pouch Type",
    items: [
      { label: "Stand Up Pouches", href: "/products/stand-up-pouches", desc: "Most popular, resealable zipper" },
      { label: "Flat Bottom Bags", href: "/products/flat-bottom-bags", desc: "Shelf-stable, premium look" },
      { label: "Roll Film", href: "/products/roll-film", desc: "High-speed packaging lines" },
      { label: "Side Gusset Bags", href: "/products/side-gusset-bags", desc: "High volume, block bottom" },
      { label: "Spout Pouches", href: "/products/spout-pouches", desc: "Liquid & semi-liquid products" },
      { label: "All Products →", href: "/products", desc: "View full catalog" },
    ],
  },
  {
    title: "By Industry",
    items: [
      { label: "Coffee Packaging", href: "/industries/coffee", desc: "Degassing valves, aroma protection" },
      { label: "Pet Food", href: "/industries/pet-food", desc: "Resealable, odor barrier" },
      { label: "Food & Snacks", href: "/industries/food-snacks", desc: "Food-grade certified" },
      { label: "Supplements", href: "/industries/supplements", desc: "Moisture & UV protection" },
    ],
  },
];

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-lg shadow-lg border border-gray-100 p-6 transition-all duration-200",
        open
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-1",
      )}
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-2 gap-8">
        {productCategories.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              {col.title}
            </h4>
            <ul className="space-y-1">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block px-3 py-2 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 hover:text-primary-700">
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="block text-xs text-gray-400 mt-0.5">
                        {item.desc}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
