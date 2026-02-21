import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

import { Onboarding } from '@/components/onboarding/Onboarding'

import { auth } from '@/auth'

export default async function OnboardingPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  // Redirect users with an Alias to their home page
  if (session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { alias: true, id: true },
    })

    if (user === null) {
      throw new Error(`No user associated with email ${session.user.email}`)
    }

    if (user.alias !== null) {
      redirect('/me')
    }
  }

  return <Onboarding />
}
