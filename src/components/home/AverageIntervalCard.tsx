"use client";

import { useQuery } from "@tanstack/react-query";

import { StatCard } from "@/components/shared/StatCard";

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}:${m}`;
}

export function AverageIntervalCard() {
  const { data, status } = useQuery<{ averageMinutes: number | null }>({
    queryKey: ["average-interval"],
    queryFn: () =>
      fetch("/api/poops/average-interval").then((res) => res.json()),
  });

  if (status === "pending") {
    return <StatCard label="Avg interval" stat="..." />;
  }

  if (status === "error") {
    return <StatCard label="Avg interval" stat="!" />;
  }

  const stat =
    data.averageMinutes === null ? "—" : formatMinutes(data.averageMinutes);

  return <StatCard label="Avg interval" stat={stat} />;
}
