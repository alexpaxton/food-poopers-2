'use client'

import { Poop } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import styled, { css } from 'styled-components'

import { Spinner } from '@/components/shared/Spinner'

import { BRISTOL_TYPES, COLORS, POOP_COLORS } from '@/constants'

const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
const SWATCH_SIZE = '1.75rem'
const GAP_MAX_HEIGHT_REM = 16
const GAP_MIN_HEIGHT_REM = 2.5
const MS_PER_HOUR = 60 * 60 * 1000
// Badge color stops by how many standard deviations a gap is from the mean gap.
// Colors between stops are interpolated, and z beyond the last stop is clamped.
const GAP_DEVIATION_COLOR_STOPS = [
  { z: 0, bg: '#daf2e6', text: '#1f7a4d' },
  { z: 1, bg: '#fff3cd', text: '#8a6d00' },
  { z: 2, bg: '#fde2e2', text: '#b42318' },
]

function hexToRgb(hex: string): number[] {
  const value = parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function mixHex(from: string, to: string, t: number): string {
  const a = hexToRgb(from)
  const b = hexToRgb(to)
  const [r, g, bl] = a.map((c, i) => Math.round(c + (b[i] - c) * t))
  return `rgb(${r}, ${g}, ${bl})`
}

function getGapColors(gap: number, mean: number, stdDev: number) {
  const stops = GAP_DEVIATION_COLOR_STOPS
  const lastStop = stops[stops.length - 1]
  const z = Math.min(stdDev > 0 ? Math.abs(gap - mean) / stdDev : 0, lastStop.z)
  const upperIndex = Math.max(
    1,
    stops.findIndex((s) => s.z >= z)
  )
  const lower = stops[upperIndex - 1]
  const upper = stops[upperIndex]
  const t = (z - lower.z) / (upper.z - lower.z)
  return {
    bg: mixHex(lower.bg, upper.bg, t),
    text: mixHex(lower.text, upper.text, t),
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function Logs() {
  const { data, status } = useQuery<Poop[]>({
    queryKey: ['my-poops-30d'],
    queryFn: () =>
      fetch(`/api/poops?since=${THIRTY_DAYS_AGO.toISOString()}`).then((res) =>
        res.json()
      ),
  })
  const poops = Array.isArray(data) ? data : []

  // Poops are sorted newest first, so gaps[i] is the time between poops[i] and the poop before it
  const gaps = poops
    .slice(0, -1)
    .map(
      (poop, i) =>
        new Date(poop.createdAt).getTime() -
        new Date(poops[i + 1].createdAt).getTime()
    )
  const maxGap = Math.max(0, ...gaps)
  const meanGap = gaps.reduce((sum, g) => sum + g, 0) / (gaps.length || 1)
  const gapStdDev = Math.sqrt(
    gaps.reduce((sum, g) => sum + (g - meanGap) ** 2, 0) / (gaps.length || 1)
  )

  if (status === 'pending') {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }

  if (status === 'error') {
    return (
      <Container>
        <Empty>Error loading logs</Empty>
      </Container>
    )
  }

  if (poops.length === 0) {
    return (
      <Container>
        <Empty>No logs in the past 30 days</Empty>
      </Container>
    )
  }

  return (
    <Container>
      <Title>Poops in the last 30 days</Title>
      {poops.map((poop, i) => {
        const colorEntry = POOP_COLORS.find((c) => c.color === poop.color)
        const bristolType = BRISTOL_TYPES.find((b) => b.type === poop.type)
        const gap = gaps[i]
        const hasPrev = i > 0
        const hasNext = gap !== undefined
        return (
          <div key={poop.id}>
            <Row>
              <SwatchCell $hasPrev={hasPrev} $hasNext={hasNext}>
                <ColorSwatch
                  $hex={colorEntry?.hex ?? COLORS.bg.secondary}
                  title={colorEntry?.color}
                />
              </SwatchCell>
              <RowMain>
                <DateLabel>{formatDate(new Date(poop.createdAt))}</DateLabel>
                <Badges>
                  {poop.spicy && <SpicyBadge>🌶</SpicyBadge>}
                  {bristolType && <Badge>T{bristolType.type}</Badge>}
                  {poop.weight != null && (
                    <Badge>{poop.weight.toFixed(1)} kg</Badge>
                  )}
                </Badges>
              </RowMain>
              {poop.notes && (
                <>
                  <NotesRail $hasNext={hasNext} />
                  <Notes>{poop.notes}</Notes>
                </>
              )}
            </Row>
            {hasNext && (
              <Gap
                $heightRem={Math.max(
                  GAP_MIN_HEIGHT_REM,
                  maxGap > 0 ? (gap / maxGap) * GAP_MAX_HEIGHT_REM : 0
                )}
              >
                <GapLine />
                <GapBadge $colors={getGapColors(gap, meanGap, gapStdDev)}>
                  {Math.round(gap / MS_PER_HOUR)}h
                </GapBadge>
              </Gap>
            )}
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  grid-area: logs;
  display: flex;
  flex-direction: column;
  /* gap: 1.5rem; */
  padding: 3rem;
  background-color: ${COLORS.bg.primary};
  border-radius: 1rem;
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
  overflow-y: auto;
  position: relative;
`

const Title = styled.h6`
  font-size: 2rem;
  color: ${COLORS.text.secondary};
  padding-bottom: 1.5rem;
`

const railLine = css`
  content: '';
  position: absolute;
  left: 50%;
  width: ${COLORS.border.width};
  transform: translateX(-50%);
  background-color: ${COLORS.border.primary};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: ${SWATCH_SIZE} 1fr;
  column-gap: 1rem;
`

const SwatchCell = styled.div<{ $hasPrev: boolean; $hasNext: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $hasPrev }) =>
    $hasPrev &&
    css`
      &::before {
        ${railLine}
        top: 0;
        bottom: 50%;
      }
    `}

  ${({ $hasNext }) =>
    $hasNext &&
    css`
      &::after {
        ${railLine}
        top: 50%;
        bottom: 0;
      }
    `}
`

const NotesRail = styled.div<{ $hasNext: boolean }>`
  position: relative;

  ${({ $hasNext }) =>
    $hasNext &&
    css`
      &::after {
        ${railLine}
        top: 0;
        bottom: 0;
      }
    `}
`

const RowMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const DateLabel = styled.span`
  font-size: 1.75rem;
  color: ${COLORS.text.primary};
  flex: 1 0 0;
`

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`

const Badge = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  background-color: ${COLORS.bg.secondary};
  color: ${COLORS.text.secondary};
`

const SpicyBadge = styled.span`
  font-size: 1.75rem;
`

const ColorSwatch = styled.div<{ $hex: string }>`
  position: relative;
  z-index: 1;
  width: ${SWATCH_SIZE};
  height: ${SWATCH_SIZE};
  border-radius: 50%;
  background-color: ${({ $hex }) => $hex};
  border: 1.5px solid ${COLORS.border.primary};
  flex-shrink: 0;
`

const Notes = styled.p`
  font-size: 1.5rem;
  color: ${COLORS.text.secondary};
  line-height: 1.4;
  font-weight: 500;
  padding-top: 0.5rem;
`

const Gap = styled.div<{ $heightRem: number }>`
  display: grid;
  grid-template-columns: ${SWATCH_SIZE} 1fr;
  column-gap: 1rem;
  height: ${({ $heightRem }) => $heightRem}rem;
`

const GapLine = styled.div`
  justify-self: center;
  width: ${COLORS.border.width};
  background-color: ${COLORS.border.primary};
`

const GapBadge = styled(Badge)<{ $colors: { bg: string; text: string } }>`
  align-self: center;
  justify-self: start;
  font-size: 1.25rem;
  padding-left: 1.25rem;
  clip-path: polygon(0.625rem 0, 100% 0, 100% 100%, 0.625rem 100%, 0 50%);
  background-color: ${({ $colors }) => $colors.bg};
  color: ${({ $colors }) => $colors.text};
`

const Empty = styled.p`
  font-size: 1.75rem;
  color: ${COLORS.text.secondary};
  text-align: center;
  padding: 2rem 0;
`
