"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/config";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-primary-800">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 gap-1">
          {siteConfig.navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="px-3 py-2.5 text-base font-medium text-gray-700 rounded-md hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Button className="w-full" asChild>
            <Link href="/contact" onClick={onClose}>
              Get a Quote
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
