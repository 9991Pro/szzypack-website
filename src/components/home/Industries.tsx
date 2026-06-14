import Link from "next/link";

const industries = [
  { name: "Coffee", desc: "Degassing valves, aroma barrier, foil laminate", href: "/industries/coffee", icon: "☕" },
  { name: "Pet Food", desc: "Resealable zippers, odor-proof, durable", href: "/industries/pet-food", icon: "🐾" },
  { name: "Food & Snacks", desc: "Food-grade inks, grease barrier, high clarity", href: "/industries/food-snacks", icon: "🍿" },
  { name: "Supplements", desc: "UV protection, moisture barrier, child-safe", href: "/industries/supplements", icon: "💊" },
  { name: "Frozen Foods", desc: "Cold-resistant, puncture-proof, anti-fog", href: "/industries/frozen-foods", icon: "🧊" },
  { name: "Cosmetics", desc: "Soft-touch matte, metallic foil, luxury finish", href: "/industries/cosmetics", icon: "✨" },
];

export function Industries() {
  return (
    <section className="bg-dark-900 py-20 md:py-24">
      <div className="container-site">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Industries We Serve
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Specialized packaging solutions tailored to your industry's barrier,
            certification, and performance requirements.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <Link
              key={ind.name}
              href={ind.href}
              className="flex gap-4 p-5 rounded-lg border border-gray-700 hover:border-primary-500 bg-dark-800 hover:bg-dark-700 transition-all group"
            >
              <span className="text-2xl shrink-0">{ind.icon}</span>
              <div>
                <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {ind.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{ind.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
