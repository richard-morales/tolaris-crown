"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BookForm({
  roomId,
  capacity,
}: {
  roomId: string;
  capacity: number;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, checkIn, checkOut, guests }),
    });

    setLoading(false);

    if (res.status === 401) {
      // Not signed in -> send to signin with callback to come back here
      window.location.href = `/auth/signin?callbackUrl=${encodeURIComponent(
        window.location.pathname
      )}`;
      return;
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMsg(data?.error ?? "Booking failed.");
      return;
    }

    // success
    window.location.href = "/account/bookings";
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-3">
      <input
        type="date"
        className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />
      <input
        type="date"
        className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />
      <input
        type="number"
        min={1}
        max={capacity}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="w-full h-11 rounded-md border border-black/10 px-3 outline-none focus:ring-[3px] focus:ring-black/15"
        aria-label="Number of guests"
      />
      {msg ? <p className="text-sm text-red-700">{msg}</p> : null}
      <Button
        type="submit"
        variant="brand"
        className="w-full rounded-xl"
        disabled={loading}
      >
        {loading ? "Checking…" : "Book"}
      </Button>
    </form>
  );
}
