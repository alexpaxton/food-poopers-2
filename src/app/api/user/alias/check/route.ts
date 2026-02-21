import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const alias = req.nextUrl.searchParams.get('alias')

  if (!alias || alias.trim().length === 0) {
    return NextResponse.json(
      { error: 'alias query parameter is required' },
      { status: 400 }
    )
  }

  const existing = await prisma.user.findUnique({
    where: { alias: alias.trim() },
    select: { id: true },
  })

  return NextResponse.json({ available: existing === null })
}
