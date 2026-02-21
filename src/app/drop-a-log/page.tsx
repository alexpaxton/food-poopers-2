import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

import { LogForm } from '@/components/drop-a-log/LogForm'

export default async function DropALogPage() {
  await checkAuth()

  return (
    <Shell name="Drop a log">
      <LogForm />
    </Shell>
  )
}
