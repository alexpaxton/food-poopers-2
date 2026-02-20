"use client";

import styled from "styled-components";

import { COLORS } from "@/constants";

type Props = {
  stat: string;
  label: string;
  slot: "stat1" | "stat2" | "stat3" | "stat4";
};

export function StatCard({ label, stat, slot }: Props) {
  return (
    <Card $slot={slot}>
      <Label>{label}</Label>
      <Stat>{stat}</Stat>
    </Card>
  );
}

const Card = styled.dl<{ $slot: string }>`
  background-color: ${COLORS.bg.primary};
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  grid-area: ${({ $slot }) => $slot};
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
`;

const Label = styled.dt`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Stat = styled.dd`
  font-size: 4rem;
  font-weight: 200;
`;
