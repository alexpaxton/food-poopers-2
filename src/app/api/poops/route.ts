import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export const GET = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sinceParam = req.nextUrl.searchParams.get('since')

  let start: Date
  let end: Date | undefined

  if (sinceParam) {
    start = new Date(sinceParam)
    end = undefined
  } else {
    const now = new Date()
    const dayOfWeek = now.getDay()
    start =
      dayOfWeek === 0 ? now : new Date(now.setDate(now.getDate() - dayOfWeek))
    start.setHours(0, 0, 0, 0)
    end = new Date(start)
    end.setDate(start.getDate() + 6)
  }

  const poops = await prisma.poop.findMany({
    where: {
      userId: req.auth.user.id,
      createdAt: { gte: start, ...(end ? { lt: end } : {}) },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(poops)
})
