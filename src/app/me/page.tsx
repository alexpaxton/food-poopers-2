import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

import { Me } from '@/components/home/Me'

export default async function MePage() {
  await checkAuth()

  return (
    <Shell name="Me">
      <Me />
    </Shell>
  )
}
