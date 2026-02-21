'use client'

import styled from 'styled-components'

import { Spinner } from '@/components/shared/Spinner'

import { COLORS } from '@/constants'

type Props = {
  stat: string
  label: string
  slot: 'stat1' | 'stat2' | 'stat3' | 'stat4'
  loading: boolean
}

export function StatCard({ label, stat, slot, loading }: Props) {
  return (
    <Card $slot={slot}>
      {loading ? undefined : <Label>{label}</Label>}
      {loading ? <Spinner /> : <Stat>{stat}</Stat>}
    </Card>
  )
}

const Card = styled.dl<{ $slot: string }>`
  position: relative;
  background-color: ${COLORS.bg.primary};
  border-radius: 0.75rem;
  padding: 2rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  grid-area: ${({ $slot }) => $slot};
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
`

const Label = styled.dt`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.text.secondary};
`

const Stat = styled.dd`
  font-size: 4rem;
  font-weight: 200;
  letter-spacing: -0.01em;
`
