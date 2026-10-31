'use server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export async function getUserPoopMarkers() {
  const session = await auth()
  if (!session?.user?.id) return []

  const poops = await prisma.poop.findMany({
    where: { userId: session.user.id },
    select: { id: true, latitude: true, longitude: true, createdAt: true },
  })

  return poops.map((p) => ({
    id: p.id,
    lat: p.latitude,
    lng: p.longitude,
    label: p.createdAt.toLocaleDateString(),
  }))
}
