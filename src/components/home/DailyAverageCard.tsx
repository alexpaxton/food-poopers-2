"use client";

import { useQuery } from "@tanstack/react-query";

import { StatCard } from "@/components/shared/StatCard";

export function DailyAverageCard() {
  const { data, status } = useQuery<{ average: number }>({
    queryKey: ["daily-average"],
    queryFn: () => fetch("/api/poops/daily-average").then((res) => res.json()),
  });
  const label = "Mean lifetime poops/day";
  let stat = "";

  if (status === "error") {
    stat = "!";
  }

  if (data !== undefined) {
    stat = data.average.toFixed(1);
  }

  return (
    <StatCard
      label={label}
      stat={stat}
      slot="stat1"
      loading={status === "pending"}
    />
  );
}
