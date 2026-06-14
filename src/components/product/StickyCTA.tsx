"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MessageCircle } from "lucide-react";

export function StickyCTA({ productName }: { productName: string }) {
  return (
    <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 py-3 px-4 -mx-4 mt-8 lg:hidden">
      <div className="flex gap-3">
        <Link href={`/contact?product=${encodeURIComponent(productName)}`} className="flex-1">
          <Button variant="primary" size="md" className="w-full">
            Request Quote
          </Button>
        </Link>
        <a
          href={`https://wa.me/8613800000000?text=${encodeURIComponent(`Hi, I'm interested in ${productName}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="md">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
