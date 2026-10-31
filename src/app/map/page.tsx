import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

import { MapWithData } from '@/components/map/MapWithData'

export default async function MapPage() {
  await checkAuth()

  return (
    <Shell name="Map">
      <MapWithData />
    </Shell>
  )
}
