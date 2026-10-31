'use client'

import { CrosshairIcon } from '@phosphor-icons/react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import styled from 'styled-components'

import { COLORS } from '@/constants'

import 'leaflet/dist/leaflet.css'

export type MapMarker = {
  id: string
  lat: number
  lng: number
  label?: string
}

type Props = {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  height?: string
}

function createCountIcon(count: number) {
  const size = count < 10 ? 36 : count < 100 ? 40 : 52
  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 2px solid ${COLORS.bg.primary};
      background: linear-gradient(116deg, #00b7ff 0%, #ba8cff 100%);
      color: #fff;
      font-size: 1.75rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    ">${count}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function createClusterIcon(cluster: { getChildCount: () => number }) {
  return createCountIcon(cluster.getChildCount())
}

const SINGLE_MARKER_ICON = createCountIcon(1)

function LocateButton() {
  const map = useMap()

  function handleClick() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.flyTo([coords.latitude, coords.longitude], 15)
    })
  }

  return (
    <LocateButtonWrapper onClick={handleClick} title="Center on my location">
      <CrosshairIcon size={20} color={COLORS.text.primary} />
    </LocateButtonWrapper>
  )
}

export function LeafletMap({
  center = [0, 0],
  zoom = 2,
  markers = [],
  height = '100%',
}: Props) {
  return (
    <MapWrapper $height={height}>
      <MapContainer
        center={center}
        zoom={zoom}
        worldCopyJump
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <LocateButton />
        <MarkerClusterGroup
          iconCreateFunction={createClusterIcon}
          spiderfyOnMaxZoom={false}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={SINGLE_MARKER_ICON}
            >
              {marker.label && <Popup>{marker.label}</Popup>}
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </MapWrapper>
  )
}

export default LeafletMap

const MapWrapper = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height};
  width: 100%;
`

const LocateButtonWrapper = styled.button`
  position: absolute;
  bottom: 9rem;
  right: 1rem;
  z-index: 1000;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 4px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: ${COLORS.bg.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: none;
`
