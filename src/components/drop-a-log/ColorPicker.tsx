'use client'

import styled from 'styled-components'

import { COLORS, POOP_COLORS } from '@/constants'

type Props = {
  onSelect: (color: string) => void
  selectedColor: string
}

export function ColorPicker({ onSelect, selectedColor }: Props) {
  return (
    <ColorGrid>
      {POOP_COLORS.map(({ color, hex }) => (
        <ColorButton key={color} onClick={() => onSelect(color)} title={color}>
          <Circle $hex={hex} $selected={selectedColor === color} />
          <Glow $selected={selectedColor === color} />
        </ColorButton>
      ))}
    </ColorGrid>
  )
}

const ColorGrid = styled.div`
  display: flex;
  padding: 0 3rem;
  gap: 0.25rem;
  justify-content: space-between;
`

const ColorButton = styled.div`
  position: relative;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
`

const Circle = styled.div<{ $hex: string; $selected: boolean }>`
  z-index: 3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  pointer-events: none;
  background-color: ${({ $hex }) => $hex};
  height: 5rem;
  width: 5rem;
  border: 0;
  border-radius: 50%;
  transition: border-color 0.25s ease;
  border: ${COLORS.border.width} solid
    ${({ $selected }) =>
      $selected ? COLORS.border.selected : COLORS.border.primary};
`

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
  opacity: ${({ $selected }) => ($selected ? 0.5 : 0)};
`
