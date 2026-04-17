import { css } from 'styled-components'
import styled from 'styled-components'

import { COLORS } from '@/constants'

export const fieldElementStyles = css`
  font-size: 2rem;
  width: 100%;
  border-radius: 1rem;
  background-color: ${COLORS.bg.primary};
  color: ${COLORS.text.primary};
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
  outline: none;
  position: relative;
  z-index: 2;

  &:hover,
  &:focus {
    border-color: ${COLORS.border.selected};
  }

  &:disabled {
    background-color: ${COLORS.bg.secondary};
    border-color: ${COLORS.border.primary};
    color: ${COLORS.text.secondary};
  }
`

export const FieldGlow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 1rem);
  height: calc(100% + 1rem);
  transform: translate3d(-50%, -50%, 0);
  background: linear-gradient(
    90deg,
    ${COLORS.glow.start} 0%,
    ${COLORS.glow.stop} 100%
  );
  border-radius: 1.5rem;
  opacity: 0;
  transition: opacity 0.25s ease;
`

export const fieldContainerStyles = css`
  width: 100%;
  position: relative;

  &:focus-within ${FieldGlow} {
    opacity: ${COLORS.glow.opacity};
  }
`
