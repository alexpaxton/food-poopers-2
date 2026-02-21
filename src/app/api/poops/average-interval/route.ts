import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export const GET = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const poops = await prisma.poop.findMany({
    where: { userId: req.auth.user.id },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  })

  if (poops.length < 2) {
    return NextResponse.json({ averageMinutes: null })
  }

  let totalMs = 0
  for (let i = 1; i < poops.length; i++) {
    totalMs +=
      new Date(poops[i].createdAt).getTime() -
      new Date(poops[i - 1].createdAt).getTime()
  }

  const averageMs = totalMs / (poops.length - 1)
  const averageMinutes = averageMs / (1000 * 60)

  return NextResponse.json({ averageMinutes })
})
