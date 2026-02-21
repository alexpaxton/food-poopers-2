'use client'

import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

import { Spinner } from '@/components/shared/Spinner'

import { COLORS } from '@/constants'

type LeaderboardEntry = {
  alias: string
  variabilityMinutes: number | null
}

export function Leaderboard() {
  const { data, status } = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: () => fetch('/api/leaderboard').then((res) => res.json()),
  })

  if (status === 'pending')
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    )
  if (status === 'error')
    return (
      <Wrapper>
        <p>Error loading leaderboard</p>
      </Wrapper>
    )

  return (
    <Wrapper>
      <Alert>
        You need at least 30 logged poops to show up in the leaderboard
      </Alert>
      {data.length ? (
        <ul>
          {data.map((entry) => (
            <li key={entry.alias}>
              {entry.alias}: {entry.variabilityMinutes ?? '—'}
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState>Leaderboard is currently empty</EmptyState>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 3rem;
  position: relative;
  font-size: 2rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

const Alert = styled.div`
  border-radius: 0.75rem;
  padding: 3rem;
  color: ${COLORS.text.invert};
  background: ${COLORS.toast.info};
  font-size: 2rem;
  font-weight: 600;
`

const EmptyState = styled.div`
  font-size: 2rem;
  color: ${COLORS.text.secondary};
  flex: 1 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
