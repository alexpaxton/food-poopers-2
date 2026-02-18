"use client";

import { Poop } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const DAY_LABELS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function getIsoWeekday(date: Date): number {
  return date.getDay(); // 0 = Sunday, 6 = Saturday
}

export function WeeklyChart() {
  const { data: poops = [], status } = useQuery<Poop[]>({
    queryKey: ["my-weekly-poops"],
    queryFn: () => fetch("/api/poops").then((res) => res.json()),
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error loading poops</p>;
  }

  const counts = Array(7).fill(0);
  for (const poop of poops) {
    const day = getIsoWeekday(new Date(poop.createdAt));
    counts[day]++;
  }

  return (
    <Container>
      <Bar
        data={{
          labels: DAY_LABELS,
          datasets: [
            {
              data: counts,
              backgroundColor: "#000",
              borderWidth: 0,
              borderRadius: 4,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                callback: (_: unknown, index: number) => [
                  DAY_LABELS[index],
                  counts[index] === 0 ? "" : String(counts[index]),
                ],
                font: {
                  size: 16,
                  weight: "bold",
                  family: "Nunito, Nunito Fallback",
                },
              },
            },
            y: {
              grid: { display: true },
              ticks: { display: false },
              border: { display: false },
              beginAtZero: true,
              suggestedMax: 3,
            },
          },
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 25dvh;
  padding: 3rem;
`;
