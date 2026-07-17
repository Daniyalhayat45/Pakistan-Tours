"use server";
import { prisma } from "@/lib/db";
import { inquirySchema } from "@/lib/validations";
import { z } from "zod";

export async function submitInquiry(raw: unknown) {
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.data ? "Invalid input" : parsed.error.issues[0]?.message || "Invalid input" };
  }
  const data = parsed.data;
  try {
    await prisma.inquiry.create({
      data: {
        type: data.type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        travelDate: data.travelDate ? new Date(data.travelDate) : undefined,
        guests: data.guests,
        tourId: data.tourId || undefined,
        hotelId: data.hotelId || undefined,
        vehicleId: data.vehicleId || undefined,
      },
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

const newsletterSchema = z.object({ email: z.string().email() });

export async function subscribeNewsletter(raw: unknown) {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Please enter a valid email." };
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { active: true },
      create: { email: parsed.data.email },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Could not subscribe. Try again later." };
  }
}
