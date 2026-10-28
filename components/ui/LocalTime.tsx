"use client";

import { useEffect, useState } from "react";

/**
 * Jam lokal pengunjung di zona waktu yang ditentukan.
 * Dirender kosong di server lalu diisi di klien untuk menghindari
 * hydration mismatch.
 */
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return (
    <span className="tabular-nums" aria-label={`Waktu lokal ${timeZone}`}>
      {time ?? "--:--"} WIB
    </span>
  );
}
