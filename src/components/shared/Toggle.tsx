'use client'

import styled from 'styled-components'

import { COLORS } from '@/constants'

type Props = {
  active: boolean
  onToggle: (active: boolean) => void
}

export function Toggle({ active, onToggle }: Props) {
  return (
    <Track $active={active} onClick={() => onToggle(!active)}>
      <Knob $active={active} />
      <ActiveTrack $active={active} />
      <Glow $active={active} />
    </Track>
  )
}

const Knob = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate3d(
    ${({ $active }) => ($active ? '4.25rem' : '0.25rem')},
    -50%,
    0
  );
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  transition:
    transform 0.25s cubic-bezier(0.87, 0, 0.13, 1),
    border-color 0.25s ease;
  border: ${COLORS.border.width} solid ${COLORS.border.selected};
  background-color: ${COLORS.bg.primary};
  z-index: 3;
`

const Track = styled.div<{ $active: boolean }>`
  width: 9rem;
  height: 5rem;
  border-radius: 2.5rem;
  border: ${COLORS.border.width} solid
    ${({ $active }) =>
      $active ? COLORS.border.selected : COLORS.border.primary};
  background-color: ${COLORS.bg.secondary};
  position: relative;
`

const ActiveTrack = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 2.5rem;
  transition: opacity 0.25s cubic-bezier(0.87, 0, 0.13, 1);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  background: linear-gradient(
    90deg,
    ${COLORS.fire.start} 0%,
    ${COLORS.fire.stop} 100%
  );
  z-index: 2;
`

const Glow = styled.div<{ $active: boolean }>`
  position: absolute;
  z-index: 1;
  top: -0.75rem;
  right: -0.75rem;
  bottom: -0.75rem;
  left: -0.75rem;
  background: linear-gradient(
    90deg,
    ${COLORS.glow.start} 0%,
    ${COLORS.glow.stop} 100%
  );
  border-radius: 3.5rem;
  transition: opacity 0.25s ease;
  opacity: ${({ $active }) => ($active ? COLORS.glow.opacity : 0)};
`
