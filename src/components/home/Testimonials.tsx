import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SZZYPack delivered our stand-up pouches ahead of schedule. The print quality exceeded our expectations, and their team was incredibly responsive throughout.",
    author: "Michael R.",
    role: "Founder, Artisan Coffee Co.",
    country: "USA",
  },
  {
    quote: "We switched from a local supplier and saved 30% on unit cost while getting better quality. The free samples within 3 days sealed the deal for us.",
    author: "Sarah L.",
    role: "Procurement Manager, PetFood Plus",
    country: "UK",
  },
  {
    quote: "Their BRC certification was a must for our retail partners. SZZYPack provided all the documentation we needed without any hassle.",
    author: "David K.",
    role: "Operations Director, NutriBrand",
    country: "Australia",
  },
];

export function Testimonials() {
  return (
    <section className="container-site py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-dark-900">
          What Our Clients Say
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.author} className="p-6 rounded-lg border border-gray-100 bg-white">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-gray-600 leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-4 pt-4 border-t border-gray-50">
              <p className="font-semibold text-dark-900">{t.author}</p>
              <p className="text-sm text-gray-400">{t.role} &middot; {t.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
