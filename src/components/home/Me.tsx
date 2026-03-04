'use client'

import styled from 'styled-components'

import { AverageIntervalCard } from '@/components/home/AverageIntervalCard'
import { DailyAverageCard } from '@/components/home/DailyAverageCard'
import { Logs } from '@/components/home/Logs'
import { WeeklyChart } from '@/components/home/WeeklyChart'

export function Me() {
  return (
    <StatContainer>
      <WeeklyChart />
      <DailyAverageCard />
      <AverageIntervalCard />
      <Logs />
    </StatContainer>
  )
}
const StatContainer = styled.div`
  padding: 3rem;
  display: grid;
  min-height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 300px 120px auto;
  gap: 3rem;
  grid-template-areas:
    'chart chart'
    'stat1 stat2'
    'logs logs';
`
