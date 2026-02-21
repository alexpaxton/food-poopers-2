import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export const PATCH = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json()) as { alias: string }
  const { alias } = body

  if (typeof alias !== 'string' || alias.trim().length === 0) {
    return NextResponse.json({ error: 'Invalid alias' }, { status: 400 })
  }

  try {
    const user = await prisma.user.update({
      where: { id: req.auth.user.id },
      data: { alias: alias.trim() },
      select: { alias: true },
    })
    return NextResponse.json(user)
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'Alias already taken' },
        { status: 409 }
      )
    }
    throw error
  }
})
