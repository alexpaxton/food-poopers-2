"use client";

import styled from "styled-components";

import { Shell } from "@/components/shared/Shell";

import { AverageIntervalCard } from "@/components/home/AverageIntervalCard";
import { DailyAverageCard } from "@/components/home/DailyAverageCard";
import { WeeklyChart } from "@/components/home/WeeklyChart";

export function Me() {
  return (
    <Shell name="Weekly stats">
      <WeeklyChart />
      <StatContainer>
        <DailyAverageCard />
        <AverageIntervalCard />
      </StatContainer>
    </Shell>
  );
}
const StatContainer = styled.div`
  padding: 3rem;
  padding-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
`;
