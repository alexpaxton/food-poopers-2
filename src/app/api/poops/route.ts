import { Poop } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

type FormPoop = Omit<Poop, 'id' | 'createdAt'>

export const GET = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const dayOfWeek = now.getDay() // 0 = Sunday, 1 = Monday, ...
  const daysFromMonday = (dayOfWeek + 6) % 7
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - daysFromMonday)
  weekStart.setHours(0, 0, 0, 0)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)

  const poops = await prisma.poop.findMany({
    where: {
      userId: req.auth.user.id,
      createdAt: { gte: weekStart, lt: weekEnd },
    },
    orderBy: { createdAt: 'asc' },
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
