"use server";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  destinationSchema,
  tourSchema,
  hotelSchema,
  vehicleSchema,
  blogSchema,
  faqSchema,
  heroSlideSchema,
  userSchema,
  settingsSchema,
} from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user as any;
}

async function logActivity(userId: string, action: string, entity: string, entityId?: string) {
  await prisma.activityLog.create({ data: { userId, action, entity, entityId } }).catch(() => {});
}

type ActionResult = { success: boolean; error?: string };

function ok(path: string): ActionResult {
  revalidatePath(path);
  return { success: true };
}
function fail(e: unknown): ActionResult {
  const message = e instanceof Error ? e.message : "Something went wrong";
  return { success: false, error: message };
}

// ---------- Destinations ----------
export async function createDestination(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = destinationSchema.parse(raw);
    const d = await prisma.destination.create({ data });
    await logActivity(user.id, "create", "destination", d.id);
    return ok("/admin/destinations");
  } catch (e) { return fail(e); }
}
export async function updateDestination(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = destinationSchema.partial().parse(raw);
    await prisma.destination.update({ where: { id }, data });
    await logActivity(user.id, "update", "destination", id);
    return ok("/admin/destinations");
  } catch (e) { return fail(e); }
}
export async function deleteDestination(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.destination.delete({ where: { id } });
    await logActivity(user.id, "delete", "destination", id);
    return ok("/admin/destinations");
  } catch (e) { return fail(e); }
}

// ---------- Tours ----------
export async function createTour(raw: any) {
  try {
    const user = await requireAdmin();
    const data = tourSchema.parse(raw);
    const t = await prisma.tour.create({ data: { ...data, itinerary: raw.itinerary || [] } });
    await logActivity(user.id, "create", "tour", t.id);
    return ok("/admin/tours");
  } catch (e) { return fail(e); }
}
export async function updateTour(id: string, raw: any) {
  try {
    const user = await requireAdmin();
    const data = tourSchema.partial().parse(raw);
    await prisma.tour.update({ where: { id }, data: { ...data, ...(raw.itinerary ? { itinerary: raw.itinerary } : {}) } });
    await logActivity(user.id, "update", "tour", id);
    return ok("/admin/tours");
  } catch (e) { return fail(e); }
}
export async function deleteTour(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.tour.delete({ where: { id } });
    await logActivity(user.id, "delete", "tour", id);
    return ok("/admin/tours");
  } catch (e) { return fail(e); }
}

// ---------- Hotels ----------
export async function createHotel(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = hotelSchema.parse(raw);
    const h = await prisma.hotel.create({ data });
    await logActivity(user.id, "create", "hotel", h.id);
    return ok("/admin/hotels");
  } catch (e) { return fail(e); }
}
export async function updateHotel(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = hotelSchema.partial().parse(raw);
    await prisma.hotel.update({ where: { id }, data });
    await logActivity(user.id, "update", "hotel", id);
    return ok("/admin/hotels");
  } catch (e) { return fail(e); }
}
export async function deleteHotel(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.hotel.delete({ where: { id } });
    await logActivity(user.id, "delete", "hotel", id);
    return ok("/admin/hotels");
  } catch (e) { return fail(e); }
}

// ---------- Vehicles ----------
export async function createVehicle(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = vehicleSchema.parse(raw);
    const v = await prisma.vehicle.create({ data });
    await logActivity(user.id, "create", "vehicle", v.id);
    return ok("/admin/vehicles");
  } catch (e) { return fail(e); }
}
export async function updateVehicle(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = vehicleSchema.partial().parse(raw);
    await prisma.vehicle.update({ where: { id }, data });
    await logActivity(user.id, "update", "vehicle", id);
    return ok("/admin/vehicles");
  } catch (e) { return fail(e); }
}
export async function deleteVehicle(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.vehicle.delete({ where: { id } });
    await logActivity(user.id, "delete", "vehicle", id);
    return ok("/admin/vehicles");
  } catch (e) { return fail(e); }
}

// ---------- Blogs ----------
export async function createBlog(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = blogSchema.parse(raw);
    const b = await prisma.blog.create({ data });
    await logActivity(user.id, "create", "blog", b.id);
    return ok("/admin/blogs");
  } catch (e) { return fail(e); }
}
export async function updateBlog(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = blogSchema.partial().parse(raw);
    await prisma.blog.update({ where: { id }, data });
    await logActivity(user.id, "update", "blog", id);
    return ok("/admin/blogs");
  } catch (e) { return fail(e); }
}
export async function deleteBlog(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.blog.delete({ where: { id } });
    await logActivity(user.id, "delete", "blog", id);
    return ok("/admin/blogs");
  } catch (e) { return fail(e); }
}

