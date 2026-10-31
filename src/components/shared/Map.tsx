'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })

type Props = ComponentProps<typeof LeafletMap>

export function Map(props: Props) {
  return <LeafletMap {...props} />
}
