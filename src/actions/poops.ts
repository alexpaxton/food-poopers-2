'use server'

import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

type CreatePoopInput = {
  color: string
  spicy: boolean
  type: number
  latitude: number
  longitude: number
  weight: number | null
  notes: string | null
  idempotencyKey: string
}

export async function createPoop(data: CreatePoopInput) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const {
    color,
    spicy,
    type,
    latitude,
    longitude,
    weight,
    notes,
    idempotencyKey,
  } = data

  if (
    typeof color !== 'string' ||
    typeof spicy !== 'boolean' ||
    typeof type !== 'number' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number'
  ) {
    throw new Error('Invalid input')
  }

  try {
    return await prisma.poop.create({
      data: {
        color,
        spicy,
        type,
        latitude,
        longitude,
        weight,
        notes,
        idempotencyKey,
        userId: session.user.id,
      },
    })
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      return prisma.poop.findUniqueOrThrow({ where: { idempotencyKey } })
    }
    throw e
  }
}
