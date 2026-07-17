"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

type Day = { day: number; title: string; description: string };

export function ItineraryEditor({ initial }: { initial: Day[] }) {
  const [days, setDays] = useState<Day[]>(initial.length ? initial : [{ day: 1, title: "", description: "" }]);

  function update(i: number, patch: Partial<Day>) {
    setDays((d) => d.map((day, idx) => (idx === i ? { ...day, ...patch } : day)));
  }
  function addDay() {
    setDays((d) => [...d, { day: d.length + 1, title: "", description: "" }]);
  }
  function removeDay(i: number) {
    setDays((d) => d.filter((_, idx) => idx !== i).map((day, idx) => ({ ...day, day: idx + 1 })));
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="itineraryJson" value={JSON.stringify(days)} readOnly />
      {days.map((d, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Day {d.day}</span>
            <Button type="button" variant="ghost" size="icon" onClick={() => removeDay(i)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          <Input placeholder="Day title, e.g. Arrival in Skardu" value={d.title} onChange={(e) => update(i, { title: e.target.value })} />
          <Textarea placeholder="Day description" value={d.description} onChange={(e) => update(i, { description: e.target.value })} />
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addDay}>
        <Plus className="h-4 w-4" /> Add Day
      </Button>
    </div>
  );
}
