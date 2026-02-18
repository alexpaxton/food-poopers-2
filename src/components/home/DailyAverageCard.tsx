"use client";

import { useQuery } from "@tanstack/react-query";

import { StatCard } from "@/components/shared/StatCard";

export function DailyAverageCard() {
  const { data, status } = useQuery<{ average: number }>({
    queryKey: ["daily-average"],
    queryFn: () => fetch("/api/poops/daily-average").then((res) => res.json()),
  });

  if (status === "pending") {
    return <StatCard label="All-time daily avg" stat="..." />;
  }

  if (status === "error") {
    return <StatCard label="All-time daily avg" stat="!" />;
  }

  return <StatCard label="All-time daily avg" stat={data.average.toFixed(1)} />;
}
