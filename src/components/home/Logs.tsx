'use client'

import { Poop } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

import { Spinner } from '@/components/shared/Spinner'

import { BRISTOL_TYPES, COLORS, POOP_COLORS } from '@/constants'

const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

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
      {poops.map((poop) => {
        const colorEntry = POOP_COLORS.find((c) => c.color === poop.color)
        const bristolType = BRISTOL_TYPES.find((b) => b.type === poop.type)
        return (
          <Row key={poop.id}>
            <RowMain>
              <DateLabel>{formatDate(new Date(poop.createdAt))}</DateLabel>
              <Badges>
                {poop.spicy && <SpicyBadge>🌶</SpicyBadge>}
                {colorEntry && (
                  <ColorSwatch $hex={colorEntry.hex} title={colorEntry.color} />
                )}
                {bristolType && <Badge>T{bristolType.type}</Badge>}
                {poop.weight != null && (
                  <Badge>{poop.weight.toFixed(1)} kg</Badge>
                )}
              </Badges>
            </RowMain>
            {poop.notes && <Notes>{poop.notes}</Notes>}
          </Row>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  grid-area: logs;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: ${COLORS.border.width} solid ${COLORS.border.primary};
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`

const RowMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const DateLabel = styled.span`
  font-size: 1.75rem;
  color: ${COLORS.text.primary};
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
  width: 1.75rem;
  height: 1.75rem;
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
`

const Empty = styled.p`
  font-size: 1.75rem;
  color: ${COLORS.text.secondary};
  text-align: center;
  padding: 2rem 0;
`
