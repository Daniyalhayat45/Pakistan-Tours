import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Compass, MapPin, Hotel, Car, Inbox, Newspaper } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  const [tours, destinations, hotels, vehicles, newInquiries, totalInquiries, blogs, recentInquiries] = await Promise.all([
    prisma.tour.count(),
    prisma.destination.count(),
    prisma.hotel.count(),
    prisma.vehicle.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count(),
    prisma.blog.count(),
    prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const stats = [
    { label: "Tours", value: tours, icon: Compass, href: "/admin/tours" },
    { label: "Destinations", value: destinations, icon: MapPin, href: "/admin/destinations" },
    { label: "Hotels", value: hotels, icon: Hotel, href: "/admin/hotels" },
    { label: "Vehicles", value: vehicles, icon: Car, href: "/admin/vehicles" },
    { label: "Blog Posts", value: blogs, icon: Newspaper, href: "/admin/blogs" },
    { label: "New Inquiries", value: newInquiries, icon: Inbox, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <AdminTopbar title="Dashboard" user={session?.user as any} />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="mt-1 text-3xl font-bold">{s.value}</p>
                  </div>
                  <s.icon className="h-8 w-8 text-gold-dark" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Inquiries ({totalInquiries} total)</CardTitle>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No inquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((i) => (
                  <div key={i.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{i.name} &middot; {i.email}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(i.createdAt)} &middot; {i.type}</p>
                    </div>
                    <Badge variant={i.status === "NEW" ? "default" : "secondary"}>{i.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
