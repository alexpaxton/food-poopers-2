'use client'

import { MouseEvent, useState } from 'react'
import styled from 'styled-components'

import { COLORS, POOP_COLORS } from '@/constants'

type Props = {
  onSelect: (color: string) => void
  selectedColor: string
}

export function ColorPicker({ onSelect, selectedColor }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  function handleSelect(e: MouseEvent, color: string) {
    e.stopPropagation()
    if (isExpanded) {
      setIsExpanded(false)
      onSelect(color)
    } else {
      setIsExpanded(true)
    }
  }

  return (
    <Container>
      {POOP_COLORS.map(({ color, hex }, index) => (
        <ColorButton
          key={color}
          onClick={(e) => handleSelect(e, color)}
          title={color}
          $pos={index}
          $isExpanded={isExpanded}
          $selected={selectedColor === color}
        >
          <Circle $hex={hex} $selected={selectedColor === color} />
          <Glow $isVisible={selectedColor === color && isExpanded} />
        </ColorButton>
      ))}
    </Container>
  )
}

const COORDS = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 0,
    y: 2,
  },
  {
    x: 2,
    y: 0,
  },
]

function getTransform(i: number) {}

const Container = styled.div`
  position: relative;
  height: 5rem;
  width: 5rem;
  z-index: 50;
`

const ColorButton = styled.div<{
  $pos: number
  $isExpanded: boolean
  $selected: boolean
}>`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
  z-index: ${({ $pos, $selected }) => ($selected ? '10' : `${$pos + 1}`)};
  transition: transform 0.35s cubic-bezier(0.87, 0, 0.13, 1);
  transform: ${({ $pos, $isExpanded }) =>
    $isExpanded
      ? `translate3d(${COORDS[$pos].x * -6}rem, ${COORDS[$pos].y * 6}rem, 0)`
      : 'translate3d(0,0,0)'};
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

const Glow = styled.div<{ $isVisible: boolean }>`
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
  opacity: ${({ $isVisible }) => ($isVisible ? 0.5 : 0)};
`
