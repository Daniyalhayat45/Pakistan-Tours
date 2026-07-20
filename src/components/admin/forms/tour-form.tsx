"use client";
import { createTour, updateTour } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ItineraryEditor } from "@/components/admin/itinerary-editor";
import type { Tour, Destination } from "@prisma/client";

type SerializedTour = Omit<Tour, "priceFrom"> & { priceFrom: number };

export function TourForm({ tour, destinations }: { tour?: SerializedTour; destinations: Destination[] }) {
  const isEdit = !!tour;

  async function action(data: any) {
    const { itineraryJson, ...rest } = data;
    let itinerary: any[] = [];
    try {
      itinerary = itineraryJson ? JSON.parse(itineraryJson) : [];
    } catch {
      itinerary = [];
    }
    const payload = { ...rest, itinerary };
    return isEdit ? updateTour(tour!.id, payload) : createTour(payload);
  }

  const itineraryInitial = (tour?.itinerary as any[]) || [];

  return (
    <EntityForm action={action} redirectTo="/admin/tours" submitLabel={isEdit ? "Update Tour" : "Create Tour"}>
      <FieldGrid>
        <Field label="Title (English)" name="title">
          <Input name="title" defaultValue={tour?.title} required />
        </Field>
        <Field label="Title (Urdu)" name="titleUr">
          <Input name="titleUr" defaultValue={tour?.titleUr ?? ""} dir="rtl" />
        </Field>
        <Field label="Slug" name="slug">
          <Input name="slug" defaultValue={tour?.slug} required />
        </Field>
        <Field label="Destination" name="destinationId">
          <Select name="destinationId" defaultValue={tour?.destinationId ?? undefined}>
            <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldGrid>

      <Field label="Summary (English)" name="summary">
        <Textarea name="summary" defaultValue={tour?.summary} required />
      </Field>
      <Field label="Summary (Urdu)" name="summaryUr">
        <Textarea name="summaryUr" defaultValue={tour?.summaryUr ?? ""} dir="rtl" />
      </Field>

      <FieldGrid>
        <Field label="Duration (Days)" name="durationDays">
          <Input name="durationDays" type="number" min={1} defaultValue={tour?.durationDays ?? 3} required />
        </Field>
        <Field label="Duration (Nights)" name="durationNights">
          <Input name="durationNights" type="number" min={0} defaultValue={tour?.durationNights ?? 2} required />
        </Field>
        <Field label="Price From (PKR)" name="priceFrom">
          <Input name="priceFrom" type="number" min={0} step="0.01" defaultValue={tour ? Number(tour.priceFrom) : undefined} required />
        </Field>
        <Field label="Max Group Size" name="groupSizeMax">
          <Input name="groupSizeMax" type="number" min={1} defaultValue={tour?.groupSizeMax ?? ""} />
        </Field>
        <Field label="Difficulty" name="difficulty">
          <Input name="difficulty" defaultValue={tour?.difficulty ?? ""} placeholder="Easy / Moderate / Challenging" />
        </Field>
        <Field label="Cover Image URL" name="coverImage">
          <Input name="coverImage" type="url" defaultValue={tour?.coverImage} required />
        </Field>
      </FieldGrid>

      <Field label="Gallery Images" name="images" hint="One image URL per line">
        <Textarea name="images" data-list="true" rows={4} defaultValue={(tour?.images ?? []).join("\n")} />
      </Field>

      <FieldGrid>
        <Field label="Inclusions" name="inclusions" hint="One per line">
          <Textarea name="inclusions" data-list="true" rows={4} defaultValue={(tour?.inclusions ?? []).join("\n")} />
        </Field>
        <Field label="Exclusions" name="exclusions" hint="One per line">
          <Textarea name="exclusions" data-list="true" rows={4} defaultValue={(tour?.exclusions ?? []).join("\n")} />
        </Field>
        <Field label="Meals" name="meals" hint="One per line">
          <Textarea name="meals" data-list="true" rows={3} defaultValue={(tour?.meals ?? []).join("\n")} />
        </Field>
        <Field label="Packing List" name="packingList" hint="One per line">
          <Textarea name="packingList" data-list="true" rows={3} defaultValue={(tour?.packingList ?? []).join("\n")} />
        </Field>
      </FieldGrid>

      <Field label="Weather Info" name="weatherInfo">
        <Textarea name="weatherInfo" defaultValue={tour?.weatherInfo ?? ""} />
      </Field>
      <Field label="Policies" name="policies">
        <Textarea name="policies" defaultValue={tour?.policies ?? ""} />
      </Field>

      <Field label="Day-by-Day Itinerary">
        <ItineraryEditor initial={itineraryInitial} />
      </Field>

      <FieldGrid>
        <Field label="Featured" name="featured">
          <div className="flex h-10 items-center"><Switch name="featured" defaultChecked={tour?.featured ?? false} /></div>
        </Field>
        <Field label="Published" name="published">
          <div className="flex h-10 items-center"><Switch name="published" defaultChecked={tour?.published ?? true} /></div>
        </Field>
      </FieldGrid>
    </EntityForm>
  );
}
