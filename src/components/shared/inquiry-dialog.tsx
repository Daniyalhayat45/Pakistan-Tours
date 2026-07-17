"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InquiryForm } from "./inquiry-form";

export function InquiryButton({
  type = "GENERAL",
  tourId,
  hotelId,
  vehicleId,
  label,
  size = "sm",
}: {
  type?: "TOUR" | "HOTEL" | "VEHICLE" | "CUSTOM" | "GENERAL";
  tourId?: string;
  hotelId?: string;
  vehicleId?: string;
  label: string;
  size?: "default" | "sm" | "lg";
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size={size} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send an Inquiry</DialogTitle>
        </DialogHeader>
        <InquiryForm type={type} tourId={tourId} hotelId={hotelId} vehicleId={vehicleId} />
      </DialogContent>
    </Dialog>
  );
}
