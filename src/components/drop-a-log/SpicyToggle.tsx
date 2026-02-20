"use client";

import styled from "styled-components";

import { Toggle } from "@/components/shared/Toggle";

type Props = {
  spicy: boolean;
  onToggleSpicy: (spicy: boolean) => void;
};

export function SpicyToggle({ spicy, onToggleSpicy }: Props) {
  return (
    <Container>
      <Toggle active={spicy} onToggle={onToggleSpicy} />
      <Label>Spicy</Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const Label = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;
