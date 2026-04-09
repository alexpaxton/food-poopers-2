'use client'

import { PepperIcon } from '@phosphor-icons/react'
import styled from 'styled-components'

import { COLORS } from '@/constants'

type Props = {
  spicy: boolean
  onToggleSpicy: (spicy: boolean) => void
}

export function SpicyToggle({ spicy, onToggleSpicy }: Props) {
  return (
    <Button onClick={() => onToggleSpicy(!spicy)}>
      <Circle $selected={spicy}>
        <PepperIcon weight="regular" size={24} />
      </Circle>
      <Glow $selected={spicy} />
    </Button>
  )
}

const Button = styled.div`
  position: relative;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
`

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
  opacity: ${({ $selected }) => ($selected ? COLORS.glow.opacity : 0)};
`
