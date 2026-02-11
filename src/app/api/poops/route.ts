import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const POST = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { color, spicy, type, latitude, longitude, weight, notes } = body;

  if (
    typeof color !== 'string' ||
    typeof spicy !== 'boolean' ||
    typeof type !== 'number' ||
    typeof latitude !== 'number' ||
    typeof longitude !== 'number'
  ) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const poop = await prisma.poop.create({
    data: {
      color,
      spicy,
      type,
      latitude,
      longitude,
      weight: typeof weight === 'number' ? weight : null,
      notes: typeof notes === 'string' ? notes : null,
      userId: req.auth.user.id,
    },
  });

  return NextResponse.json(poop, { status: 201 });
});
