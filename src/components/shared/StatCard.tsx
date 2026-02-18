"use client";

import styled from "styled-components";

type Props = {
  stat: string;
  label: string;
};

export function StatCard({ label, stat }: Props) {
  return (
    <Card>
      <Label>{label}</Label>
      <Stat>{stat}</Stat>
    </Card>
  );
}

const Card = styled.dl`
  background-color: #eee;
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

const Label = styled.dt`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Stat = styled.dd`
  font-size: 4rem;
  font-weight: 200;
`;
