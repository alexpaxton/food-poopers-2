'use client'

import { useQuery } from '@tanstack/react-query'

import { StatCard } from '@/components/shared/StatCard'

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h${m}m`
}

export function AverageIntervalCard() {
  const { data, status } = useQuery<{ averageMinutes: number | null }>({
    queryKey: ['average-interval'],
    queryFn: () =>
      fetch('/api/poops/average-interval').then((res) => res.json()),
  })

  const label = 'Mean time between poops'
  let stat = ''

  if (status === 'error') {
    stat = '!'
  }

  if (data !== undefined) {
    stat =
      data.averageMinutes === null ? '—' : formatMinutes(data.averageMinutes)
  }

  return (
    <StatCard
      label={label}
      stat={stat}
      slot="stat2"
      loading={status === 'pending'}
    />
  )
}
