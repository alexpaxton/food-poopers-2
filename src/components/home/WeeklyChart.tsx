'use client'

import { Poop } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
} from 'chart.js'
import Gradient from 'chartjs-plugin-gradient'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'

import { Spinner } from '@/components/shared/Spinner'

import { COLORS } from '@/constants'

ChartJS.register(Gradient, CategoryScale, LinearScale, BarElement)

const DAY_LABELS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

function getIsoWeekday(date: Date): number {
  return date.getDay() // 0 = Sunday, 6 = Saturday
}

export function WeeklyChart() {
  const { data, status } = useQuery<Poop[]>({
    queryKey: ['my-weekly-poops'],
    queryFn: () => fetch('/api/poops').then((res) => res.json()),
  })
  const poops = Array.isArray(data) ? data : []

  if (status === 'pending') {
    return (
      <Card>
        <Spinner />
      </Card>
    )
  }

  if (status === 'error') {
    return (
      <Card>
        <p>Error loading poops</p>
      </Card>
    )
  }

  const counts = Array(7).fill(0)
  for (const poop of poops) {
    const day = getIsoWeekday(new Date(poop.createdAt))
    counts[day]++
  }

  return (
    <Card>
      <Chart>
        <Bar
          plugins={[Gradient]}
          data={{
            labels: DAY_LABELS,
            datasets: [
              {
                data: counts,
                borderWidth: 0,
                borderRadius: 4,
                categoryPercentage: 1,
                barPercentage: 0.8,
                gradient: {
                  backgroundColor: {
                    axis: 'y',
                    colors: {
                      0: COLORS.glow.start,
                      3: COLORS.glow.stop,
                      6: COLORS.fire.stop,
                    },
                  },
                },
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            layout: {
              padding: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { display: false },
              },
              y: {
                grid: { display: true },
                ticks: { display: false },
                border: { display: false },
                beginAtZero: true,
                suggestedMax: 3,
              },
            },
          }}
        />
      </Chart>
      <DailyTotals>
        <Spacer />
        {counts.map((count, i) => (
          <Total key={`${DAY_LABELS[i]}-count`}>
            <Day>{DAY_LABELS[i]}</Day>
            {count > 0 ? <Count>{count}</Count> : undefined}
          </Total>
        ))}
      </DailyTotals>
    </Card>
  )
}

const Card = styled.div`
  position: relative;
  grid-area: chart;
  width: 100%;
  padding: 3rem;
  background-color: ${COLORS.bg.primary};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
`

const Chart = styled.div`
  flex: 1 0 0;
`

const DailyTotals = styled.div`
  width: 100%;
  display: flex;
`

const Total = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const Spacer = styled.div`
  flex: 0 0 6px;
  height: 4rem;
`

const Day = styled.h6`
  font-size: 2rem;
  font-weight: 400;
`

const Count = styled.div`
  background-color: ${COLORS.border.selected};
  color: ${COLORS.text.invert};
  font-size: 2rem;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  flex: 0 0 3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`
