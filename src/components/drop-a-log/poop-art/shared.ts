import styled from 'styled-components'

import { COLORS } from '@/constants'

export type PoopArtProps = {
  className: string
  selected: boolean
  spicy: boolean
  primaryColor: string
  secondaryColor: string
}

export const Accent = styled.path<{ $color: string }>`
  fill: ${({ $color }) => $color};
  transition: fill 0.25s ease;
`

export const Main = styled.path<{ $color: string }>`
  fill: ${({ $color }) => $color};
  transition: fill 0.25s ease;
`

export const Outline = styled.path`
  fill: ${COLORS.border.selected};
  stroke: ${COLORS.border.selected};
  stroke-miterlimit: 10;
  stroke-width: 0.5rem;
`

export const Glow = styled.path<{ $visible: boolean }>`
  transition: opacity 0.25s ease;
  opacity: ${({ $visible }) => ($visible ? COLORS.glow.opacity : 0)};
  fill: url(#glow-gradient);
`

export const Fire = styled.path<{ $visible: boolean }>`
  transition: opacity 0.25s ease;
  opacity: ${({ $visible }) => ($visible ? COLORS.fire.opacity : 0)};
  fill: url(#fire-gradient);
`
