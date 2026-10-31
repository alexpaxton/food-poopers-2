'use client'

import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { MapMarker } from '@/components/shared/LeafletMap'
import { Map } from '@/components/shared/Map'

import { COLORS } from '@/constants'

import { getUserPoopMarkers } from '@/app/map/actions'

type State = { status: 'loading' } | { status: 'done'; markers: MapMarker[] }

export function MapWithData() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    getUserPoopMarkers().then((markers) =>
      setState({ status: 'done', markers })
    )
  }, [])

  if (state.status === 'loading') {
    return (
      <Wrapper>
        <Pulse />
      </Wrapper>
    )
  }

  return <Map markers={state.markers} />
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.bg.secondary};
`

const Pulse = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${COLORS.text.secondary};
  animation: ${pulse} 1.4s ease-in-out infinite;
`
