"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CancelBookingButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const onCancel = async () => {
    setErr(null);
    const ok = confirm("Cancel this booking? This cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.status !== 204 && !res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to cancel booking");
      }
      startTransition(() => router.refresh());
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="text-right">
      <Button
        onClick={onCancel}
        disabled={isPending}
        className="rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        {isPending ? "Cancelling…" : "Cancel"}
      </Button>
      {err ? <p className="mt-1 text-xs text-red-600">{err}</p> : null}
    </div>
  );
}
