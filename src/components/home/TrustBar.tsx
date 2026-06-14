export function TrustBar() {
  const items = [
    { label: "Years Experience", value: "15+" },
    { label: "Brands Served", value: "500+" },
    { label: "Countries Exported", value: "30+" },
    { label: "Samples Turnaround", value: "3 Days" },
    { label: "Certifications", value: "ISO/BRC" },
  ];

  return (
    <section className="border-y border-gray-100 py-10">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-bold text-primary-700">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
