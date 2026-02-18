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
  padding: 3rem;
`;

const Label = styled.dt`
  font-size: 2rem;
  font-weight: 700;
`;

const Stat = styled.dd`
  font-size: 4rem;
  font-weight: 200;
`;
