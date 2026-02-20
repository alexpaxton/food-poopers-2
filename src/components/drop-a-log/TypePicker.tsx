"use client";

import styled from "styled-components";

import { BRISTOL_TYPES, COLORS } from "@/constants";

type Props = {
  onSelect: (type: number) => void;
  selectedType: number;
};

export function TypePicker({ onSelect, selectedType }: Props) {
  return (
    <Grid>
      {BRISTOL_TYPES.map(({ type }) => (
        <Button
          key={`type_picker-${type}`}
          onClick={() => onSelect(type)}
          title={`type_picker-${type}`}
        >
          <Circle $selected={selectedType === type}>{type}</Circle>
          <Glow $selected={selectedType === type} />
        </Button>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: flex;
  padding: 0 3rem;
  gap: 0.25rem;
  justify-content: space-between;
`;

const Button = styled.div`
  position: relative;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
`;

const Circle = styled.div<{ $selected: boolean }>`
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background-color: ${COLORS.bg.primary};
  color: ${COLORS.text.primary};
  border-style: solid;
  border-width: ${COLORS.border.width};
  border-color: ${({ $selected }) =>
    $selected ? COLORS.border.selected : COLORS.border.primary};
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  transition: border-color 0.25s ease;
  font-size: 2rem;
  font-weight: 800;
`;

const Glow = styled.div<{ $selected: boolean }>`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  background: linear-gradient(
    90deg,
    ${COLORS.glow.start} 0%,
    ${COLORS.glow.stop} 100%
  );
  border-radius: 50%;
  transition: opacity 0.25s ease;
  opacity: ${({ $selected }) => ($selected ? COLORS.glow.opacity : 0)};
`;
