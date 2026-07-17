import { ShieldCheck, MapPinned, Users2, Headphones } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Registered & Trusted", desc: "Registered travel company operating since 2019." },
  { icon: MapPinned, title: "Local Expertise", desc: "Guides and drivers who know every valley and pass." },
  { icon: Users2, title: "Family & Group Friendly", desc: "Custom itineraries for solo travelers to large groups." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our team is with you before, during and after the trip." },
];

export function WhyUsGrid() {
  return (
    <div className="container -mt-1 grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="rounded-lg border border-border p-6 text-center transition-shadow hover:shadow-lg">
          <item.icon className="mx-auto h-8 w-8 text-gold-dark" />
          <h3 className="mt-4 font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
