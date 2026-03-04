import { Poop } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

type FormPoop = Omit<Poop, 'id' | 'createdAt'>

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

export const POST = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json()) as FormPoop
  const { color, spicy, type, latitude, longitude, weight, notes } = body

  if (
    typeof color !== 'string' ||
    typeof spicy !== 'boolean' ||
    typeof type !== 'number' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number'
  ) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const poop = await prisma.poop.create({
    data: {
      color,
      spicy,
      type,
      latitude,
      longitude,
      weight,
      notes,
      userId: req.auth.user.id,
    },
  })

  return NextResponse.json(poop, { status: 201 })
})
