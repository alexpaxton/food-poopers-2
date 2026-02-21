import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export const GET = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    where: {
      alias: { not: null },
    },
    select: {
      alias: true,
      poops: {
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  const eligibleUsers = users.filter((u) => u.poops.length >= 30)

  if (!eligibleUsers.length) {
    return NextResponse.json([])
  }

  const leaderboard = eligibleUsers.map((user) => {
    if (user.poops.length < 30) {
      return { alias: user.alias as string, variabilityMinutes: null }
    }

    const durations: number[] = []
    for (let i = 1; i < user.poops.length; i++) {
      const ms =
        new Date(user.poops[i].createdAt).getTime() -
        new Date(user.poops[i - 1].createdAt).getTime()
      durations.push(ms / (1000 * 60))
    }

    const mean = durations.reduce((sum, d) => sum + d, 0) / durations.length
    const variance =
      durations.reduce((sum, d) => sum + (d - mean) ** 2, 0) / durations.length
    const variabilityMinutes = Math.sqrt(variance)

    return { alias: user.alias as string, variabilityMinutes }
  })

  return NextResponse.json(leaderboard)
})
