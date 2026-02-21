import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { auth } from '@/auth'

export async function checkAuth() {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    redirect('/')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { alias: true, id: true, email: true, name: true },
  })

  if (!user) {
    throw new Error(`No user found matching ID ${session.user.id}`)
  }

  if (user.alias === null) {
    redirect('/onboarding')
  }

  return user
}
