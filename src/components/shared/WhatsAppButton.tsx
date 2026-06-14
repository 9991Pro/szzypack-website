import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/content/config";

export function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-whatsapp text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium hidden sm:inline">Chat with us</span>
    </Link>
  );
}
