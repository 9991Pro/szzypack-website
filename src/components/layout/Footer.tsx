import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/config";

export function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-300">
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteConfig.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">SZZYPack</span>
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-whatsapp transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