// ---------- Gallery ----------
export async function createGalleryImage(raw: { title?: string; category: string; imageUrl: string; order?: number }) {
  try {
    const user = await requireAdmin();
    const g = await prisma.galleryImage.create({ data: raw });
    await logActivity(user.id, "create", "gallery", g.id);
    return ok("/admin/gallery");
  } catch (e) { return fail(e); }
}
export async function deleteGalleryImage(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.galleryImage.delete({ where: { id } });
    await logActivity(user.id, "delete", "gallery", id);
    return ok("/admin/gallery");
  } catch (e) { return fail(e); }
}

// ---------- FAQs ----------
export async function createFaq(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = faqSchema.parse(raw);
    const f = await prisma.fAQ.create({ data });
    await logActivity(user.id, "create", "faq", f.id);
    return ok("/admin/faqs");
  } catch (e) { return fail(e); }
}
export async function updateFaq(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = faqSchema.partial().parse(raw);
    await prisma.fAQ.update({ where: { id }, data });
    await logActivity(user.id, "update", "faq", id);
    return ok("/admin/faqs");
  } catch (e) { return fail(e); }
}
export async function deleteFaq(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.fAQ.delete({ where: { id } });
    await logActivity(user.id, "delete", "faq", id);
    return ok("/admin/faqs");
  } catch (e) { return fail(e); }
}

// ---------- Hero Slides ----------
export async function createHeroSlide(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = heroSlideSchema.parse(raw);
    const h = await prisma.heroSlide.create({ data });
    await logActivity(user.id, "create", "hero_slide", h.id);
    return ok("/admin/hero-slides");
  } catch (e) { return fail(e); }
}
export async function updateHeroSlide(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = heroSlideSchema.partial().parse(raw);
    await prisma.heroSlide.update({ where: { id }, data });
    await logActivity(user.id, "update", "hero_slide", id);
    return ok("/admin/hero-slides");
  } catch (e) { return fail(e); }
}
export async function deleteHeroSlide(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.heroSlide.delete({ where: { id } });
    await logActivity(user.id, "delete", "hero_slide", id);
    return ok("/admin/hero-slides");
  } catch (e) { return fail(e); }
}

// ---------- Inquiries ----------
export async function updateInquiryStatus(id: string, status: "NEW" | "CONTACTED" | "CONFIRMED" | "CLOSED") {
  try {
    const user = await requireAdmin();
    await prisma.inquiry.update({ where: { id }, data: { status } });
    await logActivity(user.id, "update_status", "inquiry", id);
    return ok("/admin/inquiries");
  } catch (e) { return fail(e); }
}
export async function deleteInquiry(id: string) {
  try {
    const user = await requireAdmin();
    await prisma.inquiry.delete({ where: { id } });
    await logActivity(user.id, "delete", "inquiry", id);
    return ok("/admin/inquiries");
  } catch (e) { return fail(e); }
}

// ---------- Users ----------
export async function createUser(raw: unknown) {
  try {
    const user = await requireAdmin();
    if (user.role !== "SUPER_ADMIN") throw new Error("Only super admins can manage users");
    const data = userSchema.parse(raw);
    if (!data.password) throw new Error("Password is required for new users");
    const passwordHash = await bcrypt.hash(data.password, 10);
    const created = await prisma.user.create({
      data: { name: data.name, email: data.email, passwordHash, role: data.role, active: data.active },
    });
    await logActivity(user.id, "create", "user", created.id);
    return ok("/admin/users");
  } catch (e) { return fail(e); }
}
export async function updateUser(id: string, raw: unknown) {
  try {
    const user = await requireAdmin();
    if (user.role !== "SUPER_ADMIN") throw new Error("Only super admins can manage users");
    const data = userSchema.partial().parse(raw);
    const updateData: any = { name: data.name, email: data.email, role: data.role, active: data.active };
    if (data.password) updateData.passwordHash = await bcrypt.hash(data.password, 10);
    await prisma.user.update({ where: { id }, data: updateData });
    await logActivity(user.id, "update", "user", id);
    return ok("/admin/users");
  } catch (e) { return fail(e); }
}
export async function deleteUser(id: string) {
  try {
    const user = await requireAdmin();
    if (user.role !== "SUPER_ADMIN") throw new Error("Only super admins can manage users");
    await prisma.user.delete({ where: { id } });
    await logActivity(user.id, "delete", "user", id);
    return ok("/admin/users");
  } catch (e) { return fail(e); }
}

// ---------- Settings ----------
export async function updateSettings(raw: unknown) {
  try {
    const user = await requireAdmin();
    const data = settingsSchema.parse(raw);
    await prisma.siteSettings.upsert({ where: { id: "singleton" }, update: data, create: { id: "singleton", ...data } });
    await logActivity(user.id, "update", "settings", "singleton");
    return ok("/admin/settings");
  } catch (e) { return fail(e); }
}
