"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/config";
import { cn } from "@/lib/utils";
import { searchEvents } from "@/lib/search-events";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-bold text-primary-800 tracking-tight">
            SZZYPack
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.navigation.main.map((item) => {
            if (item.label === "Products") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      "text-gray-600 hover:text-primary-700 hover:bg-primary-50",
                    )}
                  >
                    {item.label}
                  </Link>
                  <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-gray-600 hover:text-primary-700 hover:bg-primary-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => searchEvents.open()}>
            <Search className="h-4 w-4" />
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
