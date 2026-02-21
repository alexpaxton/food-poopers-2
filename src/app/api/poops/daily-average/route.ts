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

  if (poops.length === 0) {
    return NextResponse.json({ average: 0 })
  }

  const firstDay = new Date(poops[0].createdAt)
  firstDay.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const totalDays =
    Math.floor((today.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) +
    1

  return NextResponse.json({ average: poops.length / totalDays })
})
